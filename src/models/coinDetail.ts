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
    return JSON.parse(json);
  }

  public static coinDetailToJson(value: CoinDetail): string {
    return JSON.stringify(value);
  }
}
