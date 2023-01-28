import { createContext, PropsWithChildren } from "react";
import { CoinProvider } from "./CoinContext";
import { MarketDataProvider } from "./MarketDataContext";
export const GlobalContext = createContext<null>(null);

export const GlobalProvider = ({ children }: PropsWithChildren) => {
  return (
    <GlobalContext.Provider value={null}>
      <CoinProvider>
        <MarketDataProvider>{children}</MarketDataProvider>
      </CoinProvider>
    </GlobalContext.Provider>
  );
};
