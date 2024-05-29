import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector(state => state.product.find(p => p.id === parseInt(id)));

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    setNotification('Product added to cart');
    setTimeout(() => setNotification(''), 3000);
  };

  const handleCheckout = () => {
    dispatch(addToCart({ ...product, quantity }));
    navigate('/checkout');
  };

  if (!product) return <p className="text-center mt-4">Product not found</p>;

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gray-100">
      <div className="w-full max-w-screen-md p-4 bg-white shadow-lg rounded-lg mt-4 md:mt-10">
        {notification && (
          <div className="bg-green-500 text-white text-center p-2 mb-4 rounded">
            {notification}
          </div>
        )}
        <img src={product.image} alt={product.name} className="w-full h-auto mb-2 object-cover rounded-t-lg" style={{ maxHeight: '200px' }} />
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="mb-4">{product.description}</p>
          <p className="text-xl font-semibold mb-4">Rp{product.price}</p>
          {/* <div className="flex items-center mb-4">
            <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} className="bg-gray-200 p-2 rounded-l">-</button>
            <input
              type="number"
              value={quantity}
              onChange={e => setQuantity(Math.max(1, parseInt(e.target.value)))}
              className="w-12 text-center border-t border-b p-2"
            />
            <button onClick={() => setQuantity(quantity + 1)} className="bg-gray-200 p-2 rounded-r">+</button>
          </div> */}
          <button onClick={handleAddToCart} className="bg-blue-500 text-white p-2 w-full mb-2 rounded">Add to Cart</button>
          <button onClick={handleCheckout} className="bg-green-500 text-white p-2 w-full mb-4 rounded">Checkout</button>
          <Link to="/" className="block text-blue-500 text-center">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
