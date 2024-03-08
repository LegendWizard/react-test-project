import React, { useState, useEffect } from "react";
import Logo from "../assets/logo512.png";
import Screen1 from "../assets/Screen1.png";
import Screen2 from "../assets/Screen2.png";
import Screen3 from "../assets/Screen3.png";
import api from "../api/api"; // Import login function from api.js
import sweetalert2 from "sweetalert2";
import { useNavigate } from "react-router-dom";
import SimpleNotify from "simple-notify"; // Import SimpleNotify from simple-notify library

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [currentImage, setCurrentImage] = useState(0);

  const [loginStatus, setLoginStatus] = useState(null);
  const [loginMessage, setLoginMessage] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((currentImage + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentImage]);
  const images = [Screen1, Screen2, Screen3];
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username.trim() && !password.trim()) {
      setLoginStatus("error");
      setLoginMessage("Email and Password are required");
      return;
    } else if (!username.trim()) {
      setLoginStatus("error");
      setLoginMessage("Email is required");
      return;
    } else if (!password.trim()) {
      setLoginStatus("error");
      setLoginMessage("Password is required");
      return;
    }
    
    if (!validateEmail(username)) {
      sweetalert2.fire({
        title: "Oops, something went wrong!",
        text: "Please type email correctly.",
        icon: "error",
      });
    }
    try {
      const token = await api.login(username, password);

      if (token) {
        // Navigate to the Dashboard page
        navigate("/Dashboard");

        // Show a success alert
        sweetalert2.fire({
          title: "Log in Successful!",
          text: "You are now logged in.",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error during login:", error.message);

      // Show an error alert
      sweetalert2.fire({
        title: "Oops, something went wrong!",
        text: "Email or Password is wrong.",
        icon: "error",
      });
    }
  };
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <div className="h-screen flex">
      <div className="w-8/12 lg:w-9/12 bg-gray-300">
        <img
          src={images[currentImage]}
          alt={`Image ${currentImage + 1}`}
          className="h-full w-full object-cover lg:h-auto lg:w-full"
          style={{ height: "100%", width: "100%" }}
        />
      </div>
      <div className="w-4/12 lg:w-3/12 bg-purple-900">
        <div className="flex justify-center items-center h-full">
          <form
            className="w-full max-w-md"
            style={{ textAlign: "center" }}
            onSubmit={handleSubmit}
          >
            <div className="flex justify-center mb-8">
              <img src={Logo} alt="Image" className="h-auto w-32 lg:w-48" />
            </div>
            <div className="mb-4">
              <input
                className="w-full px-2 py-2 rounded bg-white-800 text-black focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Email"
                style={{ width: "70%" }}
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <input
                className="w-full px-2 py-2 rounded bg-white-800 text-black focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="Password"
                style={{ width: "70%" }}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="w-full bg-indigo-800 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              style={{ width: "70%" }}
            >
              Sign In
            </button>
          </form>
          {loginStatus === "success" && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline">{loginMessage}</span>
            </div>
          )}

          {loginStatus === "error" && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline">{loginMessage}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
