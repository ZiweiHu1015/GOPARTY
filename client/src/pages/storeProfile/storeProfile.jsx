import React, { useEffect, useRef, useState } from "react";
import "./storeProfile.scss";
import ListingCard from "../../components/listingCard/ListingCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useParams } from "react-router-dom";

const StoreProfile = () => {
    const { sellerId } = useParams(); // Get storeId from the URL
    const [sort, setSort] = useState("sales");
    const [open, setOpen] = useState(false);
    
    const minRef = useRef();
    const maxRef = useRef();

    const constructQueryString = () => {
        const params = new URLSearchParams();
        if (minRef.current?.value) params.set('min', minRef.current.value);
        if (maxRef.current?.value) params.set('max', maxRef.current.value);
        if (sort) params.set('sort', sort);
        return `?${params.toString()}`;
    };

    const queryString = constructQueryString();

    const { isLoading, error, data, refetch } = useQuery({
      queryKey: ["storeProfile", sellerId, queryString],
      queryFn: () => {
        return newRequest
          .get(`/listing?sellerId=${sellerId}${queryString}`)
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            console.error("Error fetching store profile:", err.response ? err.response.data : err.message);
            throw err;
          });
      },
    });

    const { isLoading: isLoadingUser, error: errorUser, data: sellerData } = useQuery({
        queryKey: ["sellerInfo", sellerId],
        queryFn: () => {
          return newRequest
            .get(`/users/${sellerId}`)
            .then((res) => {
              console.log("Fetched seller data:", res.data); // Print fetched data
              return res.data;
            })
            .catch((err) => {
              console.error("Error fetching seller info:", err.response ? err.response.data : err.message);
              throw err;
            });
        },
      });

    const reSort = (type) => {
        setSort(type)
        setOpen(false)
    }

    useEffect(() => {
        refetch();
    }, [sort, minRef.current?.value, maxRef.current?.value]);

    const apply = () => {
        refetch();
    };

    if(!sellerData) {
        return <div>no found</div>
    }

    return (
        <div className="storeProfile">
            <div className="container">
                {isLoading ? (
                    "loading"
                ) : error ? (
                    "Something went wrong!"
                ) : (
                    <>
                        <div className="seller">
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
                        <div className="storeInfo">
                            <h1>{sellerData.StoreName}</h1>
                            <p>{sellerData.storedescription}</p>
                            <p>Service Location: {sellerData.serviceLocation}</p>
       
                        </div>
                        <div className="menu">
                            <div className="left">
                                <span>Budget</span>
                                <input ref={minRef} type="number" placeholder="min" />
                                <input ref={maxRef} type="number" placeholder="max" />
                                <button onClick={apply}>Apply</button>
                            </div>
                            <div className="right">
                                <span className="sortBy"> Sort By</span>
                                <span className="sortType">{sort === "sales" ? "Best Selling" : "Newest"}</span>
                                <img src="/img/down.png" alt="" onClick={() => setOpen(!open)} />
                                {open && (
                                    <div className="rightMenu">
                                        {sort === "sales" ? (
                                            <span onClick={() => reSort("createdAt")}>Newest</span>
                                        ) : (
                                            <span onClick={() => reSort("sales")}>Best Selling</span>
                                        )}
                                        <span onClick={() => reSort("sales")}>Popular</span>
                                    </div>
                                )}
                            </div>
                        </div>

                         <div className="cards">
                            {data && data.length > 0 ? ( // Adjust the condition based on the actual structure of data
                                data.map((listing) => (
                                    <ListingCard key={listing.ProductID} item={listing} />
                                ))
                            ) : (
                                "No listings found."
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default StoreProfile;
