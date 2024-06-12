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
        return res.data;
      }),
    onError: (err) => {
      console.error("Error fetching user data:", err.response ? err.response.data : err.message); // Debug message
    }
  });

  const handleFavoriteClick = async (event) => {
    event.preventDefault();
    try {
      const response = await newRequest.post('/favorite/add', { productId: item.ProductID });
      console.log('Item added to favorites:', response.data);
      // Optionally, you can add some UI feedback here, like changing the heart icon color
    } catch (error) {
      console.error('Error adding item to favorites:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <Link to={`/listing/${item.ProductID}`} className="link">
      <div className="ListingCard">
        <img src={item.CoverImage} alt="CoverImage" />
          <div className="priceCircle">
            <h2>$ {item.Price}</h2>
          </div>
          <div className="favoriteIcon" onClick={handleFavoriteClick}>
          <img src="./img/heart.png" alt="Save to Favorite" />
        </div>
        </div>
      
    </Link>
  );
};

export default ListingCard;
