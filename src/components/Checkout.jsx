import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cart, setCart] = useState([]);
  const [warning, setWarning] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !address || !paymentMethod) {
      setWarning('Please fill out all fields.');
      return;
    }

    console.log('Order submitted', { name, address, paymentMethod, cart });
    
    localStorage.setItem('purchaseInfo', JSON.stringify({ name, address, paymentMethod, cart }));
    localStorage.removeItem('cart');
    
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
                <li key={index}>
                  {product.name} - Rp{product.price}
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
