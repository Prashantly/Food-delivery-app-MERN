import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-hot-toast";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/api/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Body for POST or PUT requests
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    };
    const request = new Request(url, options);

    const response = await fetch(request);
    const data = await response.json();
    console.log(data);

    if (!data.success) {
      setCredentials({
        email: "",
        password: "",
      });
      toast.error(data.message);
    } else {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", data.auth.token);
      // console.log(localStorage.getItem("authToken"));
      toast(
        `Guess who just made the smartest decision of the day? You did!🫵🏿 Welcome to food paradise, where every bite is a step closer to bliss!🤤`,
        {
          duration: 6000,
          position: "top-center",
          style: {
            backgroundColor: "#FFE23B",
            color: "#44150E",
          },
        }
      );
      navigate("/"); //redirect to homepage
    }
  };

  const handleInputChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        height: "100vh",
        backgroundSize: "cover",
      }}
    >
      <Navbar />
      <div className="container">
        <form
          className="w-50 m-auto mt-5 border bg-dark border-success rounded"
          onSubmit={handlesubmit}
        >
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
              We'll never share your email with anyone.
            </div>
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

          <button
            type="submit"
            className="m-3 btn btn-success"
            style={{ fontWeight: "800", color: "black" }}
          >
            Submit
          </button>
          <Link
            to={"/sign-up"}
            className="m-3 btn btn-success"
            style={{
              fontWeight: "800",
              color: "black",
            }}
          >
            New User
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
