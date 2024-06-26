import React, { useEffect, useState } from "react";
import "./Pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import { format } from 'date-fns';

import newRequest from "../../utils/newRequest";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

const stripePromise = loadStripe(
    "pk_test_51P8QNZP3GPew7dFvznMAM3anMgCKu624BND36TD9MOd6md9lXUtJ77DgBL2qN05aQQEp5DYPN0vw7KjC5kE2eUch00AY9mjIpV"
  );


const Pay = () => {
    const { id } = useParams();
    const [clientSecret, setClientSecret] = useState("");
    const [orderDetails, setOrderDetails] = useState({});

    useEffect(() => {
        const makeRequest = async () => {
          try {
            const res = await newRequest.post(
              `/orders/create-payment-intent/${id}`
            );
            setClientSecret(res.data.clientSecret);
          } catch (err) {
            console.log(err);
          }
        };
        makeRequest();
         // Retrieve order details from localStorage
         const storedDetails = localStorage.getItem('orderDetails');
         if (storedDetails) {
           setOrderDetails(JSON.parse(storedDetails));
           console.log("localStorage", localStorage);
         }
     }, [id]);

      const appearance = {
        theme: 'stripe',
      };
      const options = {
        clientSecret,
        appearance,
      };

      const formatDate = (dateString) => {
        return format(new Date(dateString), 'MMMM dd, yyyy');
      };

    
      return <div className="pay">
        <div className = "checkout" >
          <div className = "container" >
              <div className="left">
              
              <div className="orderCard">
              <div className="orderCardHeader">
                  <img src={orderDetails.sellerImg || "/img/userProfile.jpg"} alt="Seller" className="sellerImg" />
                  <div className="sellerName">{orderDetails.seller}</div>
                  <div className = "contactSeller"> Contact Seller</div>
                </div>
                  {orderDetails.image && (
                    <div className="orderCardTop">
                      
                      <img src={orderDetails.image} alt={orderDetails.title} className="orderImage" />
                      <div className="orderDetails">
                        <h3>Title: {orderDetails.title}</h3>
                        <p>Option: {orderDetails.selectedOption}</p>
                        <p>Personalization: {orderDetails.personalization}</p>
                        <p>Date: {formatDate(orderDetails.selectedDate)}</p>
                        {/* Include other details like size etc. */}
                      </div>
                      <div className="orderPrice">
                        <p><strong>${orderDetails.price}</strong></p>
                      </div>
                    </div>
                  )}
                  {/* Include quantity dropdown, Edit, Save, Remove options below */}
              </div>
            
            
            </div>

            <div className = "right">
              <div className = "payment">
                {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                      <CheckoutForm />
                    </Elements>
                  )}
            </div>
          </div>
      </div>
      </div>
    </div>
    };
    
    export default Pay;
