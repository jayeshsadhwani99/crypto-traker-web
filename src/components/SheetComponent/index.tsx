import { useContext, useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import Sheet from "react-modal-sheet";
import { CoinContext, CoinContextType } from "../../context/CoinContext";
import { Coin } from "../../models/coin";
import Input from "../common/Input";
import SimpleCoinComponent from "../common/SimpleCoinComponent";
import "./styles.css";

interface SheetComponentProps {
  open: boolean;
  setOpen: Function;
}

function SheetComponent({ open, setOpen }: SheetComponentProps) {
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [currentValue, setCurrentValue] = useState<string>("0");
  const { searchText, setSearchText, coins, portfolioCoins, updatePortfolio } =
    useContext(CoinContext) as CoinContextType;

  useEffect(() => {
    if (selectedCoin) {
      setCurrentValue(
        ((amount ?? 0) * selectedCoin?.current_price).toCurrency()
      );
    }
  }, [amount]);

  useEffect(() => {
    if (selectedCoin) {
      setAmount(selectedCoin.currentHoldings ?? 0);
    }
  }, [selectedCoin]);

  const handleSubmit = () => {
    if (selectedCoin) {
      updatePortfolio(selectedCoin, amount);
      setSelectedCoin(null);
      setSearchText("");
    }
  };

  function handleChange(event: any) {
    setSearchText(event.target.value);
  }

  return (
    <Sheet isOpen={open} onClose={() => setOpen(false)}>
      <Sheet.Container className="sheet">
        <Sheet.Header />
        <Sheet.Content className="sheet-content">
          <div className="header">
            <div className="col">
              <div className="title">Edit Portfolio</div>
              <div className="icon" onClick={() => setOpen(false)}>
                <FaTimes />
              </div>
            </div>

            {selectedCoin && (
              <div className="col">
                <div className="save" onClick={handleSubmit}>
                  Save
                </div>
              </div>
            )}
          </div>

          <div className="body">
            <Input
              value={searchText}
              placeholder={"Search using symbol or name..."}
              type="text"
              handleChange={handleChange}
            />
          </div>

          <div className="coinList">
            {searchText.length < 1 && portfolioCoins.length > 0
              ? portfolioCoins.map((coin) => (
                  <div key={coin.id} onClick={() => setSelectedCoin(coin)}>
                    <SimpleCoinComponent
                      coin={coin}
                      selected={selectedCoin?.id === coin.id}
                    />
                  </div>
                ))
              : coins.map((coin) => (
                  <div key={coin.id} onClick={() => setSelectedCoin(coin)}>
                    <SimpleCoinComponent
                      coin={coin}
                      selected={selectedCoin?.id === coin.id}
                    />
                  </div>
                ))}
          </div>

          {selectedCoin && (
            <div className="details">
              <div className="col">
                <div className="row">
                  <div className="key">
                    Current price of {selectedCoin.symbol.toUpperCase()}
                  </div>
                  <div className="value">
                    {selectedCoin.current_price.toCurrency()}
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="row">
                  <div className="key">Amount holding</div>
                  <div className="value">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="row">
                  <div className="key">Current Value</div>
                  <div className="value">{currentValue}</div>
                </div>
              </div>
            </div>
          )}
        </Sheet.Content>
      </Sheet.Container>

      <Sheet.Backdrop />
    </Sheet>
  );
}

export default SheetComponent;
