import { useLoaderData } from "react-router-dom";
import MarketStatComponent from "../components/common/MarketStatComponent";
import "../styles/coin.css";

export async function coinLoader({ params }: any) {
  return { id: params.coinId, name: "Bitcoin" };
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

function Coin() {
  const coin: any = useLoaderData();
  return (
    <div className="coin">
      <div className="title">{coin.name}</div>
      <div className="chart"></div>
      <div className="section">
        <div className="heading">Overview</div>
        <div className="data">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto nobis
          accusamus est? Blanditiis, natus cupiditate? Illum, officiis ullam
          dolore atque facilis in nostrum quae possimus aut est laboriosam illo
          magnam eligendi nam temporibus animi et, tempore obcaecati assumenda
          dolores sint ut nihil. Eligendi odit, dolor dolore sapiente numquam
          nesciunt ullam dignissimos asperiores? Nemo distinctio voluptatibus
          pariatur laboriosam saepe vel ab sunt in, enim fugiat vitae ratione
          quod adipisci dolorem perferendis suscipit harum porro quia accusamus
          laudantium iusto sequi, dolore nobis voluptas? Vero eum quidem
          officia, aliquid aliquam voluptas illum itaque sint pariatur inventore
          vitae exercitationem explicabo aut cupiditate harum veritatis!
        </div>

        <div className="grid">
          {data.map((e, index) => (
            <MarketStatComponent
              title={e.title}
              body={e.value}
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
                body={e.value}
                subtext={e.change}
                key={index}
              />
            ))}
          </div>

          <a href="#">Website</a>
          <a href="#">Rediit</a>
        </div>
      </div>
    </div>
  );
}

export default Coin;
