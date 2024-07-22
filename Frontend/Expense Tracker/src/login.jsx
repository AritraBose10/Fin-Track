import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./assets/login.css";
import Logo from "./logo";

function Login() {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const username = formData.get("txt");
    const email = formData.get("email");
    const password = formData.get("pswd");

    const data = {
      username,
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/auth/signup`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        alert("Signup successful!");
        navigate("/home");
      }
    } catch (error) {
      console.error("Error:", error);
      console.log("URL=", `${import.meta.env.VITE_URL}/auth/signup`);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("pswd");

    const data = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/api/auth/login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        navigate("/home");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="container">
      <Logo />
      <div className="main">
        <input
          type="checkbox"
          id="chk"
          checked={checked}
          onChange={handleCheckboxChange}
        />
        <div className="signup">
          <form onSubmit={handleSignup}>
            <label htmlFor="chk">Sign up</label>
            <input type="text" name="txt" placeholder="Username" required />
            <input type="email" name="email" placeholder="Email" required />
            <input
              type="password"
              name="pswd"
              placeholder="Password"
              required
            />
            <button type="submit" className="button">
              Sign up
            </button>
          </form>
        </div>
        <div className="login">
          <form onSubmit={handleLogin}>
            <label htmlFor="chk">Login</label>
            <input type="email" name="email" placeholder="Email" required />
            <input
              type="password"
              name="pswd"
              placeholder="Password"
              required
            />
            <button type="submit" className="button">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
