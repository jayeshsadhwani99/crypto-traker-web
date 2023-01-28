import "./styles.css";

function Navbar() {
  return (
    <div className="navbar">
      <a href="/">
        <div className="brand">Crypto Tracker</div>
      </a>
      <div className="right">
        <a href="/about">About</a>
        <a href="#">Github</a>
      </div>
    </div>
  );
}

export default Navbar;
