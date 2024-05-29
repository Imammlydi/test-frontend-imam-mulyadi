import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateQuantity } from '../features/cart/cartSlice';

const Cart = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = id => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.id} className="border p-4 mb-4 flex justify-between items-center">
              <img src={item.image} alt={item.name} className="w-16 h-16" />
              <div>
                <h2 className="text-xl">{item.name}</h2>
                <p>Rp{item.price}</p>
                <div className="flex items-center">
                  <button 
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    className="bg-gray-300 p-2"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={e => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                    className="border p-1 w-16 mx-2"
                  />
                  <button 
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-300 p-2"
                  >
                    +
                  </button>
                </div>
                <button onClick={() => handleRemoveItem(item.id)} className="bg-red-500 text-white p-2 ml-2">
                  Remove
                </button>
              </div>
            </div>
          ))}
          <Link to="/checkout" className="bg-blue-500 text-white p-2">Proceed to Checkout</Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
