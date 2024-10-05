import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

export const CartItems = () => {
  // Destructure the context to get all_product, cartItems, and removeFromCart
  const {getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);

  return (
    <div className='cartitems'>
      {/* Header Row */}
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Titles</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {/* Cart Items */}
      {all_product.map((e) => {
        // Check if the item is in the cart
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
                <div className="cartitems-format cartitems-format-main">
                    {/* Product Image */}
                    <img src={e.image} alt={e.name} className='carticon-product-icon' />

                    {/* Product Name */}
                    <p>{e.name}</p>

                    {/* Product Price */}
                    <p>${e.new_price.toFixed(2)}</p>

                    {/* Product Quantity */}
                    <button className='cartitems-quantity'>{cartItems[e.id]}</button>

                    {/* Total Price for the Item */}
                    <p>${(e.new_price * cartItems[e.id]).toFixed(2)}</p>

                    {/* Remove from Cart Icon */}
                    <img className='cartitems-remove-icon' src={remove_icon} onClick={() => removeFromCart(e.id)} alt="Remove from cart"/>
                </div>
                <hr />
            </div>
          );
        }
        return null; // Ensures a return even if the condition is false
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
            <h1>Cart Total</h1>
            <div>
                <div className="cartitems-total-item">
                    <p>Subtotal</p>
                    <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                    <p>Shipping Fee</p>
                    <p>Free</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                    <p>Total</p>
                    <h3>${getTotalCartAmount()}</h3>
                </div>
            </div>
            <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
            <p>If you have a promo code, Enter  it here</p>
            <div className="cartitems-promobox">
                <input type="text" placeholder='promo code'/>
                <button>Submit</button>
            </div>

        </div>
      </div>
    </div>
  );
};
