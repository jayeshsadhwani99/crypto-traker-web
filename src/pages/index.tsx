import "../styles/App.css";
import AllCoins from "../components/AllCoins";
import MarketStats from "../components/MarketStats";
import Navbar from "../components/Navbar";
import Portfolio from "../components/Portfolio";
import TopMoving from "../components/TopMoving";
import { Outlet } from "react-router-dom";

function Root() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <div className="left-content">
          <Outlet />
        </div>
        <aside>
          <Portfolio />
        </aside>
      </main>
    </div>
  );
}

export default Root;
