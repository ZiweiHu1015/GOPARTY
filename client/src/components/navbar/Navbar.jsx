import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Navbar.scss";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  // console.log("currentUser", currentUser);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">GoParty</span>
          </Link>
        </div>
        <div className="links">
          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.user.ProfilePicture || "/img/userProfile.jpg"} alt="" />
              <span>{currentUser?.user.Username}</span>
              {open && (
                <div className="options">
                  {currentUser.user.isSeller && (
                    <>
                      <Link className="link" to="/mygigs">
                        Gigs
                      </Link>
                      <Link className="link" to="/add">
                        Add New Listing
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">
                <button>Sign in</button>
              </Link>
             {/* <Link className="link" to="/register">
                <button>Register</button>
              </Link>
          */ }
            </>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
       <>
          <hr />
          <div className="menu">
            <span className="link menuLink" onClick={() => handleNavigation("/listings?cat=balloon")}>
              Balloon Art
            </span>
            <span className="link menuLink" onClick={() => handleNavigation("/gilistingsgs?cat=floral")}>
              Floral
           </span>
            <span className="link menuLink" onClick={() => handleNavigation("/listings?cat=cake")}>
              Cake
            </span>
            <span className="link menuLink" onClick={() => handleNavigation("/listings?cat=package")}>
              Packages
            </span>
            <span className="link menuLink" onClick={() => handleNavigation("/listings?cat=grabandgo")}>
              Grab and Go
            </span>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar;
