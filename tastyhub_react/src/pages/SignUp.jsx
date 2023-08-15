import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import axios from "axios";
import toast from "react-hot-toast";

// https://api.opencagedata.com/geocode/v1/json?q=12.2958104+76.6393805&key=14b0b59773d44adaa692821f2f5d9a50`;
let geo_API = "https://api.opencagedata.com/geocode/v1/json?";
let API_KEY = "14b0b59773d44adaa692821f2f5d9a50";

const SignUp = () => {
  const [address, setAddress] = useState("");
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    location: "",
    password: "",
    confirm_password: "",
  });
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    let navLocation = () => {
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
      });
    };

    try {
      let latlong = await navLocation().then((res) => {
        let latitude = res.coords.latitude;
        let longitude = res.coords.longitude;
        return [latitude, longitude];
      });

      let [lat, long] = latlong;
      let response = await axios.get(
        `${geo_API}q=${lat}+${long}&key=${API_KEY}`
      );
      // console.log(response);
      const location = response.data.results[0].formatted;
      setAddress(location);
      setCredentials({ ...credentials, location: address });
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/api/create-user";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Body for POST or PUT requests
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        location: credentials.location,
        password: credentials.password,
        confirm_password: credentials.confirm_password,
      }),
    };
    const request = new Request(url, options);

    const response = await fetch(request);
    const data = await response.json();
    console.log(data);

    //reset form details and navigate to login page
    if (data.success) {
      toast(
        `Hi ${credentials.name}, you've just taken the first step on your journey to happiness! 🎉 Your food adventures are about to begin, and we're here to make every bite delightful. Welcome to a world of flavors, satisfaction, and unforgettable meals. Enjoy the ride! 🍔🍕🍜`,
        {
          duration: 9000,
          position: "top-center",
          style: {
            backgroundColor: "#63C1E5",
            color: "#333333",
          },
        }
      );
      setCredentials({
        name: "",
        email: "",
        location: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/login");
    } else {
      toast.error(data.message);
    }
  };

  const handleInputChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        backgroundSize: "cover",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
        <Navbar />
      </div>
      <div
        className="container"
        style={{
          flex: 1,
          overflow: "auto",
          padding: "20px 0",
        }}
      >
        <form
          className="w-50 m-auto mt-5 border bg-dark border-success rounded"
          onSubmit={handlesubmit}
        >
          <div className="m-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              value={credentials.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="m-3">
            <label htmlFor="user-email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="user-email"
              value={credentials.email}
              onChange={handleInputChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="m-3">
            <label htmlFor="user-location" className="form-label">
              Location
            </label>
            <input
              type="text"
              name="location"
              className="form-control"
              id="user-location"
              value={credentials.location}
              onChange={handleInputChange}
            />
          </div>
          <div className="m-3">
            <button
              type="button"
              onClick={handleClick}
              name="geolocation"
              className=" btn btn-success"
            >
              Click for current Location{" "}
            </button>
          </div>
          <div className="m-3">
            <label htmlFor="pass" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="pass"
              value={credentials.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="m-3">
            <label htmlFor="conf_pass" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm_password"
              className="form-control"
              id="conf_pass"
              value={credentials.confirm_password}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="m-3 btn btn-success"
            style={{ fontWeight: "800" }}
          >
            Submit
          </button>
          <Link
            to={"/login"}
            className="m-3 btn"
            style={{
              backgroundColor: "#FC8019",
              fontWeight: "800",
              color: "black",
            }}
          >
            Already a user
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
