import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="top">
          <div className="item">
            <h2>Categories</h2>
            <span>Wedding</span>
            <span>Engagement</span>
            <span>Birthday</span>
            <span>Anniversary</span>
            <span>Bachelor Party</span>
            <span>Baby Shower</span>
            <span>Opening Ceremony</span>
            
          </div>
          <div className="item">
            <h2>About</h2>
            <span>Partnerships</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Intellectual Property Claims</span>
            <span>Investor Relations</span>
            <span>Contact Sales</span>
          </div>
          <div className="item">     
            <h2>Support</h2>
            <span>Help Center</span>
            <span>Customer Service</span>
            <span>Trust & Safety</span>
            <span>Selling on GoParty</span>
            <span>Buying on GoParty</span>
          </div>
          <div className="item">
            <h2>Community</h2>
            <span>Invite a Friend</span>
            <span>Become a Seller</span>
            <span>Community Standards</span>
          </div>
          <div className="item">
            <h2>More From GoParty</h2>
            <span>GoParty Business</span>
            <span>GoParty Pro</span>
            <span>GoParty Workspace</span>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <h2>GoParty</h2>
            <span>© GoParty International Ltd. 2024</span>
          </div>
          <div className="right">
            <div className="social">
              <img src="/img/twitter.png" alt="" />
              <img src="/img/facebook.png" alt="" />
              <img src="/img/linkedin.png" alt="" />
              <img src="/img/pinterest.png" alt="" />
              <img src="/img/instagram.png" alt="" />
            </div>
            <div className="link">
              <img src="/img/language.png" alt="" />
              <span>English</span>
            </div>
            <div className="link">
              <img src="/img/coin.png" alt="" />
              <span>USD</span>
            </div>
            <img src="/img/accessibility.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
