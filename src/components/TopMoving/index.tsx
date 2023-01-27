import TopMovingComponent from "../common/TopMovingComponent";
import "./styles.css";

function TopMoving() {
  const coins = [
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
      symbol: "BTC",
      price: 1234,
      change: 2.3,
    },
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
      symbol: "BTC",
      price: 1234,
      change: 2.3,
    },
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
      symbol: "BTC",
      price: 1234,
      change: 2.3,
    },
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
      symbol: "BTC",
      price: 1234,
      change: 2.3,
    },
  ];

  return (
    <div className="topMoving">
      <div className="title">Top Moving Coins</div>
      <div className="topMovingCoins">
        {coins.map((coin, index) => (
          <TopMovingComponent
            change={coin.change}
            image={coin.image}
            price={coin.price}
            symbol={coin.symbol}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default TopMoving;
