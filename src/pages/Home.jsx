import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';

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

        {/* Image Carousel */}
        <div className="container d-flex justify-content-center">
          <MDBCarousel showControls showIndicators style={{ maxWidth: "900px" }}>
            <MDBCarouselItem itemId={1}>
              <img 
                src='https://mdbootstrap.com/img/new/slides/041.jpg' 
                className='d-block w-100 carousel-img' 
                alt='Slide 1' 
              />
            </MDBCarouselItem>
            <MDBCarouselItem itemId={2}>
              <img 
                src='https://mdbootstrap.com/img/new/slides/042.jpg' 
                className='d-block w-100 carousel-img' 
                alt='Slide 2' 
              />
            </MDBCarouselItem>
            <MDBCarouselItem itemId={3}>
              <img 
                src='https://mdbootstrap.com/img/new/slides/043.jpg' 
                className='d-block w-100 carousel-img' 
                alt='Slide 3' 
              />
            </MDBCarouselItem>
          </MDBCarousel>
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

      </main>
    </div>
  );
}

export default Home;