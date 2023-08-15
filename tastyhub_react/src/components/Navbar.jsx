import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Modal from "../Modal";
import Cart from "../pages/Cart";
import { useCart } from "./ContextReducer";

const Navbar = () => {
  let cartArray = useCart();
  const navigate = useNavigate();
  const [cartView, setCartView] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  // count cart items
  let cartTotalCount = cartArray.reduce((total, foodItem) => {
    let qty = parseInt(foodItem?.qty);
    total += qty;
    return total;
  }, 0);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fs-2">
          TastyHub
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mt-2 mx-2">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">
                Home
              </Link>
            </li>
            {localStorage.getItem("authToken") && (
              <li className="nav-item">
                <Link to="/myOrder" className="nav-link active">
                  My orders
                </Link>
              </li>
            )}
          </ul>

          {!localStorage.getItem("authToken") ? (
            <div className="d-flex">
              <Link className="btn btn-custom mx-1" to="/login">
                Login
              </Link>

              <Link className="btn btn-custom mx-1" to="/sign-up">
                Signup
              </Link>
            </div>
          ) : (
            <div>
              <div
                className="btn bg-white text-success mx-2"
                style={{ position: "relative" }}
                onClick={() => setCartView(true)}
              >
                <img
                  width="26"
                  height="26"
                  src="https://img.icons8.com/fluency/48/shopping-cart.png"
                  alt="shopping-cart"
                />
                {cartTotalCount === 0 ? (
                  ""
                ) : (
                  <Badge
                    pill
                    bg="danger"
                    style={{ position: "absolute", top: "-12px", left: "33px" }}
                  >
                    {cartTotalCount}
                  </Badge>
                )}
              </div>
              {cartView && (
                <Modal onClose={() => setCartView(false)}>
                  <Cart />
                </Modal>
              )}
              <div
                className="btn btn-custom logout mx-1"
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
