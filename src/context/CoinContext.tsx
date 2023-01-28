import { createContext, PropsWithChildren, useState } from "react";
import { Coin } from "../models/coin";
import { CoinDetail } from "../models/coinDetail";

interface CoinContextType {
  coins: Coin[];
  topMovingCoins: Coin[];
  portfolioCoins: Coin[];
  coinDetails: CoinDetail | null;
  fetchCoins: Function;
  getCoinDetails: (coin: Coin) => CoinDetail;
  updatePortfolio: (coin: Coin, amount: number) => void;
}

export const CoinContext = createContext<CoinContextType | null>(null);

export const CoinProvider = ({ children }: PropsWithChildren) => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [topMovingCoins, setTopMovingCoins] = useState<Coin[]>([]);
  const [portfolioCoins, setPortfolioCoins] = useState<Coin[]>([]);
  const [coinDetails, setCoinDetails] = useState<CoinDetail | null>(null);

  function fetchCoins() {
    configTopCoins();
  }

  function configTopCoins() {}

  function getCoinDetails(coin: Coin): CoinDetail {
    return coinDetails!;
  }

  function updatePortfolio(coin: Coin, amount: number) {}

  return (
    <CoinContext.Provider
      value={{
        coins,
        topMovingCoins,
        portfolioCoins,
        coinDetails,
        fetchCoins,
        getCoinDetails,
        updatePortfolio,
      }}
    >
      {children}
    </CoinContext.Provider>
  );
};
