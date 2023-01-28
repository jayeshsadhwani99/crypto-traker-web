// To parse this data:
//
//   import { Convert, Coin } from "./file";
//
//   const coin = Convert.toCoin(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap?: number;
  market_cap_rank: number;
  fully_diluted_valuation?: number;
  total_volume?: number;
  high_24h?: number;
  low_24h?: number;
  price_change_24h?: number;
  price_change_percentage_24h?: number;
  market_cap_change_24h?: number;
  market_cap_change_percentage_24h?: number;
  circulating_supply?: number;
  total_supply?: number;
  max_supply?: number;
  ath?: number;
  ath_change_percentage?: number;
  ath_date?: Date;
  atl?: number;
  atl_change_percentage?: number;
  atl_date?: Date;
  roi?: null;
  last_updated?: Date;
  sparkline_in_7d?: SparklineIn7D;
  price_change_percentage_24h_in_currency?: number;
  currentHoldings?: number;
}

export interface SparklineIn7D {
  price?: number[];
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toCoin(json: string): Coin {
    return cast(JSON.parse(json), r("Coin"));
  }

  public static coinToJson(value: Coin): string {
    return JSON.stringify(uncast(value, r("Coin")), null, 2);
  }
}
export function updateHoldings(coin: Coin, amount: number): Coin {
  const newCoin: Coin = { ...coin, currentHoldings: amount };
  return newCoin;
}

export function holdingsValue(coin: Coin): number {
  return coin.currentHoldings ?? 0 * coin.current_price;
}

function invalidValue(typ: any, val: any, key: any, parent: any = ""): never {
  const prettyTyp = prettyTypeName(typ);
  const parentText = parent ? ` on ${parent}` : "";
  const keyText = key ? ` for key "${key}"` : "";
  throw Error(
    `Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(
      val
    )}`
  );
}

function prettyTypeName(typ: any): string {
  if (Array.isArray(typ)) {
    if (typ.length === 2 && typ[0] === undefined) {
      return `an optional ${prettyTypeName(typ[1])}`;
    } else {
      return `one of [${typ
        .map((a) => {
          return prettyTypeName(a);
        })
        .join(", ")}]`;
    }
  } else if (typeof typ === "object" && typ.literal !== undefined) {
    return typ.literal;
  } else {
    return typeof typ;
  }
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(
  val: any,
  typ: any,
  getProps: any,
  key: any = "",
  parent: any = ""
): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val, key, parent);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val, key, parent);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(
      cases.map((a) => {
        return l(a);
      }),
      val,
      key,
      parent
    );
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
    return val.map((el) => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue(l("Date"), val, key, parent);
    }
    return d;
  }

  function transformObject(
    props: { [k: string]: any },
    additional: any,
    val: any
  ): any {
    if (val === null || typeof val !== "object" || Array.isArray(val)) {
      return invalidValue(l(ref || "object"), val, key, parent);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key)
        ? val[key]
        : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, key, ref);
    });
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key, ref);
      }
    });
    return result;
  }

  if (typ === "any") return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val, key, parent);
  }
  if (typ === false) return invalidValue(typ, val, key, parent);
  let ref: any = undefined;
  while (typeof typ === "object" && typ.ref !== undefined) {
    ref = typ.ref;
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === "object") {
    return typ.hasOwnProperty("unionMembers")
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty("arrayItems")
      ? transformArray(typ.arrayItems, val)
      : typ.hasOwnProperty("props")
      ? transformObject(getProps(typ), typ.additional, val)
      : invalidValue(typ, val, key, parent);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== "number") return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
  return { literal: typ };
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  Coin: o(
    [
      { json: "id", js: "id", typ: u(undefined, "") },
      { json: "symbol", js: "symbol", typ: u(undefined, "") },
      { json: "name", js: "name", typ: u(undefined, "") },
      { json: "image", js: "image", typ: u(undefined, "") },
      { json: "current_price", js: "current_price", typ: u(undefined, 0) },
      { json: "market_cap", js: "market_cap", typ: u(undefined, 0) },
      { json: "market_cap_rank", js: "market_cap_rank", typ: u(undefined, 0) },
      {
        json: "fully_diluted_valuation",
        js: "fully_diluted_valuation",
        typ: u(undefined, 0),
      },
      { json: "total_volume", js: "total_volume", typ: u(undefined, 0) },
      { json: "high_24h", js: "high_24h", typ: u(undefined, 0) },
      { json: "low_24h", js: "low_24h", typ: u(undefined, 0) },
      {
        json: "price_change_24h",
        js: "price_change_24h",
        typ: u(undefined, 3.14),
      },
      {
        json: "price_change_percentage_24h",
        js: "price_change_percentage_24h",
        typ: u(undefined, 3.14),
      },
      {
        json: "market_cap_change_24h",
        js: "market_cap_change_24h",
        typ: u(undefined, 3.14),
      },
      {
        json: "market_cap_change_percentage_24h",
        js: "market_cap_change_percentage_24h",
        typ: u(undefined, 3.14),
      },
      {
        json: "circulating_supply",
        js: "circulating_supply",
        typ: u(undefined, 0),
      },
      { json: "total_supply", js: "total_supply", typ: u(undefined, 0) },
      { json: "max_supply", js: "max_supply", typ: u(undefined, 0) },
      { json: "ath", js: "ath", typ: u(undefined, 0) },
      {
        json: "ath_change_percentage",
        js: "ath_change_percentage",
        typ: u(undefined, 3.14),
      },
      { json: "ath_date", js: "ath_date", typ: u(undefined, Date) },
      { json: "atl", js: "atl", typ: u(undefined, 3.14) },
      {
        json: "atl_change_percentage",
        js: "atl_change_percentage",
        typ: u(undefined, 3.14),
      },
      { json: "atl_date", js: "atl_date", typ: u(undefined, Date) },
      { json: "roi", js: "roi", typ: u(undefined, null) },
      { json: "last_updated", js: "last_updated", typ: u(undefined, Date) },
      {
        json: "sparkline_in_7d",
        js: "sparkline_in_7d",
        typ: u(undefined, r("SparklineIn7D")),
      },
      {
        json: "price_change_percentage_24h_in_currency",
        js: "price_change_percentage_24h_in_currency",
        typ: u(undefined, 3.14),
      },
    ],
    false
  ),
  SparklineIn7D: o(
    [{ json: "price", js: "price", typ: u(undefined, a(3.14)) }],
    false
  ),
};
