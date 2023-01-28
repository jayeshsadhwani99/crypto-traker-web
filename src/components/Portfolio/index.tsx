import { useContext } from "react";
import { CoinContext, CoinContextType } from "../../context/CoinContext";
import MarketStatComponent from "../common/MarketStatComponent";
import Table from "../common/Table";
import "./styles.css";

function Portfolio() {
  const { portfolioCoins } = useContext(CoinContext) as CoinContextType;

  return (
    <div className="portfolio">
      <div className="title">Portfolio</div>

      <MarketStatComponent title="Market Cap" body={4240.04} subtext={-2.03} />

      <div className="portfolioCoinsList">
        <Table isPortfolio={true} coins={portfolioCoins} />
      </div>
    </div>
  );
}

export default Portfolio;
