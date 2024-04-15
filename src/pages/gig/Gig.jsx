import React from 'react'
import { Slider } from "infinite-react-carousel/lib";
import "./Gig.scss";

const Gig = () => {
  return (
   <div className="gig">
    <div className="container">
      <div className="left">
        
        <span className="breadCrum"> GoParty {">"}  Graphics & Design {">"} </span>
        <h1>I will deliver balloon for you</h1>

        <div className="user">
          <img 
                className = "pp" 
                src="../img/userProfile.jpg" 
                alt="" 
          />
          <span>Joe Doe</span>
          <div className="stars">
            <img src="../img/star.png" alt="" />
            <img src="/img/star.png" alt="" />
            <img src="/img/star.png" alt="" />
            <img src="/img/star.png" alt="" />
            <img src="/img/star.png" alt="" />
            <span>5</span>
          </div>
        </div>

        <Slider slidesToShow={1} arrowsScrolll={1} className = "slider">
          <img src="/img/placeholder.jpg" alt="" />
          <img src="/img/placeholder.jpg" alt="" />
          <img src="/img/placeholder.jpg" alt="" />
        </Slider>

        <h2>About this decoration</h2>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
        officia deserunt mollit anim id est laborum.
        </p>


        <div className="seller">
            <h2>About the Seller</h2>
            <div className="user">
              <img src="../img/sellerProfile.jpg" alt="" />
              <div className="info">
                <span>Joey</span>
                <div className="stars">
                  <img src="../img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <span>5</span>
                </div>
                <button>Contact Me</button>
              </div>
            </div>
            <div className="box">
              <div className="items">
               <div className="item">
                  <span className="title">From</span>
                  <span className="desc">USA</span>
                </div>
                <div className="item">
                  <span className="title">Member since</span>
                  <span className="desc">Aug 2022</span>
                </div>
                <div className="item">
                  <span className="title">Ave.response time</span>
                  <span className="desc">4 hours</span>
                </div>
                <div className="item">
                  <span className="title">Last delivery</span>
                  <span className="desc">1 day</span>
                </div>
                <div className="item">
                  <span className="title">Languages</span>
                  <span className="desc">English</span>
                </div>
              </div>
              <hr />
              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
              et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
              aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
              officia deserunt mollit anim id est laborum.
              </p>
          </div>
        </div>
       
      </div>
      <div className="right">
        <div className="price">
          <h3>1 AI generated img</h3>
          <h2>$59.99</h2>
        </div>
        <p>I will create unique balloons</p>
        <div className="details">
          <div className="item">
            <img src="../img/clock.png" alt="" />
            <span>2 days delivery</span>
          </div>

          <div className="item">
            <img src="../img/recycle.png" alt="" />
            <span>3 Revisions</span>
          </div>
        </div>
        <div className="features">
            <div className="item">
              <img src="../img/greencheck.png" alt="" />
              <span>Promt writing</span>
            </div>

            <div className="item">
              <img src="../img/greencheck.png" alt="" />
              <span>Promt writing</span>
            </div>

            <div className="item">
              <img src="../img/greencheck.png" alt="" />
              <span>Promt writing</span>
            </div>
        </div>
        <button>Continue</button>

      </div>
    </div>
   </div>
  )
}

export default Gig


