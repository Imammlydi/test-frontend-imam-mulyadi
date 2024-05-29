import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, updateQuantity } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [warning, setWarning] = useState('');
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !address || !paymentMethod) {
      setWarning('Please fill out all fields.');
      return;
    }

    const updatedCart = cart.map(item => ({
      ...item,
      quantity: parseInt(document.getElementById(`quantity-${item.id}`).value)
    }));

    localStorage.setItem('purchaseInfo', JSON.stringify({ name, address, paymentMethod, cart: updatedCart }));
    
    dispatch(clearCart());

    alert('Order placed successfully');
    navigate('/confirmation');
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gray-100">
      <div className="w-full max-w-screen-md p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Checkout</h1>
        {warning && <div className="text-red-500 text-center mb-4">{warning}</div>}
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
            <input
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={e => setPaymentMethod(e.target.value)}
              className="border p-2 w-full"
            >
              <option value="">Select</option>
              <option value="credit_card">Credit Card</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Cart:</h2>
            <ul>
              {cart.map((product, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span>{product.name} - Rp{product.price}</span>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(product.id, Math.max(1, product.quantity - 1))}
                      className="bg-gray-200 p-2 rounded-l"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id={`quantity-${product.id}`}
                      value={product.quantity}
                      onChange={e => handleQuantityChange(product.id, Math.max(1, parseInt(e.target.value)))}
                      className="w-12 text-center border-t border-b p-2"
                    />
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                      className="bg-gray-200 p-2 rounded-r"
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <button type="submit" className="bg-green-500 text-white p-2 w-full">Place Order</button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
