import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {

  return (
    <div>
      <Navbar />
      <main>
        <h1>Welcome to AptiCrack</h1>
        <p>
          AptiCrack is a weekly aptitude-based test conducted by the Electrical Engineer's Society.
          Compete with peers and sharpen your skills!
        </p>
      </main>
      <Footer />
    </div>
  );
}

export default Home;