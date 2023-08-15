import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark py-2 border-top">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-md-4 d-flex align-items-center">
            <Link
              to="/"
              className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfU7pN9nLeChLWfFZLZ0sHjMqczVysJagSgQ&usqp=CAU" // Replace with your logo image
                alt="Logo"
                className="img-fluid"
                style={{ maxWidth: "100px", borderRadius: "50%" }} // Adjust the width as needed
              />
            </Link>
            <span className="text-muted">© 2023 Tasty Hub, Inc</span>
          </div>

          <div className="col-md-4">
            <ul className="nav justify-content-end list-unstyled d-flex">
              <li className="nav-item">
                <Link
                  to="/about"
                  className="nav-link text-muted text-decoration-none"
                >
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/contact"
                  className="nav-link text-muted text-decoration-none"
                >
                  Contact Us
                </Link>
              </li>
              {/* Add more links as needed */}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
