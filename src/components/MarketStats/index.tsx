import { useContext } from "react";
import {
  MarketDataContext,
  MarketDataType,
} from "../../context/MarketDataContext";
import MarketStatComponent from "../common/MarketStatComponent";
import "./styles.css";

function MarketStats() {
  const { stats } = useContext(MarketDataContext) as MarketDataType;

  return (
    <div className="marketStats">
      <div className="title">Market Stats</div>
      <div className="stats">
        {stats.map((stat, index) => (
          <MarketStatComponent
            key={index}
            body={stat.value}
            title={stat.title}
            subtext={stat.percentageChange}
          />
        ))}
      </div>
    </div>
  );
}

export default MarketStats;
