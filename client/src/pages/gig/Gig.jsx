import React, { useState } from "react";
import "./Gig.scss";
import { Slider } from "infinite-react-carousel/lib";
import { Link, useParams, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";


function Gig() {
  const { id } = useParams();
  const [personalizationText, setPersonalizationText] = useState("");

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => {
        return res.data;
      }),
  });

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });

  // save for order detail
const handleConfirmOrder = () => {
  const orderDetails = {
    seller: dataUser.username,
    sellerImg:dataUser.img,
    title: data.title,
    price: data.price,
    image: data.images[0], // assuming the first image is what you want to display
    personalization: personalizationText
  };

  localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
  window.location.href = `/pay/${id}`; // Using window.location for redirection
}





  return (
    <div className="gig">
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
            <h1>{data.title}</h1>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="user">
                <img
                  className="pp"
                  src={dataUser.img || "/img/userProfile.jpg"}
                  alt=""
                />
                <span>{dataUser.username}</span>
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, i) => (
                        <img src="/img/star.png" alt="" key={i} />
                      ))}
                    <span>{Math.round(data.totalStars / data.starNumber)}</span>
                  </div>
                )}
              </div>
            )}
            <Slider slidesToShow={1} arrowsScroll={1} className="slider">
              {data.images.map((img) => (
                <img key={img} src={img} alt="" />
              ))}
            </Slider>

            <h2>About This Listing</h2>
            <p>{data.desc}</p>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="seller">
                <h2>About The Seller</h2>
                <div className="user">
                  <img src={dataUser.img || "/img/sellerProfile.jpg"} alt="" />
                  <div className="info">
                    <span>{dataUser.username}</span>
                    {!isNaN(data.totalStars / data.starNumber) && (
                      <div className="stars">
                        {Array(Math.round(data.totalStars / data.starNumber))
                          .fill()
                          .map((item, i) => (
                            <img src="/img/star.png" alt="" key={i} />
                          ))}
                        <span>
                          {Math.round(data.totalStars / data.starNumber)}
                        </span>
                      </div>
                    )}
                    <button>Contact Me</button>
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">Aug 2022</span>
                    </div>
                    <div className="item">
                      <span className="title">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Area of service</span>
                      <span className="desc">Greater Boston Area</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English, Spanish</span>
                    </div>
                    <div className="item">
                      <span className="title">Specialize in</span>
                      <span className="desc">Floral</span>
                    </div>
                  </div>
                  <hr />
                  <p>{dataUser.desc}</p>
                </div>
              </div>
            )}
          <Reviews gigId={id} />
          </div>
          <div className="right">
           
            <div className="price">
              <h3>{data.title}</h3>
              <h2>$ {data.price}</h2>
            </div>


            <span> Color: {data.color}</span>
            <span>Size: {data.size}</span>
            <span>Avaiable Dates: {data.deliveryDate}</span>
            <span>Delivery Type: {data.deliveryType}</span>

            <label htmlFor="personalizationInput">Add personalization for your order:</label>
              <input
                  type="text"
                  className="personalizationInput"
                  id="personalizationInput"
                  value={personalizationText}
                  onChange={(e) => setPersonalizationText(e.target.value)}
                  placeholder="Type any specific details here..."
              />

            <div className="features">
              {data.features.map((feature) => (
                <div className="item" key={feature}>
                  <img src="/img/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="personalization">
             
            </div>

            <Link to={`/pay/${id}`}>
            <button onClick={handleConfirmOrder}>Confirm Order</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gig;
