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
      <main>
        <div className="left-content">
          <MarketStats />
          <TopMoving />
          <AllCoins />
        </div>
        <aside>
          <Portfolio />
        </aside>
      </main>
    </div>
  );
}

export default App;
