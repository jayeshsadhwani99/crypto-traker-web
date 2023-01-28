// To parse this data:
//
//   import { Convert, CoinDetail } from "./file";
//
//   const coinDetail = Convert.toCoinDetail(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface CoinDetail {
  id?: string;
  symbol?: string;
  name?: string;
  block_time_in_minutes?: number;
  hashing_algorithm?: string;
  description?: Description;
  links?: Links;
  image?: Image;
  country_origin?: string;
  genesis_date?: Date;
  sentiment_votes_up_percentage?: number;
  sentiment_votes_down_percentage?: number;
  market_cap_rank?: number;
  liquidity_score?: number;
  public_interest_score?: number;
  last_updated?: Date;
}

export interface Description {
  en?: string;
}

export interface Image {
  thumb?: string;
  small?: string;
  large?: string;
}

export interface Links {
  homepage?: string[];
  blockchain_site?: string[];
  official_forum_url?: string[];
  chat_url?: string[];
  announcement_url?: string[];
  twitter_screen_name?: string;
  facebook_username?: string;
  bitcointalk_thread_identifier?: null;
  telegram_channel_identifier?: string;
  subreddit_url?: string;
  repos_url?: ReposURL;
}

export interface ReposURL {
  github?: string[];
  bitbucket?: any[];
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class ConvertCoinDetail {
  public static toCoinDetail(json: string): CoinDetail {
    return cast(JSON.parse(json), r("CoinDetail"));
  }

  public static coinDetailToJson(value: CoinDetail): string {
    return JSON.stringify(uncast(value, r("CoinDetail")), null, 2);
  }
}

export function getReadableDescription(
  coinDetail: CoinDetail
): string | undefined {
  return coinDetail.description?.en?.removingHTMLOccurances();
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
  CoinDetail: o(
    [
      { json: "id", js: "id", typ: u(undefined, "") },
      { json: "symbol", js: "symbol", typ: u(undefined, "") },
      { json: "name", js: "name", typ: u(undefined, "") },
      {
        json: "block_time_in_minutes",
        js: "block_time_in_minutes",
        typ: u(undefined, 0),
      },
      {
        json: "hashing_algorithm",
        js: "hashing_algorithm",
        typ: u(undefined, ""),
      },
      {
        json: "description",
        js: "description",
        typ: u(undefined, r("Description")),
      },
      { json: "links", js: "links", typ: u(undefined, r("Links")) },
      { json: "image", js: "image", typ: u(undefined, r("Image")) },
      { json: "country_origin", js: "country_origin", typ: u(undefined, "") },
      { json: "genesis_date", js: "genesis_date", typ: u(undefined, Date) },
      {
        json: "sentiment_votes_up_percentage",
        js: "sentiment_votes_up_percentage",
        typ: u(undefined, 3.14),
      },
      {
        json: "sentiment_votes_down_percentage",
        js: "sentiment_votes_down_percentage",
        typ: u(undefined, 3.14),
      },
      { json: "market_cap_rank", js: "market_cap_rank", typ: u(undefined, 0) },
      {
        json: "liquidity_score",
        js: "liquidity_score",
        typ: u(undefined, 3.14),
      },
      {
        json: "public_interest_score",
        js: "public_interest_score",
        typ: u(undefined, 3.14),
      },
      { json: "last_updated", js: "last_updated", typ: u(undefined, Date) },
    ],
    false
  ),
  Description: o([{ json: "en", js: "en", typ: u(undefined, "") }], false),
  Image: o(
    [
      { json: "thumb", js: "thumb", typ: u(undefined, "") },
      { json: "small", js: "small", typ: u(undefined, "") },
      { json: "large", js: "large", typ: u(undefined, "") },
    ],
    false
  ),
  Links: o(
    [
      { json: "homepage", js: "homepage", typ: u(undefined, a("")) },
      {
        json: "blockchain_site",
        js: "blockchain_site",
        typ: u(undefined, a("")),
      },
      {
        json: "official_forum_url",
        js: "official_forum_url",
        typ: u(undefined, a("")),
      },
      { json: "chat_url", js: "chat_url", typ: u(undefined, a("")) },
      {
        json: "announcement_url",
        js: "announcement_url",
        typ: u(undefined, a("")),
      },
      {
        json: "twitter_screen_name",
        js: "twitter_screen_name",
        typ: u(undefined, ""),
      },
      {
        json: "facebook_username",
        js: "facebook_username",
        typ: u(undefined, ""),
      },
      {
        json: "bitcointalk_thread_identifier",
        js: "bitcointalk_thread_identifier",
        typ: u(undefined, null),
      },
      {
        json: "telegram_channel_identifier",
        js: "telegram_channel_identifier",
        typ: u(undefined, ""),
      },
      { json: "subreddit_url", js: "subreddit_url", typ: u(undefined, "") },
      { json: "repos_url", js: "repos_url", typ: u(undefined, r("ReposURL")) },
    ],
    false
  ),
  ReposURL: o(
    [
      { json: "github", js: "github", typ: u(undefined, a("")) },
      { json: "bitbucket", js: "bitbucket", typ: u(undefined, a("any")) },
    ],
    false
  ),
};
