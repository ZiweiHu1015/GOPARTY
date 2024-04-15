import React from 'react'
import { Slider } from "infinite-react-carousel/lib";
import "./Gig.scss"

const Gig = () => {
  return (
    <div className = "Gig">
      <div className = "container">
        <div className = "left">
            <span className="breadCrumbs"> GoParty {">"} Graphics & Design {">"}</span>
            <h1>I will deliver balloons for you</h1>

            <div className = "user">
                <img src="https://i.pinimg.com/564x/d4/5e/c7/d45ec76edd768fb26a788627261ff37e.jpg" alt="" />
                <span>Emma Hu</span>
                <div className = "stars"> 
                    <img src="../img/star.png" alt="" />
                    <img src="../img/star.png" alt="" />
                    <img src="../img/star.png" alt="" />
                    <img src="../img/star.png" alt="" />
                    <img src="../img/star.png" alt="" />
                    <span>5</span>
                </div>
            </div>
            <Slider slidesToShow={1} arrowsScroll = {1}>
              <img src="../img/placeholder.JPG" alt="" />
              <img src="" alt="" />
              <img src="" alt="" />
            </Slider>
            <h2>About This package</h2>
            <p>
            Although Scott said it didn't matter to him, he knew deep inside that it did. 
            They had been friends as long as he could remember and not once had he had to 
            protest that something Joe apologized for doing didn't really matter. Scott 
            stuck to his lie and insisted again and again that everything was fine as Joe 
            continued to apologize. Scott already knew that despite his words accepting 
            the apologies that their friendship would never be the same.
            </p>
            <div className = "seller">
              <h2>About The Seller</h2>
              <div className="user">
                <img src="https://i.pinimg.com/564x/d4/5e/c7/d45ec76edd768fb26a788627261ff37e.jpg" alt="" />
                <div className="info">
                  <span>Emma Hu</span>
                    <div className = "stars"> 
                      <img src="../img/star.png" alt="" />
                      <img src="../img/star.png" alt="" />
                      <img src="../img/star.png" alt="" />
                      <img src="../img/star.png" alt="" />
                      <img src="../img/star.png" alt="" />
                      <span>5</span>
                  </div>
                  <button>
                    Contact Me
                  </button>
                </div>
              </div>
              <div className="box">
                <div className="items">
                  <div className="item">
                    <span className="title">From</span>
                    <span className="title">USA</span>
                  </div>
                  
                  <div className="item">
                    <span className="title">From</span>
                    <span className="title">USA</span>
                  </div>

                  <div className="item">
                    <span className="title">From</span>
                    <span className="title">USA</span>
                  </div>

                  <div className="item">
                    <span className="title">From</span>
                    <span className="title">USA</span>
                  </div>

                  <div className="item">
                    <span className="title">From</span>
                    <span className="title">USA</span>
                  </div>
                </div>
                  <p>
                    I'm a good event planner 
                  </p>
              </div>
            </div>
            <div className="review">
              <h2>Review</h2>
              <div className="item">
                <div className="user">
                  <img src="../img/usflag.png" alt="" />
                  <div className="info">
                    <span> Joe Biden</span>
                    <div className="country">
                      <img src="../img/usflag.png" alt="" />
                      <span>United States</span>
                    </div>
                  </div>
                </div>

                <div className = "stars"> 
                    <img src="../img/star.png" alt="" />
                    <img src="../img/star.png" alt="" />
                    <img src="../img/star.png" alt="" />
                    <img src="../img/star.png" alt="" />
                    <img src="../img/star.png" alt="" />
                    <span>5</span>
                </div>

                <p>
                Although Scott said it didn't matter to him, he knew deep inside that it did. 
                They had been friends as long as he could remember and not once had he had to 
                protest that something Joe apologized for doing didn't really matter. Scott 
                stuck to his lie and insisted again and again that everything was fine as Joe 
                continued to apologize. Scott already knew that despite his words accepting 
                the apologies that their friendship would never be the same.
                </p>
                <div className="helpful">
                  <span>Helpful?</span>
                  <img src="./img/like.png" alt="" />
                  <span>Yes</span>
                  <img src="./img/dislike.png" alt="" />
                  <span>No</span>
                </div>
              </div>
              <hr/>
            </div>
        </div>
        <div className = "right"></div>

      </div>
    </div>
  )
}

export default Gig


