import axios from "axios";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FETCH_COINS } from "../constants";
import { Coin, Convert, updateHoldings } from "../models/coin";
import { ConvertPortfolio, Portfolio } from "../models/portfolio";
import { CoinDetail, ConvertCoinDetail } from "../models/coinDetail";

export interface CoinContextType {
  coins: Coin[];
  topMovingCoins: Coin[];
  portfolioCoins: Coin[];
  coinDetails: CoinDetail | null;
  fetchCoins: () => Promise<Coin[] | undefined>;
  getCoinDetails: (coin: Coin) => Promise<CoinDetail | undefined>;
  updatePortfolio: (coin: Coin, amount: number) => void;
  getPortfolio: () => Coin[];
}

export const CoinContext = createContext<CoinContextType | null>(null);

export const CoinProvider = ({ children }: PropsWithChildren) => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [topMovingCoins, setTopMovingCoins] = useState<Coin[]>([]);
  const [portfolioCoins, setPortfolioCoins] = useState<Coin[]>([]);
  const [coinDetails, setCoinDetails] = useState<CoinDetail | null>(null);

  useEffect(() => {
    fetchCoins();
  }, []);

  async function fetchCoins(): Promise<Coin[] | undefined> {
    try {
      const response = await axios.get(FETCH_COINS);
      const allCoins: Coin[] = response.data.map((e: any) =>
        Convert.toCoin(JSON.stringify(e))
      );
      setCoins(allCoins);
      configTopCoins();
      getPortfolio();
      return allCoins;
    } catch (e: any) {
      console.error("DEBUG: There was an error", e?.response?.data ?? e);
      toast(`There was an error: ${e?.response?.data}`);
    }
  }

  function configTopCoins(): Coin[] {
    const topMovers = coins.sort(
      (a, b) =>
        (a?.price_change_percentage_24h ?? 0) -
        (b?.price_change_percentage_24h ?? 0)
    );

    setTopMovingCoins(topMovers.slice(0, 5));
    return topMovers.slice(0, 5);
  }

  async function getCoinDetails(coin: Coin): Promise<CoinDetail | undefined> {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coin.id}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`
      );
      const details: CoinDetail = ConvertCoinDetail.toCoinDetail(
        response.data.toString()
      );
      setCoinDetails(details);
      return details;
    } catch (e: any) {
      console.error("DEBUG: There was an error", e?.response?.data ?? e);
      toast(`There was an error: ${e?.response?.data}`);
    }
  }

  function updatePortfolio(coin: Coin, amount: number) {
    const el = portfolioCoins.find((e) => e.id === coin.id);

    if (el) {
      if (amount > 0) updateCoin(coin, amount);
      else deleteCoin(coin);
    } else {
      addCoin(coin, amount);
    }

    getPortfolio();
  }

  function getPortfolio(): Coin[] {
    const p: Portfolio[] = getPortfolioCoins();
    const pCoins: Coin[] = [];
    for (let i = 0; i < p.length; i++) {
      const portfolio = p[i];
      const coin: Coin | undefined = coins.find((e) => e.id === portfolio.id);
      if (coin) {
        coin.currentHoldings = portfolio.amount;
        pCoins.push(coin);
      }
    }

    setPortfolioCoins(pCoins);
    return pCoins;
  }

  function getPortfolioCoins(): Portfolio[] {
    const portfolio = localStorage.getItem("portfolio");
    if (portfolio)
      return JSON.parse(portfolio).map((e: any) =>
        ConvertPortfolio.toPortfolio(JSON.stringify(e))
      );
    else return [];
  }

  function savePortfolioCoins(coins: Portfolio[]) {
    localStorage.setItem("portfolio", JSON.stringify(coins));
  }

  function addCoin(coin: Coin, amount: number) {
    const pCoins = getPortfolioCoins();
    pCoins.push({
      id: coin.id,
      amount: amount,
    });
    applyChanges(pCoins);
  }

  function updateCoin(coin: Coin, amount: number) {
    const pCoins = getPortfolioCoins();

    const index = pCoins.findIndex((e) => e.id === coin.id);

    pCoins[index].amount = amount;
    applyChanges(pCoins);
  }

  function deleteCoin(coin: Coin) {
    const pCoins = getPortfolioCoins();

    pCoins.splice(
      pCoins.findIndex((e) => e.id === coin.id),
      1
    );
    applyChanges(pCoins);
  }

  function applyChanges(coins: Portfolio[]) {
    savePortfolioCoins(coins);
    refreshPortfolioCoins();
  }

  function refreshPortfolioCoins() {
    const portfolios = getPortfolioCoins();
    const allCoins = coins;
    for (let i = 0; i < portfolios.length; i++) {
      const pCoin = portfolios[i];
      const coin = allCoins.find((e) => e.id === pCoin.id);
      const index = allCoins.findIndex((e) => e.id === pCoin.id);
      if (coin) {
        const newCoin = updateHoldings(coin, pCoin.amount);
        allCoins[index] = newCoin;
      }
    }

    setCoins(allCoins);
  }

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
        getPortfolio,
      }}
    >
      {children}
    </CoinContext.Provider>
  );
};
