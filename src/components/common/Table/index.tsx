import Refresh from "../../../assets/refresh-cw";
import "./styles.css";

function Table({
  coins,
  isPortfolio = false,
}: {
  coins: Array<any>;
  isPortfolio?: boolean;
}) {
  return (
    <>
      <div className="coinElement">
        <div className="tableColumn">
          <div className="tableElement">
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
          <div className="coinElement" key={index}>
            <div className="tableColumn">
              <div className="tableElement">1</div>
              <div className="tableElement">
                <img src={coin.image} />
                <div className="column">
                  <div className="rowEl">{coin.name}</div>
                  <div className="rowEl">{coin.symbol ?? "BTC"}</div>
                </div>
              </div>
            </div>
            <div className="tableColumn">
              <div className="tableElement">
                <div className="column">
                  <div className="rowEl">{coin.price}</div>
                  <div
                    className="rowEl"
                    style={{
                      color:
                        (coin.change ?? 0) < 0
                          ? "var(--negative)"
                          : "var(--positive)",
                    }}
                  >
                    {coin.change}%
                  </div>
                </div>

                {isPortfolio && (
                  <div className="column">
                    <div className="rowEl">${coin.value ?? "234.23"}</div>
                    <div
                      className="rowEl"
                      style={{
                        color:
                          (coin.change ?? 0) < 0
                            ? "var(--negative)"
                            : "var(--positive)",
                      }}
                    >
                      {coin.change}%
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Table;
