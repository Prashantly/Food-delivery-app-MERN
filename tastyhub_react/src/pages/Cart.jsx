import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import { toast } from "react-hot-toast";
import API_BASE_URL from "../constant";
export default function Cart() {
  let cartData = useCart();
  // console.log(data);
  let dispatch = useDispatchCart();
  if (cartData.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3">The Cart is Empty!</div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let token = localStorage.getItem("authToken");
    // console.log(data,localStorage.getItem("userEmail"),new Date())
    let response = await fetch(`${API_BASE_URL}/api/createOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: userEmail,
        order_data: cartData,
        order_date: new Date().toDateString(),
      }),
    });
    console.log("JSON RESPONSE:::::", response.status);
    if (response.status === 201) {
      dispatch({ type: "DROP" });
    }
  };

  const handleQuantityChange = (index, value) => {
    // console.log(cartData);
    const food = cartData[index];
    console.log(food);

    if (food.qty + value <= 0) {
      toast.error("Quantity cannot be less than 1");
      return;
    }
    console.log(value);
    dispatch({
      type: "UPDATE_CART_QTY",
      payload: {
        id: food.id,
        size: food.size,
        value,
      },
    });
  };

  let totalPrice = cartData.reduce((total, food) => total + food.price, 0);
  return (
    <div>
      <div className="container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md">
        <table className="table table-hover ">
          <thead className=" text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col" className="text-center">
                Name
              </th>
              <th scope="col" className="text-center">
                Quantity
              </th>
              <th scope="col" className="text-center">
                Option
              </th>
              <th scope="col" className="text-center">
                Amount
              </th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {cartData.map((food, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td className="text-center">
                  <img
                    src={food.img}
                    alt={food.name}
                    style={{
                      width: "30px",
                      height: "30px",
                      marginRight: "5px",
                    }}
                  />
                  {food.name}
                </td>
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-secondary me-2"
                    onClick={() => handleQuantityChange(index, -1)}
                  >
                    -
                  </button>
                  {food.qty}
                  <button
                    className="btn btn-sm btn-secondary ms-2"
                    onClick={() => handleQuantityChange(index, +1)}
                  >
                    +
                  </button>
                </td>
                <td className="text-center">{food.size}</td>
                <td className="text-center">₹{parseInt(food.price)}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <i
                      className="fa fa-trash"
                      aria-hidden="true"
                      onClick={() => {
                        dispatch({ type: "REMOVE_FROM_CART", index: index });
                      }}
                    ></i>
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Total Price: ₹{parseInt(totalPrice)}/-</h1>
        </div>
        <div>
          <button className="btn bg-success mt-5 " onClick={handleCheckOut}>
            {" "}
            Check Out{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
