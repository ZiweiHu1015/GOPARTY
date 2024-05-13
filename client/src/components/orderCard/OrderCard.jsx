import React from "react";
import "./OrderCard.scss"; // Assuming you have an SCSS file for styles


const OrderCard = ({ order }) => {
  return (
    <div className="order-card">
      
      <div className="orderCardHeader">
            <img src={order.sellerImg || "/img/userProfile.jpg"} alt="Seller" className="sellerImg" />
            <div className="sellerName">Ordered from: {order.seller}</div>
            <div className = "contactSeller"> Contact Seller</div>
      </div>

      {order.img && (
          <div className="orderCardBody">
            
            <img src={order.img} alt={order.title} className="orderImage" />
            
            <div className="orderPrice">
              <p><strong>${order.price}</strong></p>
            </div>
              <div className="orderDetails">
                <h3>Title: {order.title}</h3>
                <p>Color: {order.color}</p>
                  <p>Personalization: {order.personalization}</p>        
                </div>
                
          </div>
      )}
    </div>
  );
};

export default OrderCard;