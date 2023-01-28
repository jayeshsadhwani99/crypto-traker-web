import "../styles/about.css";
import gradient from "../assets/gradient.png";
import iPhone from "../assets/iphone.png";
import Navbar from "../components/Navbar";

function About() {
  return (
    <>
      <Navbar />
      <div className="about">
        <div className="left">
          <h1 className="heading-1">Track Crypto</h1>
          <h1 className="heading-2">Real Time.</h1>
          <p className="para">
            Track crypto through a public api in real time. Visit the dashboard
            to do so!
          </p>
          <div className="btn-flex">
            <a href="/dashboard">{/* <Button text="Dashboard" /> */}</a>
          </div>
        </div>
        <div className="right">
          <img src={gradient} className="gradient" />
          <img src={iPhone} className="iphone" />
        </div>
      </div>
    </>
  );
}

export default About;
