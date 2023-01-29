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
  max_supply?: number | null;
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
    return JSON.parse(json);
  }

  public static coinToJson(value: Coin): string {
    return JSON.stringify(value);
  }
}

export function updateHoldings(coin: Coin, amount: number): Coin {
  const newCoin: Coin = { ...coin, currentHoldings: amount };
  return newCoin;
}

export function holdingsValue(coin: Coin): number {
  return (coin.currentHoldings ?? 0) * coin.current_price;
}
