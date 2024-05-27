import React from "react";
import "./ListingCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const ListingCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [item.SellerID], // Ensure this matches your data structure
    queryFn: () =>
      newRequest.get(`/users/${item.SellerID}`).then((res) => {
        console.log("Fetched user data:", res.data); // Debug message
        return res.data;
      }),
    onError: (err) => {
      console.error("Error fetching user data:", err.response ? err.response.data : err.message); // Debug message
    }
  });

  console.log("ListingCard item:", item); // Debug message
  console.log("ListingCard user data:", data);

  return (
    <Link to={`/listing/${item.ProductID}`} className="link">
      <div className="ListingCard">
        <img src={item.CoverImage} alt="CoverImage" />
          <div className="priceCircle">
            <h2>$ {item.Price}</h2>
          </div>
          <div className="favoriteIcon">
          <img src="./img/heart.png" alt="Save to Favorite" />
        </div>
        </div>
      
    </Link>
  );
};

export default ListingCard;
