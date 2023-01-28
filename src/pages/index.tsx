import "../styles/App.css";
import Navbar from "../components/Navbar";
import Portfolio from "../components/Portfolio";
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
