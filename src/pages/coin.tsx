import { useLoaderData } from "react-router-dom";
import MarketStatComponent from "../components/common/MarketStatComponent";
import { getCoinDetails } from "../context/CoinContext";
import { Coin } from "../models/coin";
import { CoinDetail } from "../models/coinDetail";
import "../styles/coin.css";

export async function coinLoader({
  params,
}: any): Promise<CoinDetail | undefined> {
  const coinDetails = await getCoinDetails(params.coinId);

  if (coinDetails) return coinDetails;
}

const data = [
  {
    title: "Market Cap",
    value: 123,
    change: 23,
  },
  {
    title: "Market Cap",
    value: 123,
    change: 23,
  },
  {
    title: "Market Cap",
    value: 123,
    change: 23,
  },
];

const additionalData = [
  {
    title: "Market Cap",
    value: 123,
    change: 23,
  },
  {
    title: "Market Cap",
    value: 123,
    change: 23,
  },
  {
    title: "Market Cap",
    value: 123,
    change: 23,
  },
  {
    title: "Market Cap",
    value: 123,
    change: 23,
  },
  {
    title: "Market Cap",
    value: 123,
    change: 23,
  },
  {
    title: "Market Cap",
    value: 123,
    change: 23,
  },
];

function CoinPage() {
  const coin: CoinDetail | undefined = useLoaderData() as CoinDetail;

  return (
    <div className="coin">
      <div className="title">{coin.name}</div>
      <div className="chart"></div>
      <div className="section">
        <div className="heading">Overview</div>
        <div className="data">
          {coin.description?.en?.removingHTMLOccurances()}
        </div>

        <div className="grid">
          {data.map((e, index) => (
            <MarketStatComponent
              title={e.title}
              body={e.value.toString()}
              subtext={e.change}
              key={index}
            />
          ))}
        </div>
      </div>

      <div className="section">
        <div className="heading">Additional Details</div>
        <div className="data">
          <div className="grid">
            {additionalData.map((e, index) => (
              <MarketStatComponent
                title={e.title}
                body={e.value.toString()}
                subtext={e.change}
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
