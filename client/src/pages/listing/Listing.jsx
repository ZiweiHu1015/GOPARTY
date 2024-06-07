import React, { useState } from "react";
import "./Listing.scss";
import { Slider } from "infinite-react-carousel/lib";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";

function Listing() {
  const { id } = useParams();
  const [personalizationText, setPersonalizationText] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const { isLoading, error, data } = useQuery({
    queryKey: ["listing"],
    queryFn: async () => {
      const url = `/listing/${id}`;
      try {
        const res = await newRequest.get(url);
        return res.data;
      } catch (err) {
        console.error("Error fetching listing:", err.response ? err.response.data : err.message); // Debug message
        throw err;
      } 
    },
  });

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value); // Update selected option state
  };


  const handleConfirmOrder = () => {
    const orderDetails = {
      seller: data.Username,
      title: data.Title,
      price: data.Price,
      image: data.Images[0],
      personalization: personalizationText,
      deliveryType: data.DeliveryType,
      availableStartDate: data.AvailableStartDate,
      availableEndDate: data.AvailableEndDate
    };

 
    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
    window.location.href = `/pay/${data.ProductID}`;
  };


  return (
    <div className="listing">
      {isLoading ? (
        "loading"
      ) : error ? (
        "Something went wrong!"
      ) : (
        
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">
              GoParty {">"} Party Design {">"}
            </span>
            <h1>{data.Title}</h1>
            <Slider slidesToShow={1} arrowsScroll={1} className="slider">
              {data.Images.map((img) => (
                <img key={img} src={img} alt="" />
              ))}
            </Slider>
            <h2>About This Listing</h2>
            <p>{data.Description}</p>
            <Reviews gigId={id} />
          </div>
          
          <div className="right">
            <div className="price">
              <h3><strong>{data.Title}</strong></h3>
              <h2><strong>${data.Price}</strong></h2>
            </div>

            <div className = "option">
            <label htmlFor="optionSelect" className="options-label">Options:</label>
            <select 
              id="optionSelect" 
              value={selectedOption} 
              onChange={handleOptionChange} 
              className="options-dropdown" 
            >
              <option value="" disabled>Select an option</option> 
              {data.Options && data.Options.length > 0 ? (
                data.Options.map((option, index) => (
                  <option key={index} value={option[0]}>
                    {option[0]} (${option[1]})
                  </option>
                ))
              ) : (
                <option value="no-options" disabled>No options available</option>
              )}
            </select>
           </div>

            <div className="details">
            <span className = "detail-item">Available Dates: <strong>{new Date(data.AvailableStartDate).toLocaleDateString()} - {new Date(data.AvailableEndDate).toLocaleDateString()}</strong></span>
            <span className = "detail-item">Delivery Type: <strong>{data.DeliveryType}</strong></span>
            </div>

            <div className = "personalization">
            <label htmlFor="personalizationInput">Add personalization for your order(extra charge may apply):</label>
            <input
              type="text"
              className="personalizationInput"
              id="personalizationInput"
              value={personalizationText}
              onChange={(e) => setPersonalizationText(e.target.value)}
              placeholder="Type any specific details here..."
            />
           </div>
            <div className="features">
              {data.PersonalizationOptions.split(',').map((option) => (
                <div className="item" key={option}>
                  <img src="/img/greencheck.png" alt="" />
                  <span>{option}</span>
                </div>
              ))}
              <div className = "pay">
              <Link to={`/pay/${data.ProductID}`}>
               <button onClick={handleConfirmOrder}>Confirm Order</button>
              </Link>
              </div>
            </div>
          
            <div className="seller">
              <p>Meet your seller</p>
              <div className="seller-info">
                <img
                  className="pp"
                  src={data.ProfilePicture || "/img/userProfile.jpg"}
                  alt={data.Username}
                />
                <div className="seller-details">
                  <span className="seller-name">{data.FirstName}</span>
                  <span className="owner">Owner of {data.ShopName}</span>
                  <span className="location">Service Location: {data.Location}</span>
                 
                </div>
              </div>
              <div className="box">
                <div className="items">
                  <div className="item">
                    <span className="title">Member since</span>
                    <span className="desc">{new Date(data.CreatedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="item">
                    <span className="title">Service Location</span>
                    <span className="desc">{data.Location}</span>
                  </div>
                </div>
                <button className="message-button">Contact Seller</button>
                <hr />
                <p>{data.Description}</p>
              </div>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Listing;
