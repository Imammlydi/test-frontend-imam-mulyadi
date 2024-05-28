import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import productsData from '../assets/products.json';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const foundProduct = productsData.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    setNotification('Product added to cart');
    setTimeout(() => setNotification(''), 3000);
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
          <button onClick={addToCart} className="bg-blue-500 text-white p-2 w-full mb-4 rounded">Add to Cart</button>
          <Link to="/" className="block text-blue-500 text-center">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
