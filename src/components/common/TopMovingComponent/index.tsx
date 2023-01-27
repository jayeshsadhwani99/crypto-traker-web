import "./styles.css";

interface TopMovingComponentProps {
  image: string;
  symbol: string;
  price: number;
  change: number;
}

function TopMovingComponent({
  image,
  symbol,
  price,
  change,
}: TopMovingComponentProps) {
  return (
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
  );
}

export default TopMovingComponent;
