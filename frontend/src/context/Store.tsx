import React, { useReducer } from "react";

interface State {
  userInfo: any;
  cart: {
    paymentMethod: string;
    cartItems: any[];
  };
  search: string;
}

type Action =
  | { type: "SEARCH"; payload: any }
  | { type: "CART_ADD_ITEM"; payload: any }
  | { type: "CART_REMOVE_ITEM"; payload: { _id: string } }
  | { type: "CART_CLEAR" }
  | { type: "USER_SIGNIN"; payload: any }
  | { type: "USER_SIGNOUT" }
  | { type: "SAVE_PAYMENT_METHOD"; payload: string };

const initialState: State = {
  userInfo: localStorage.getItem("user_info")
    ? //JSON.parse(localStorage.getItem("user_info") || '{}')
      JSON.parse(localStorage.getItem("user_info")!)
    : null,
  cart: {
    paymentMethod: localStorage.getItem("payment_method") || "",
    cartItems: localStorage.getItem("cart_items")
      ? JSON.parse(localStorage.getItem("cart_items")!)
      : [],
  },
  search: "",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SEARCH": {
      const word = action.payload;
      return { ...state, search: word };
    }
    case "CART_ADD_ITEM": {
      // Thêm vào giỏ hàng
      const newItem = action.payload;
      const cartItems = state.cart.cartItems;
      const existingItem = cartItems.find((item) => item._id === newItem._id);

      if (existingItem) {
        // Cập nhật sản phẩm đã có trong giỏ hàng
        const updatedItem = { ...existingItem, ...newItem };
        const updatedCart = cartItems.map((item) =>
          item.id === existingItem.id ? updatedItem : item
        );
        localStorage.setItem("cart_items", JSON.stringify(updatedCart));
        return {
          ...state,
          cart: { ...state.cart, cartItems: updatedCart },
        };
      } else {
        // Thêm sản phẩm mới vào giỏ hàng
        const updatedCart = [...cartItems, newItem];
        localStorage.setItem("cart_items", JSON.stringify(updatedCart));
        return {
          ...state,
          cart: { ...state.cart, cartItems: updatedCart },
        };
      }
    }
    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload
      );
      localStorage.setItem("cart_items", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "CART_CLEAR":
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    case "USER_SIGNIN":
      return { ...state, userInfo: action.payload };
    case "USER_SIGNOUT":
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          paymentMethod: "",
        },
      };

    case "SAVE_PAYMENT_METHOD":
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    default:
      return state;
  }
}

export const Store = React.createContext<
  { state: State; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

const StoreProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};

export default StoreProvider;
