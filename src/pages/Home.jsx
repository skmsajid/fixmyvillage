import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Problems from "../components/Problems";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <div id="hero">
        <Hero />
      </div>
      <div id="problems">
        <Problems />
      </div>
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <div id="features">
        <Features />
      </div>
      <Footer />
    </>
  );
}