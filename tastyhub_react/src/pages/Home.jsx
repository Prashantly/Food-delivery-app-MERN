import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import API_BASE_URL from "../constant";

const Home = () => {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async (req, res) => {
    let response = await fetch(`${API_BASE_URL}/api/foodData`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();
    // console.log(response[0], response[1]);
    setFoodItems(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <>
      <Navbar />
      {/* Carousel component */}
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div
              className="d-flex search-form justify-content-center"
              role="search"
            >
              <input
                className="form-control me-2 search-input"
                type="search"
                placeholder="Search for foods"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {/* <button className="btn text-white search-button" type="submit">
                Search
              </button> */}
            </div>
          </div>

          <div className="carousel-item active">
            <div
              className="overlay-image"
              style={{
                backgroundImage:
                  'url("https://source.unsplash.com/random/?pizza")',
              }}
            ></div>
            {!localStorage.getItem("authToken") && (
              <div className="container">
                <h1>Welcome to TastyHub</h1>
                <p>
                  Welcome to TastyHub! Explore our mouthwatering menu filled
                  with classic food items that will take your taste buds on an
                  unforgettable journey. From sizzling appetizers to delectable
                  desserts, we've got it all. Join us and savor the flavors
                  today!
                </p>
                <Link
                  to="/sign-up"
                  className="btn btn-lg btn-success text-white"
                >
                  Sign Up & Order Now
                </Link>
              </div>
            )}
          </div>
          <div className="carousel-item">
            <div
              className="overlay-image"
              style={{
                backgroundImage:
                  'url("https://source.unsplash.com/random/?pastry")',
              }}
            ></div>
            {!localStorage.getItem("authToken") && (
              <div className="container">
                <h1>Experience Exquisite Delights</h1>
                <p>
                  Indulge in a delightful journey of flavors and textures with
                  our exquisite pastry collection. Each bite is a perfect blend
                  of sweetness and elegance. Join us and let your taste buds
                  dance!
                </p>
                <Link
                  to="/sign-up"
                  className="btn btn-lg btn-success text-white"
                >
                  Explore Pastry Delights
                </Link>
              </div>
            )}
          </div>
          <div className="carousel-item">
            <div
              className="overlay-image"
              style={{
                backgroundImage:
                  'url("https://source.unsplash.com/random/?barbeque")',
              }}
            ></div>
            {!localStorage.getItem("authToken") && (
              <div className="container">
                <h1>Ignite Your Taste Buds</h1>
                <p>
                  Step into the world of smoky goodness and mouthwatering
                  barbeque flavors. Our TastyHub experience will tantalize your
                  senses and leave you craving for more. Join us and ignite your
                  taste adventure!
                </p>
                <Link
                  to="/sign-up"
                  className="btn btn-lg btn-success text-white"
                >
                  Explore Barbeque Feast
                </Link>
              </div>
            )}
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Cards display logic */}
      <div className="container">
        {foodCat.length !== 0 &&
          foodCat.map((category) => (
            <div key={category._id} className="row mb-3">
              <div className="fs-3 m-3 fw-bold">{category.CategoryName}</div>
              <hr />
              {foodItems.length !== 0 ? (
                foodItems
                  .filter(
                    (item) =>
                      item.CategoryName === category.CategoryName &&
                      item.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((filteredItem) => (
                    <div
                      key={filteredItem._id}
                      className="col-12 col-md-6 col-lg-3"
                    >
                      <Card
                        foodItem={filteredItem}
                        options={filteredItem.options[0]}
                      />
                    </div>
                  ))
              ) : (
                <div>No Such Data Found</div>
              )}
            </div>
          ))}
      </div>
      <Footer />
    </>
  );
};

export default Home;
