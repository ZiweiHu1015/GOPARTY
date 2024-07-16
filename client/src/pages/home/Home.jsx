import React from "react";
import "./Home.scss";
import Featured from "../../components/featured/Featured";
import Slide from "../../components/slide/Slide";
import CatCard from "../../components/catCard/CatCard";
import { cards } from "../../data";


const Home = () => {
  return (
    <div className = 'home'>
        <Featured/>
       {/* <TrustedBy/> */}
       <div className ="packages">
       <div className="container">
        <div className = "item">
        <h2>Shop Our </h2>
        <h1>Most Picked Items</h1>
        <Slide slidesToShow={5} arrowsScroll={4}>
            {cards.map((card) => (
              <div key={card.id} >
                  <CatCard key={card.id} card={card} />
              </div>
            ))}
        </Slide>
        </div>
        </div>
        </div>

        <div className="features">
        <div className="container">
          <div className="item">
            <h1>Manage your party at your fingertips</h1>
            <div className="title">
              <img src="./img/check.png" alt="" />
              The best for every budget
            </div>
            <p>
              Find the best services fit your style and taste.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Worry-free process
            </div>
            <p>
              Find the right person to create your vision within minutes.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Protected payments, every time.
            </div>
            <p>
              Always know what you'll pay upfront. Your payment isn't released
              until you are satisfied with the work.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              24/7 customer support
            </div>
            <p>
              Tell us right now if you are experiencing something wrong. 
            </p>
          </div>
          <div className="item">
            <img src="./img/placeholder2.jpg" />
          </div>
      </div>
      </div>
    </div>
  );
}

export default Home;
