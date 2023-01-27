import "./styles.css";
import Refresh from "../../assets/refresh-cw";
import Table from "../common/Table";

function AllCoins() {
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
    <div className="allCoins">
      <div className="title">All Coins</div>

      <Table coins={coins} />
    </div>
  );
}

export default AllCoins;
