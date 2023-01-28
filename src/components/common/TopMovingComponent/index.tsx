import { Coin } from "../../../models/coin";
import "./styles.css";

interface TopMovingComponentProps {
  image: string;
  symbol: string;
  price: number;
  change: number;
  coin: Coin;
}

function TopMovingComponent({
  image,
  symbol,
  price,
  change,
  coin,
}: TopMovingComponentProps) {
  return (
    <a href={`${coin.id}`}>
      <div className="topMovingComponent">
        <img src={image} alt={symbol} />
        <div className="symbol">{symbol}</div>
        <div className="price">${price}</div>
        <div
          className="change"
          style={{
            color: (change ?? 0) < 0 ? "var(--negative)" : "var(--positive)",
          }}
        >
          {change}%
        </div>
      </div>
    </a>
  );
}

export default TopMovingComponent;
