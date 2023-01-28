import axios from "axios";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MARKET_DATA } from "../constants";
import { Convert, MarketData } from "../models/marketData";

export interface MarketDataType {
  marketData: MarketData | null;
  getData: () => Promise<MarketData | undefined>;
}

export const MarketDataContext = createContext<MarketDataType | null>(null);

export const MarketDataProvider = ({ children }: PropsWithChildren) => {
  const [marketData, setMarketData] = useState<MarketData | null>(null);

  async function getData(): Promise<MarketData | undefined> {
    try {
      const response = await axios.get(MARKET_DATA);
      const marketData: MarketData = Convert.toMarketData(
        JSON.stringify(response.data)
      );
      setMarketData(marketData);
      return marketData;
    } catch (e: any) {
      console.error("DEBUG: There was an error", e?.response?.data ?? e);
      toast(`There was an error: ${e?.response?.data}`);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <MarketDataContext.Provider
      value={{
        marketData,
        getData,
      }}
    >
      {children}
    </MarketDataContext.Provider>
  );
};
