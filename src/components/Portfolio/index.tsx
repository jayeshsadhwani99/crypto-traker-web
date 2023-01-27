import MarketStatComponent from "../common/MarketStatComponent";
import Table from "../common/Table";
import "./styles.css";

function Portfolio() {
  const coins = [
    {
      cap: 1,
      name: "Bitcoin",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
      price: "200",
      change: 23,
    },
    {
      cap: 2,
      name: "Bitcoin",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
      price: "200",
      change: 23,
    },
    {
      cap: 3,
      name: "Bitcoin",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
      price: "200",
      change: 23,
    },
    {
      cap: 99,
      name: "Bitcoin",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
      price: "200",
      change: 23,
    },
  ];

  return (
    <div className="portfolio">
      <div className="title">Portfolio</div>

      <MarketStatComponent title="Market Cap" body={4240.04} subtext={-2.03} />

      <div className="portfolioCoinsList">
        <Table isPortfolio={true} coins={coins} />
      </div>
    </div>
  );
}

export default Portfolio;
