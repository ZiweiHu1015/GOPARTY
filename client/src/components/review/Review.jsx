import { useQuery } from "@tanstack/react-query";
import React from "react";
import newRequest from "../../utils/newRequest";
import "./Review.scss";


const Review = ({ review }) => {
  console.log("Review component rendered with review:", review); 

  const { isLoading, error, data } = useQuery(
    {
      queryKey: [review.BuyerID],
      queryFn: () =>
        newRequest.get(`/users/${review.BuyerID}`).then((res) => {
          console.log("Fetched user data:", res.data);
          return res.data;
        }),
    },
  );


  return (
    <div className="review">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="user">
          <img className="pp" src={data.ProfilePicture || "/img/noavatar.jpg"} alt="" />
          <div className="info">
            <span>{data.FirstName}</span>
            <div className="country">
              <span>{data.Location}</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="stars">
        {Array(review.rating)
          .fill()
          .map((item, i) => (
            <img src="/img/star.png" alt="" key={i} />
          ))}
        <span>{review.rating}</span>
      </div>
      
      <div className = "review-detail">
        <p className = "comment">{review.Comment}</p>
        <p className = "timestamp">{review.Timestamp.slice(0, 10)}</p>
      </div>
      <div className="helpful">
        <span>Helpful?</span>
        <img src="/img/like.png" alt="" />
        <span>Yes</span>
        <img src="/img/dislike.png" alt="" />
        <span>No</span>
      </div>
    </div>
  );
};

export default Review;
