import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <div>
      <main>
        {/* Welcome Section */}
        <div className="container text-center mt-5">
          <h1 className="mb-4">Welcome to <span className="text-primary">AptiCrack</span></h1>
          <p className="lead">
            AptiCrack is a weekly aptitude-based test conducted by the <strong>Electrical Engineer's Society</strong>. 
            Compete with peers, sharpen your problem-solving skills, and take a step closer to mastering your aptitude!
          </p>
        </div>

        {/* Carousel Section */}
        <div className="container mt-5">
          <div id="apticarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
            {/* Carousel Items */}
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="https://res.cloudinary.com/dwr8472qb/image/upload/v1737038866/pexels-alina-chernii-682289345-30186417_irmcek.jpg"
                  className="d-block w-100"
                  alt="AptiCrack Challenge"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://res.cloudinary.com/dwr8472qb/image/upload/v1737038815/pexels-francesco-ungaro-28177041_fknc1g.jpg"
                  className="d-block w-100"
                  alt="Boost Your Skills"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://res.cloudinary.com/dwr8472qb/image/upload/v1737038815/pexels-jan-van-der-wolf-11680885-30053310_ghiird.jpg"
                  className="d-block w-100"
                  alt="Compete and Shine"
                />
              </div>
            </div>

            {/* Carousel Controls */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#apticarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#apticarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="container mt-5">
          <h2>About AptiCrack</h2>
          <p>
            AptiCrack is designed to help students prepare for competitive exams by honing their aptitude skills through 
            weekly challenges. It focuses on critical thinking, logical reasoning, and quantitative problem-solving.
          </p>
        </div>

        {/* Features Section */}
        <div className="container mt-5">
          <h2>Why Join AptiCrack?</h2>
          <ul className="list-group">
            <li className="list-group-item">👩‍🎓 Compete with peers to track your progress.</li>
            <li className="list-group-item">📈 Weekly challenges with exciting questions.</li>
            <li className="list-group-item">🏆 Leaderboards to reward top performers.</li>
            <li className="list-group-item">⚡ Sharpen your logical, analytical, and mathematical skills.</li>
          </ul>
        </div>

        {/* Call to Action */}
        {/* <div className="container mt-5 text-center">
          <p className="lead">Are you ready to crack the aptitude game?</p>
          <button className="btn btn-primary btn-lg">Join Now</button>
        </div> */}
      </main>
    </div>
  );
}

export default Home;