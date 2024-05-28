import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const updateQuantity = (id, quantity) => {
    const updatedCart = cart.map(item => 
      item.id === id ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = id => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
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
                <input
                  type="number"
                  value={item.quantity}
                  onChange={e => updateQuantity(item.id, parseInt(e.target.value))}
                  className="border p-1 w-16"
                />
                <button onClick={() => removeItem(item.id)} className="bg-red-500 text-white p-2 ml-2">
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
