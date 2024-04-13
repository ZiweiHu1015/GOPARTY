import React, { useState, useEffect } from 'react';
import "./Navbar.scss";
import {Link, useLocation, useNavigate} from "react-router-dom";

const Navbar = () => {

    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);

    const{pathname} = useLocation()

    const isActive = () =>{
        window.scrollY > 0 ? setActive(true)  : setActive(false);
    };

    useEffect(() => {
        window.addEventListener("scroll", isActive);
        return () => {
          window.removeEventListener("scroll", isActive);
        };
      }, []);

    const currentUser = {
        id: 1,
        username : "Emma Hu",
        isSeller:true

    }
    const navigate = useNavigate();

  return (
    <div className ={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className = "container">
        <div className = "logo">
                <Link to = "/" className ="link">
                <span className = 'text'>GoParty</span>
                </Link>
            
            <span className = 'dot'>.</span>
        </div>
        <div className = "links">
            <span>GoParty Business</span>
            <span>Explore</span>
            <span>English</span>
            <span>Sign in</span>
            {!currentUser ?.isSeller && <span>Become a Seller</span>}
            {!currentUser &&  <button>Join</button>} 
            {currentUser && (
                <div className = "user" onClick = {() => setOpen(!open)}>
                    <img src = "https://i.pinimg.com/564x/d4/5e/c7/d45ec76edd768fb26a788627261ff37e.jpg" alt = ""/>
                    <span>{currentUser?.username}</span>
                    
                    { open && <div className = "options"> 
                        {
                            currentUser?.isSeller && (
                                <>  
                                    <Link className = "link" to='/mygigs'> Gigs </Link>
                                    <Link className = "link" to= '/add'> Add New Gig</Link>
                                </>
                            )}
                        <Link className = "link" to= "/orders">Orders</Link>
                        <Link className = "link" to= "/messages">Messages</Link>
                        <Link className = "link" to= "/">Logout</Link>
                    </div>}

                </div>

            )}
            <span>Become a Seller </span>
           

        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to="/">
              Graphics & Design
            </Link>
            <Link className="link menuLink" to="/">
              Video & Animation
            </Link>
            <Link className="link menuLink" to="/">
              Writing & Translation
            </Link>
            <Link className="link menuLink" to="/">
              AI Services
            </Link>
            <Link className="link menuLink" to="/">
              Digital Marketing
            </Link>
            <Link className="link menuLink" to="/">
              Music & Audio
            </Link>
            <Link className="link menuLink" to="/">
              Programming & Tech
            </Link>
            <Link className="link menuLink" to="/">
              Business
            </Link>
            <Link className="link menuLink" to="/">
              Lifestyle
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar;
