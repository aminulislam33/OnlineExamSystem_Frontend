import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <main>
        <h1>Welcome to AptiCrack</h1>
        <button onClick={()=>{navigate("/admin/dashboard")}}>Admin</button>
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