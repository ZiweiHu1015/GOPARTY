import React, { useState } from "react";
import "./Listing.scss";
import { Slider } from "infinite-react-carousel/lib";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";
import DatePicker from "react-datepicker";
import { parseISO } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

function Listing() {
  const { id } = useParams();
  const [personalizationText, setPersonalizationText] = useState("");
  const [savedText, setSavedText] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

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
    setSelectedOption(event.target.value); 
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
      availableEndDate: data.AvailableEndDate,
      unavailableDates: data.UnavailableDates
    };
    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
    window.location.href = `/pay/${data.ProductID}`;
  };

  const handlePersonalizationSave = (e) => {
    if (e.key === "Enter") {
      setSavedText(personalizationText);
      setPersonalizationText(""); // Clear the input box
    }
  };


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const isDateAvailable = (date) => {
    if (!data.UnavailableDates) {
      return true;
    }

    let unavailableDates = [];
    try {
      unavailableDates = JSON.parse(data.UnavailableDates);
    } catch (error) {
      return true;
    }

    if (!Array.isArray(unavailableDates)) {
      return true;
    }

    const parsedUnavailableDates = unavailableDates.map(dateString => {
      const parsedDate = parseISO(dateString);
      return parsedDate;
    });

    const isAvailable = !parsedUnavailableDates.some(unavailableDate =>
      date.getFullYear() === unavailableDate.getFullYear() &&
      date.getMonth() === unavailableDate.getMonth() &&
      date.getDate() === unavailableDate.getDate()
    );

    console.log("Checking date:", date, "is available:", isAvailable); // Debug line
    return isAvailable;
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
            <Reviews ProductID={id} sellerId={data.SellerID}/>
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

   
           <div className="chooseDate">
            <label htmlFor="datePicker" className="date-picker-label">Choose your Date:</label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              filterDate={isDateAvailable}
              placeholderText="Select a date"
              className="date-picker"
              id="datePicker"
            />
          </div>
            
    
            <div className="personalization-container">
              <label htmlFor="personalizationInput" className="personalization-label">Add personalization for your order:</label>
              <input
                type="text"
                className="personalizationInput"
                id="personalizationInput"
                value={personalizationText}
                onChange={(e) => setPersonalizationText(e.target.value)}
                onKeyPress={handlePersonalizationSave}
                placeholder="Type any specific details here..."
              />
            </div>
            {savedText && (
              <div className="saved-text">
                Personalization: {savedText}
                <button className="remove-button" onClick={() => setSavedText("")}>×</button>
              </div>
            )}
            

            <div className="detail-item">
            <label className="detail-label">Delivery Type:</label>
            <strong>{"    "+ data.DeliveryType}</strong>
          </div>



            <div className = "pay">
              <Link to={`/pay/${data.ProductID}`}>
               <button onClick={handleConfirmOrder}>Confirm Order</button>
              </Link>
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
                  <span className="owner">Owner of {data.StoreName}</span>
                  <span className="location">Service Location: {data.ServiceArea}</span>
                  <span className="member-since">Member since:{data.MemberSince}</span>
                </div>
              </div>
              
              <div className="box">
              
                <button className="message-button">Contact Seller</button>
                <hr />
                <p>{data.StoreDescription}</p>
              </div>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Listing;
