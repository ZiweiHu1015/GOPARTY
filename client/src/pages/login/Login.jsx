import React, { useState } from "react";
import "./Login.scss";
import newRequest from "../../utils/newRequest";
import register from "../register/Register";
import { useNavigate,Link} from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/")
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message); // Assuming your error response has a 'message' property
      } else {
        setError("An error occurred. Please try again."); // Fallback error message
      }
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
       
        {/* <div class = "header-container"> */}
        <div className = "header-container">
          <h1> 
          <Link to="/login">Sign in</Link> / <Link to="/register">Register</Link>
          </h1>
        </div>
 
        <label htmlFor="">Username</label>
        <input
          name="username"
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign in</button>
        {error && error}
      </form>
    </div>
  );
}

export default Login;
