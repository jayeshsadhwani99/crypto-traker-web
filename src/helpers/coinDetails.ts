import { Coin } from "../models/coin";
import { CoinDetail } from "../models/coinDetail";
import { Statistic } from "../models/statistic";

export function createOverviewArray(coin: Coin): Statistic[] {
  let price = coin.current_price.toCurrency();
  let pricePercentChange = coin.price_change_percentage_24h;
  let priceStat: Statistic = {
    title: "Current Price",
    value: price,
    percentageChange: pricePercentChange,
  };

  let marketCap =
    "$" + (coin?.market_cap ? coin.market_cap?.formatWithAbbreviations() : "");
  let marketCapPercentageChange = coin.market_cap_change_percentage_24h;
  let marketCapStat: Statistic = {
    title: "Market Capitalization",
    value: marketCap,
    percentageChange: marketCapPercentageChange,
  };

  let rank = "" + (coin.market_cap_rank || "");
  let rankStat: Statistic = {
    title: "Rank",
    value: rank,
  };

  let volume =
    "$" +
    (coin.total_volume ? coin.total_volume.formatWithAbbreviations() : "0");
  let volumeStat: Statistic = {
    title: "Volume",
    value: volume,
  };

  return [priceStat, marketCapStat, rankStat, volumeStat];
}

export function createAdditionalArray(
  coinDetails: CoinDetail,
  coin: Coin
): Statistic[] {
  let high: string = coin.high_24h ? coin.high_24h.toCurrency() : "n/a";
  let highStat: Statistic = {
    title: "24h High",
    value: high,
  };

  let low: string = coin.low_24h ? coin.low_24h.toCurrency() : "n/a";
  let lowStat: Statistic = {
    title: "24h Low",
    value: low,
  };

  let priceChange: string = coin.price_change_24h?.toCurrency() ?? "n/a";
  let pricePercentChange: number = coin.price_change_percentage_24h ?? 0;
  let priceChangeStat: Statistic = {
    title: "24h Price Change",
    value: priceChange,
    percentageChange: pricePercentChange,
  };

  let marketCapChange: string =
    "$" +
    (coin.market_cap_change_24h
      ? coin.market_cap_change_24h?.formatWithAbbreviations()
      : "");
  let marketCapPercentageChange: number =
    coin.market_cap_change_percentage_24h ?? 0;
  let marketCapChangeStat: Statistic = {
    title: "24h Market Cap Change",
    value: marketCapChange,
    percentageChange: marketCapPercentageChange,
  };

  let blockTime: number = coinDetails
    ? coinDetails.block_time_in_minutes ?? 0
    : 0;
  let blockTimeString: string = blockTime === 0 ? "n/a" : blockTime.toString();
  let blockStat: Statistic = {
    title: "Block Time",
    value: blockTimeString,
  };

  let hashing: string = coinDetails
    ? coinDetails.hashing_algorithm ?? "n/a"
    : "n/a";
  let hashingStat: Statistic = {
    title: "Hashing Algorithm",
    value: hashing,
  };

  return [
    highStat,
    lowStat,
    priceChangeStat,
    marketCapChangeStat,
    blockStat,
    hashingStat,
  ];
}
