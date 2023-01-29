import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./styles.css";
import Drawer from "react-modern-drawer";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="navbar">
      <div className="col">
        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="left"
          className="drawer"
        >
          <div className="top">
            <div className="heading">Crypto Tracker</div>
            <div className="menu" onClick={toggleDrawer}>
              <FaTimes />
            </div>
          </div>
          <div className="options">
            <a className="option" href="/">
              Dashboard
            </a>
            <a className="option" href="/portfolio">
              Your portfolio
            </a>
            <a className="option" href="/about">
              About
            </a>
            <a
              className="option"
              href="https://github.com/jayeshsadhwani99/crypto-traker-web"
              target="_blank"
            >
              Github
            </a>
          </div>
        </Drawer>
        <div className="menu" onClick={toggleDrawer}>
          <FaBars />
        </div>
        <a href="/">
          <div className="brand">Crypto Tracker</div>
        </a>
      </div>
      <div className="right">
        <a href="/about">About</a>
        <a
          href="https://github.com/jayeshsadhwani99/crypto-traker-web"
          target="_blank"
        >
          Github
        </a>
      </div>
    </div>
  );
}

export default Navbar;
