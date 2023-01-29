import { useContext, useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import MarketStatComponent from "../components/common/MarketStatComponent";
import LineChart from "../components/LineChart";
import {
  CoinContext,
  CoinContextType,
  getCoinDetails,
} from "../context/CoinContext";
import { Coin } from "../models/coin";
import { CoinDetail } from "../models/coinDetail";
import "../styles/coin.css";

export async function coinLoader({
  params,
}: any): Promise<CoinDetail | undefined> {
  const coinDetails = await getCoinDetails(params.coinId);

  if (coinDetails) return coinDetails;
}

function CoinPage() {
  const coin: CoinDetail | undefined = useLoaderData() as CoinDetail;
  const [coinInfo, setCoinInfo] = useState<Coin | null>(null);
  const { coinId } = useParams();
  const { overviewArray, additionalArray, setCoinData, coins } = useContext(
    CoinContext
  ) as CoinContextType;

  useEffect(() => {
    if (coin && coinId) {
      const coinData: Coin | undefined = coins.find((e) => e.id == coinId);
      if (coinData) {
        setCoinInfo(coinData);
        setCoinData(coin, coinData);
      }
    }
  }, [coin, coinId]);

  return (
    <div className="coin">
      <div className="title">{coin.name}</div>
      <div className="chart">
        <LineChart coin={coinInfo} />
      </div>
      <div className="section">
        <div className="heading">Overview</div>
        <div className="data">
          {coin.description?.en?.removingHTMLOccurances()}
        </div>

        <div className="grid">
          {overviewArray.map((e, index) => (
            <MarketStatComponent
              title={e.title}
              body={e.value.toString()}
              subtext={e.percentageChange}
              key={index}
            />
          ))}
        </div>
      </div>

      <div className="section">
        <div className="heading">Additional Details</div>
        <div className="data">
          <div className="grid">
            {additionalArray.map((e, index) => (
              <MarketStatComponent
                title={e.title}
                body={e.value.toString()}
                subtext={e.percentageChange}
                key={index}
              />
            ))}
          </div>

          <a href={`${(coin.links?.homepage ?? [])[0]}`} target="_blank">
            Website
          </a>
          <a href={`${coin.links?.subreddit_url}`} target="_blank">
            Rediit
          </a>
        </div>
      </div>
    </div>
  );
}

export default CoinPage;
