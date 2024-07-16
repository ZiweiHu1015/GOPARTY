import React, { useEffect, useRef, useState } from "react";
import "./Listings.scss";
import ListingCard from "../../components/listingCard/ListingCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";


const Listings = () => {
    const [sort, setSort] = useState("sales");
    const [open, setOpen] = useState(false);
    const {search} = useLocation();
    const queryParams = new URLSearchParams(search);
    const category = queryParams.get("cat");
  
    const minRef = useRef();
    const maxRef = useRef();

    const constructQueryString = () => {
      const params = new URLSearchParams(search);
      if (minRef.current?.value) params.set('min', minRef.current.value);
      if (maxRef.current?.value) params.set('max', maxRef.current.value);
      if (sort) params.set('sort', sort);
      return `?${params.toString()}`;
    };
    const queryString = constructQueryString();
    
    const { isLoading, error, data, refetch } = useQuery({
      queryKey: ["listings"],
      queryFn: () => {
        return newRequest
          .get(`/listing${queryString}`)
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            console.error("Error fetching listings:", err.response ? err.response.data : err.message);
            throw err;
          });
      },
    });

    const reSort = (type) =>{
        setSort(type)
        setOpen(false)
    }
    
   // Trigger refetch on parameter changes
    useEffect(() => {
        refetch();
    }, [sort, category, minRef.current?.value, maxRef.current?.value]);

    const apply = () => {
        refetch();
    };


  return (
    <div className = 'listings'>
      <div className = "container">
        <span className = "breadcrumbs"> GoParty {">"} {category}</span>
        <h1>Party Experts</h1>
        <p>
          Explore party experts 
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" min="1" placeholder="min" />
            <input ref={maxRef} type="number" min="1" placeholder="max" />
            <button onClick={apply}>Apply</button>
           </div>
           <div className="right">
            <span className = "sortBy"> SortBy</span>
            <span className = "sortType">{sort === "sales"? "Best Selling" : "Newest"} </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open &&(
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
            {isLoading
              ? "loading"
              : error
              ? "Something went wrong!"
              : (
                console.log("Data before mapping:", data), // Debugging log
                data && data.length > 0 // Ensure data is not undefined and has items
                ? data.map((listing) => <ListingCard key={listing.ProductID} item={listing} />)
                : "No listings found."
              )
          }
           </div>
        </div>
    </div>
  );
}

export default Listings;
