// To parse this data:
//
//   import { Convert, MarketData } from "./file";
//
//   const marketData = Convert.toMarketData(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface MarketData {
  active_cryptocurrencies?: number;
  upcoming_icos?: number;
  ongoing_icos?: number;
  ended_icos?: number;
  markets?: number;
  total_market_cap?: { [key: string]: number };
  total_volume?: { [key: string]: number };
  market_cap_percentage?: { [key: string]: number };
  market_cap_change_percentage_24h_usd?: number;
  updated_at?: number;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toMarketData(json: string): MarketData {
    return JSON.parse(json);
  }

  public static marketDataToJson(value: MarketData): string {
    return JSON.stringify(value);
  }
}
