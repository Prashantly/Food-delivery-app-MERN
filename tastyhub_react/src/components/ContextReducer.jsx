import React, { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return [
        ...state,
        {
          id: action.payload._id,
          name: action.payload.name,
          img: action.payload.img,
          CategoryName: action.payload.CategoryName,
          qty: action.payload.qty,
          size: action.payload.size,
          price: action.payload.price,
          description: action.payload.description,
        },
      ];
    case "REMOVE_FROM_CART":
      let newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;

    case "UPDATE_QUANTITY":
      let updatedArr = [...state];
      let idx = updatedArr.findIndex(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );
      if (idx !== -1) {
        updatedArr[idx] = {
          ...updatedArr[idx],
          size: action.payload.size,
          price:
            parseInt(action.payload.price) + parseInt(updatedArr[idx].price),
          qty: parseInt(action.payload.qty) + parseInt(updatedArr[idx].qty),
        };
      }
      return updatedArr;

    case "UPDATE_CART_QTY":
      let newList = [...state];
      let indx = newList.findIndex(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );

      if (indx !== -1) {
        const oldQty = parseInt(newList[indx].qty);
        console.log(oldQty);
        const newQty = oldQty + action.payload.value;
        console.log(newQty);
        console.log(newList[indx].price);
        console.log(newQty / oldQty);
        newList[indx] = {
          ...newList[indx],
          size: action.payload.size,
          qty: newQty,
          price: newList[indx].price * (newQty / oldQty),
        };
      }

      return newList;

    case "DROP":
      let empArray = [];
      return empArray;

    // Handle other action types if needed
    default:
      return state;
  }
};
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
