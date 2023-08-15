import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const UserOrders = () => {
  const [orderData, setOrderData] = useState([]);
  const [noOrders, setNoOrders] = useState(true);
  useEffect(() => {
    let email = localStorage.getItem("userEmail");
    const fetchMyOrders = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/getOrders",
          {
            email: email,
          }
        );
        console.log("Response:", response);
        if (response.status === 200) {
          if (response.data.orders.length === 0) {
            console.log(noOrders);
          } else {
            console.log(response.data.orders);
            setNoOrders(false);
            setOrderData(response.data.orders);
          }
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchMyOrders();
  }, [noOrders]);
  return (
    <>
      <Navbar />
      {noOrders ? (
        <div className="container mt-4 text-center">
          <h3>
            You don't have any orders at the moment! Please check back
            later...😔😔
          </h3>
        </div>
      ) : (
        <div className="container">
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
        </div>
      )}
    </>
  );
};

export default UserOrders;
