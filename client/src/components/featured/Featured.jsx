import React, { useState } from "react";
import "./Featured.scss";
import { useNavigate } from "react-router-dom";

function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/gigs?search=${input}`);
  };

  const handleSearch = (keyword) => {
    navigate(`/gigs?search=${keyword}`);  // Navigate to search page with preset keyword
  };

  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1 style={{ color: '#A8D1D1'}}>
            Create your next <span>moment</span> with us.
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input
                type="text"
                placeholder='Gender reveal party '
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
            </div>
            <button onClick={handleSubmit}>Search</button>
          </div>
          <div className="popular">
            <span style={{ color: '#A8D1D1'}} >Search by key word:</span>
            <button onClick={() => handleSearch("Birthday")}>Birthday</button>
            <button onClick={() => handleSearch("Wedding")}>Wedding</button>
            <button onClick={() => handleSearch("Engagement")}>Engagement</button>
            <button onClick={() => handleSearch("Anniversary")}>Anniversary</button>
            <button onClick={() => handleSearch("Kids")}>Kids</button>
          </div>
        </div>
        <div className="right">
          <img src="./img/main.jpg" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Featured;
