import axios from "axios";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MARKET_DATA } from "../constants";
import { Convert, MarketData } from "../models/marketData";
import { Statistic } from "../models/statistic";

export interface MarketDataType {
  marketData: MarketData | null;
  stats: Statistic[];
  getData: () => Promise<MarketData | undefined>;
}

export const MarketDataContext = createContext<MarketDataType | null>(null);

export const MarketDataProvider = ({ children }: PropsWithChildren) => {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [stats, setStats] = useState<Statistic[]>([]);

  async function getData(): Promise<MarketData | undefined> {
    try {
      const response = await axios.get(MARKET_DATA);
      const data: MarketData = Convert.toMarketData(
        JSON.stringify(response.data.data)
      );
      saveStats(data);
      setMarketData(data);
      return data;
    } catch (e: any) {
      console.error("DEBUG: There was an error", e?.response?.data ?? e);
      toast(`There was an error: ${e?.response?.data}`);
    }
  }

  function saveStats(marketData: MarketData) {
    const marketCap: Statistic = {
      title: "Market Cap",
      value: `$${marketData.total_market_cap?.btc?.formatWithAbbreviations()}`,
      percentageChange: marketData.market_cap_change_percentage_24h_usd ?? 0,
    };

    const volume: Statistic = {
      title: "24h Volume",
      value: `$${marketData.total_volume?.btc?.formatWithAbbreviations()}`,
    };

    const bitcoinDominance: Statistic = {
      title: "Bitcoin Dominance",
      value: `${marketData.market_cap_percentage?.btc?.toFixed(2)}%` ?? "",
    };

    setStats([marketCap, volume, bitcoinDominance]);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <MarketDataContext.Provider
      value={{
        marketData,
        stats,
        getData,
      }}
    >
      {children}
    </MarketDataContext.Provider>
  );
};
