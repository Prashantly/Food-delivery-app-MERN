import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import API_BASE_URL from "../constant";
import RingLoader from "react-spinners/RingLoader";

const UserOrders = () => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let email = localStorage.getItem("userEmail");
    let token = localStorage.getItem("authToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const fetchMyOrders = async () => {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/getOrders`,
          {
            email: email,
          },
          { headers }
        );
        console.log("Response:", response);
        if (response.status === 200) {
          if (response.data.orders.length === 0) {
            setOrderData([]);
          } else {
            console.log(response.data.orders);
            setOrderData(response.data.orders);
          }
        }

        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchMyOrders();
  }, []);
  return (
    <>
      <Navbar />
      <div className="container">
        {loading ? (
          <RingLoader
            color="#12ff1d"
            cssOverride={{
              borderColor: "red",
              display: "block",
              margin: "0 auto",
              marginTop: "40px",
            }}
            size={100}
            speedMultiplier={1}
          />
        ) : orderData.length === 0 ? (
          <div className="mt-4 text-center">
            <h3>
              You don't have any orders at the moment! Please check back
              later...😔😔
            </h3>
          </div>
        ) : (
          <div className="row">
            {orderData.map((order, index) => (
              <div key={index} className="order-container">
                <div className="order-date">{order[0].Order_date}</div>
                <div className="order-items">
                  {order.slice(1).map((item, itemIndex) => (
                    <div key={itemIndex} className="order-item">
                      <div className="card">
                        <img
                          src={item.img}
                          className="card-img-top"
                          alt={item.name}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{item.name}</h5>
                          <div className="item-details">
                            <span className="item-qty">{item.qty}</span>
                            <span className="item-size">{item.size}</span>
                            <span className="item-price">₹{item.price}/-</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default UserOrders;
