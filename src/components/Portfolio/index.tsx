import MarketStatComponent from "../common/MarketStatComponent";
import "./styles.css";

function Portfolio() {
  return (
    <div className="portfolio">
      <div className="title">Portfolio</div>

      <MarketStatComponent title="Market Cap" body={4240.04} subtext={-2.03} />
    </div>
  );
}

export default Portfolio;
