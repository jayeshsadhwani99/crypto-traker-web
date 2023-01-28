import { useContext } from "react";
import { CoinContext, CoinContextType } from "../../context/CoinContext";
import TopMovingComponent from "../common/TopMovingComponent";
import "./styles.css";

function TopMoving() {
  const { topMovingCoins } = useContext(CoinContext) as CoinContextType;

  return (
    <div className="topMoving">
      <div className="title">Top Moving Coins</div>
      <div className="topMovingCoins">
        {topMovingCoins.map((coin, index) => (
          <TopMovingComponent
            coin={coin}
            change={coin.price_change_percentage_24h ?? 0}
            image={coin.image}
            price={coin.current_price}
            symbol={coin.symbol}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default TopMoving;
