import { useContext, useRef } from "react";
import Refresh from "../../../assets/refresh-cw";
import { CoinContext, CoinContextType } from "../../../context/CoinContext";
import { Coin, holdingsValue } from "../../../models/coin";
import "./styles.css";

function Table({
  coins,
  isPortfolio = false,
}: {
  coins: Array<Coin>;
  isPortfolio?: boolean;
}) {
  const refreshBtn = useRef<any>(null);
  const { fetchCoins } = useContext(CoinContext) as CoinContextType;

  function refreshData() {
    fetchCoins();
  }

  return (
    <>
      <div className="coinElement">
        <div className="tableColumn">
          <div className="tableElement" onClick={refreshData} ref={refreshBtn}>
            <Refresh />
          </div>
          <div className="tableElement">Coin</div>
        </div>
        <div
          className="tableColumn"
          style={{ minWidth: isPortfolio ? "7rem" : "none" }}
        >
          <div className="tableElement">Price</div>
          {isPortfolio && <div className="tableElement">Holdings</div>}
        </div>
      </div>
      <div className="coinsList">
        {coins.map((coin, index) => (
          <a href={`/${coin.id}`} key={index}>
            <div className="coinElement">
              <div className="tableColumn">
                <div className="tableElement">{coin.market_cap_rank}</div>
                <div className="tableElement">
                  <img src={coin.image} />
                  <div className="column">
                    <div className="rowEl">{coin.name}</div>
                    <div className="rowEl" id="symbol">
                      {coin.symbol}
                    </div>
                  </div>
                </div>
              </div>
              <div className="tableColumn right">
                <div className="tableElement">
                  <div className="column">
                    <div className="rowEl">
                      {Number(coin.current_price.toFixed(2)).toCurrency()}
                    </div>
                    <div
                      className="rowEl"
                      style={{
                        color:
                          (coin.price_change_percentage_24h ?? 0) < 0
                            ? "var(--negative)"
                            : "var(--positive)",
                      }}
                    >
                      {coin.price_change_percentage_24h?.toFixed(2)}%
                    </div>
                  </div>

                  {isPortfolio && (
                    <div className="column">
                      <div className="rowEl">
                        $
                        {Number(
                          holdingsValue(coin).toFixed(2)
                        ).formatWithAbbreviations()}
                      </div>
                      <div
                        className="rowEl"
                        style={{
                          color:
                            (coin.price_change_percentage_24h ?? 0) < 0
                              ? "var(--negative)"
                              : "var(--positive)",
                        }}
                      >
                        {coin.price_change_percentage_24h?.toPercent()}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}

export default Table;
