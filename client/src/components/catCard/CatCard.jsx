import React from "react";
import { Link } from "react-router-dom";
import "./CatCard.scss";

function CatCard({ card }) {
  const handleClick = () => {  // Navigate to the gigs page with the selected category
    history.push(`/listings?cat=${card.cat}`);// memorize location before click card
    window.scrollTo(0, 0);// Scroll to the top of the page
  };

  return (
    <Link to={`/listings?cat=${card.cat}`} onClick={handleClick}>
      <div className="catCard">
        <img src={card.img} alt="" />
        <span className="desc">{card.desc}</span>
        <span className="title">{card.title}</span>
      </div>
    </Link>


    
  );
}
export default CatCard;
