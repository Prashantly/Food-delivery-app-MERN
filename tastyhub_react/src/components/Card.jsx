import React, { useState, useRef, useEffect } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";
import { toast } from "react-hot-toast";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Card = (props) => {
  const priceRef = useRef();
  let dispatch = useDispatchCart();
  let cartArray = useCart();
  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.foodItem;
  const isUserLoggedIn = !!localStorage.getItem("authToken");
  const [isModalOpen, setModalOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState();
  const [finalPrice, setFinalPrice] = useState(0);

  const handleAddToCart = async () => {
    let itemToADD = {
      ...foodItem,
      price: finalPrice,
      qty,
      size,
    };
    // console.log(ItemToADD);

    console.log(cartArray);

    const itemAlreadyInCart = cartArray.find(
      (item) => item.id === itemToADD._id && item.size === itemToADD.size
    );

    console.log(itemAlreadyInCart);

    if (!itemAlreadyInCart) {
      await dispatch({
        type: "ADD_TO_CART",
        payload: itemToADD,
      });
      toast.success("Your Food Item has been added to cart", {
        icon: "😍",
        style: {
          borderRadius: "10px",
          background: "#fff",
          color: "#333",
          fontSize: "20px",
        },
      });
    } else {
      // Check if the quantity has changed, update the quantity in cart
      if (itemAlreadyInCart.qty !== itemToADD.qty) {
        await dispatch({
          type: "UPDATE_QUANTITY",
          payload: {
            id: itemToADD._id,
            size: itemToADD.size,
            price: itemToADD.price,
            qty: itemToADD.qty,
          },
        });
        toast.success("Your Food Item has been updated in the cart", {
          icon: "👍",
          style: {
            borderRadius: "10px",
            background: "#fff",
            color: "#333",
            fontSize: "20px",
          },
        });
      } else {
        toast.error("Your order already been in the cart", {
          icon: "🤷🏿",
          style: {
            borderRadius: "10px",
            background: "#fff",
            color: "#333",
            fontSize: "20px",
          },
        });
      }
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    setSize(priceRef.current.value);
    // Calculate the final price based on qty and size
    if (size && options[size]) {
      let pr = parseInt(options[size].slice(1));
      const calculatedPrice = qty * parseInt(pr);
      setFinalPrice(calculatedPrice);
    }
  }, [qty, size, options]);

  return (
    <div className="card mt-3" style={styles.card}>
      <LazyLoadImage
        src={foodItem.img}
        className="card-img-top"
        alt={foodItem.name}
        style={styles.image}
        onClick={openModal}
      />
      <div className="card-body" style={styles.cardBody}>
        <h5 className="card-title text-center mb-3 mt-2" style={styles.title}>
          {foodItem.name}
        </h5>
        <div className="d-flex align-items-center justify-content-center">
          <select
            className="m-2 bg-success rounded"
            onChange={(e) => setQty(e.target.value)}
            style={styles.select}
          >
            {Array.from(Array(6), (e, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <select
            className="m-2 bg-success rounded"
            ref={priceRef}
            onChange={(e) => setSize(e.target.value)}
            style={styles.select}
          >
            {priceOptions.map((data) => (
              <option key={data} value={data}>
                {data}
              </option>
            ))}
          </select>
          <div className="d-inline" style={styles.price}>
            ₹{finalPrice}/-
          </div>
        </div>
        <hr />
        {isUserLoggedIn && (
          <button
            className="btn btn-success d-block mx-auto mt-3"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        )}

        {isModalOpen && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalStyles}>
              <div className="modal-content h-80 w-100">
                <h3 className="modal-title">{foodItem.name}</h3>
                <p className="modal-description">{foodItem.description}</p>
                {/* Add any other relevant information or styling here */}
                <button className="modal-close" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  card: {
    width: "20rem",
    border: "1px solid #ccc",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f2f2f2",
    transition: "transform 0.3s",
    borderRadius: "8px",
    overflow: "hidden",
    cursor: "pointer",
  },
  image: {
    height: "200px",
    objectFit: "cover",
    cursor: "pointer",
  },
  cardBody: {
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#333",
  },
  select: {
    backgroundColor: "#82ca9d",
    borderRadius: "8px",
    padding: "5px 10px",
    color: "#fff",
  },
  price: {
    marginLeft: "10px",
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#333",
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, .7)",
    zIndex: 1000,
  },

  modalStyles: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1000,
  },
};

export default Card;
