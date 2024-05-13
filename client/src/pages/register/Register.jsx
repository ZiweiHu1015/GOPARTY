import React, { useState } from "react";
import upload from "../../utils/upload";
import "./Register.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",  // Add this line for confirm password
    img: "",
    country: "",
    isSeller: false,
    desc: "",
    phone: "",  // Ensure you have phone in your initial state if you're using it in the form.
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = await upload(file);
    try {
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register">
     <div className = "header">
     <h1>Create a new account</h1>
          <div className="toggle">
            <label>Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>
       </div>

      <form onSubmit={handleSubmit}>
        <div className="left">
          <label>Username</label>
          <input
            name="username"
            type="text"
            placeholder="Emma"
            onChange={handleChange}
          />
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="email@example.com"
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="password"
            onChange={handleChange}
          />
          <label>Confirm Password</label>
          <input
            name="confirm_password"
            type="password"
            placeholder="Confirm your password"
            onChange={handleChange}
          />
      
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register;

