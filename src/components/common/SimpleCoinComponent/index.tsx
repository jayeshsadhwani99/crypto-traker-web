import { Coin } from "../../../models/coin";
import "./styles.css";

function SimpleCoinComponent({
  coin,
  selected = false,
}: {
  coin: Coin;
  selected?: boolean;
}) {
  return (
    <div
      className="simple-coin"
      style={selected ? { border: "2px solid var(--positive)" } : {}}
    >
      <img src={coin.image} alt={coin.symbol} />
      {coin.name}
    </div>
  );
}

export default SimpleCoinComponent;
