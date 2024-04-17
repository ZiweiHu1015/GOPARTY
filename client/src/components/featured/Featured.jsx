import React from 'react'
import "./Featured.scss"

const Featured = () => {
  return (
    <div className = 'featured'>
        <div className="container">
            <div className="left">
                <h1>
                   Create <span>moments</span> with us. 
                </h1>
                <div className="search">
                    <div className="searchInput">
                    <img src="./img/search.png" alt="" />
                    <input 
                        type="text"  
                        placeholder="Tell us what's in your mind"
                    />
                </div>
                <button>Search</button>
            </div>
            <div className="popular">
                <span>Popular:</span>
                <button>Web Design</button>
                <button>birthday party</button>
                <button>logo Design</button>
                <button>AI service</button>
            </div>
            </div>


            <div className="right"> 
                <img src="./img/main.jpg" alt="" />
            
            
            </div>

       
 
      </div>
    </div>
  )
}

export default Featured
