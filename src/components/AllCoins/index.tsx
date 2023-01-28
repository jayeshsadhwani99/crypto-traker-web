import "./styles.css";
import Table from "../common/Table";
import { useContext } from "react";
import { CoinContext, CoinContextType } from "../../context/CoinContext";

function AllCoins() {
  const { coins } = useContext(CoinContext) as CoinContextType;

  return (
    <div className="allCoins">
      <div className="title">All Coins</div>

      <Table coins={coins} />
    </div>
  );
}

export default AllCoins;
