import "./App.css";
import AllCoins from "./components/AllCoins";
import MarketStats from "./components/MarketStats";
import Navbar from "./components/Navbar";
import Portfolio from "./components/Portfolio";
import TopMoving from "./components/TopMoving";

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="left">
        <MarketStats />
        <TopMoving />
        <AllCoins />
      </div>
      <div className="right">
        <Portfolio />
      </div>
    </div>
  );
}

export default App;
