import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";


const Gigs = () => {
    const [sort, setSort] = useState("sales");
    const [open, setOpen] = useState(false);
    const {search} = useLocation();
    const queryParams = new URLSearchParams(search);
    const category = queryParams.get("cat");
  
    const minRef = useRef();
    const maxRef = useRef();

    // Construct the query for the API based on current filters
    const queryString = `${search}&min=${minRef.current?.value}&max=${maxRef.current?.value}&sort=${sort}`;

    const { isLoading, error, data, refetch } = useQuery({
      queryKey: ["gigs"],
      queryFn: () =>
        newRequest
          .get(
            `/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
          )
          .then((res) => {
            return res.data;
          }),
    });

   // console.log(data);

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
    <div className = 'gigs'>
      <div className = "container">
        <span className = "breadcrumbs"> GoParty {">"} {category}</span>
        <h1>Party Experts</h1>
        <p>
          Explore party experts 
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
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
                : data.map((gig) => <GigCard key={gig._id} item={gig} />)}
           </div>
        </div>
    </div>
  );
}

export default Gigs;
