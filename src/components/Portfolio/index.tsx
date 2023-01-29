import { useContext, useEffect, useState } from "react";
import { CoinContext, CoinContextType } from "../../context/CoinContext";
import MarketStatComponent from "../common/MarketStatComponent";
import Table from "../common/Table";
import "./styles.css";
import { FaPlusCircle } from "react-icons/fa";
import SheetComponent from "../SheetComponent";

function Portfolio() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number>(0);
  const [percentageChange, setPercentageChange] = useState<number>(0);
  const { portfolioCoins } = useContext(CoinContext) as CoinContextType;

  const getPortfolioValue = () => {
    const portfolioValue = portfolioCoins
      .map((e) => (e.currentHoldings ?? 0) * e.current_price)
      .reduce((prev, curr) => prev + curr, 0);

    const prevValue = portfolioCoins
      .map((e) => {
        const current: number = (e?.currentHoldings ?? 0) * e.current_price;
        const percentChange: number =
          (e?.price_change_percentage_24h ?? 0) / 100;

        const prevValue: number = current / (1 + percentChange);
        return prevValue;
      })
      .reduce((prev, curr) => prev + curr, 0);

    const percentage =
      ((portfolioValue - prevValue ?? 0) / (prevValue != 0 ? prevValue : 1)) *
        100 ?? 0;
    setPercentageChange(percentage);
    setValue(portfolioValue);
  };

  useEffect(() => {
    if (portfolioCoins) getPortfolioValue();
  }, [portfolioCoins]);

  return (
    <div className="portfolio">
      <SheetComponent open={open} setOpen={setOpen} />
      <div className="head">
        <div className="title">Portfolio</div>
        <div className="add" onClick={() => setOpen(true)}>
          <FaPlusCircle fontSize={"var(--heading)"} />{" "}
        </div>
      </div>

      <div className="row">
        <MarketStatComponent
          title="Portfolio Value"
          body={value.toCurrency()}
          subtext={percentageChange}
        />

        <MarketStatComponent
          title="Total Holdings"
          body={portfolioCoins.length.toString()}
        />
      </div>

      <div className="portfolioCoinsList">
        <Table isPortfolio={true} coins={portfolioCoins} />
      </div>
    </div>
  );
}

export default Portfolio;
