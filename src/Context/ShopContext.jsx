import React, { createContext, useState } from 'react';
import all_product from '../Components/Assets/all_product';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (productId) => {
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [productId]: (prevCartItems[productId] || 0) + 1,
    }));
  };

  const removeFromCart = (productId) => {
    setCartItems((prevCartItems) => {
      const newCartItems = { ...prevCartItems };
      if (newCartItems[productId] > 1) {
        newCartItems[productId] -= 1;
      } else {
        delete newCartItems[productId];
      }
      return newCartItems;
    });
  };

  const addAllToCart = () => {
    setCartItems((prevCartItems) => {
      const newCartItems = { ...prevCartItems };
      all_product.forEach((product) => {
        if (newCartItems[product.id]) {
          newCartItems[product.id] += 1;
        } else {
          newCartItems[product.id] = 1;
        }
      });
      return newCartItems;
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find((product) => product.id === Number(item));
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () =>{
    let totalItem = 0;
    for(const item in cartItems)
    {
        if(cartItems[item] > 0)
        {
            totalItem += cartItems[item];
        }
    }
    return totalItem;
  }

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    addAllToCart, // Provide addAllToCart in the context value
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
