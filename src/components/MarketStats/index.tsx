import MarketStatComponent from "../common/MarketStatComponent";
import "./styles.css";

function MarketStats() {
  const stats = [
    {
      title: "Market Cap",
      body: 1234,
      subtext: 23,
    },
    {
      title: "Market Cap",
      body: 1234,
      subtext: 23,
    },
    {
      title: "Market Cap",
      body: 1234,
      subtext: 23,
    },
  ];

  return (
    <div className="marketStats">
      <div className="title">Market Stats</div>
      <div className="stats">
        {stats.map((stat) => (
          <MarketStatComponent
            body={stat.body}
            title={stat.title}
            subtext={stat.subtext}
          />
        ))}
      </div>
    </div>
  );
}

export default MarketStats;
