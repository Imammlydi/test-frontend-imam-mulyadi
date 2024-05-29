import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Confirmation = () => {
  const purchaseInfo = JSON.parse(localStorage.getItem('purchaseInfo')) || {};
  const { name, address, paymentMethod, cart } = purchaseInfo;

  const hasCartItems = cart && cart.length > 0;

  const groupedCartItems = cart.reduce((groupedItems, item) => {
    if (!groupedItems[item.id]) {
      groupedItems[item.id] = { ...item, quantity: item.quantity };
    } else {
      groupedItems[item.id].quantity += item.quantity;
    }
    return groupedItems;
  }, {});

  let totalPrice = 0;
  let totalQuantity = 0;

  Object.values(groupedCartItems).forEach(item => {
    totalPrice += item.price * item.quantity;
    totalQuantity += item.quantity;
  });

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Order Confirmation</h1>
        <p className="text-center text-lg mb-4">Thank you for your purchase! Here are the details of your order:</p>
        
        <div className="bg-gray-100 p-4 rounded mb-6">
          <h2 className="text-lg font-semibold mb-2">Purchase Information:</h2>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Address:</strong> {address}</p>
          <p><strong>Payment Method:</strong> {paymentMethod}</p>
        </div>
        
        <div className="bg-gray-100 p-4 rounded mb-6">
          <h2 className="text-lg font-semibold mb-2">Products Purchased:</h2>
          {!hasCartItems && <p>No items purchased.</p>}
          {Object.values(groupedCartItems).map((item, index) => (
            <div key={index} className="mb-4 border-b pb-4">
              <p className="font-semibold text-md">{item.name}</p>
              <p>Price: Rp {item.price.toFixed(2)}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-gray-100 p-4 rounded mb-6">
          <h2 className="text-lg font-semibold mb-2">Order Summary:</h2>
          <p><strong>Total Quantity:</strong> {totalQuantity}</p>
          <p><strong>Total Price:</strong> Rp {totalPrice.toFixed(2)}</p>
        </div>
        
        <div className="text-center">
          <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded mr-2">Back to Home</Link>
          <Link to="/cart" className="bg-blue-500 text-white py-2 px-4 rounded">View Cart</Link>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
