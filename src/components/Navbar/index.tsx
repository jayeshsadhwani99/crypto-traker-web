import "./styles.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="brand">Crypto Tracker</div>
      <div className="right">
        <a href="/about">About</a>
        <a href="#">Github</a>
      </div>
    </div>
  );
}

export default Navbar;
