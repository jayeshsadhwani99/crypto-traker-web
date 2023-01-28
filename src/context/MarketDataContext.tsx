import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { MarketData } from "../models/marketData";

interface MarketDataType {
  marketData: MarketData | null;
  getData: Function;
}

export const MarketDataContext = createContext<MarketDataType | null>(null);

export const MarketDataProvider = ({ children }: PropsWithChildren) => {
  const [marketData, setMarketData] = useState<MarketData | null>(null);

  function getData() {}

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
