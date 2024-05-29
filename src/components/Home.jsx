import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
  const products = useSelector(state => state.product);

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gray-100">
      <div className="w-full max-w-screen-xl p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Products</h1>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {products.map(product => (
            <Link key={product.id} to={`/product/${product.id}`} className="border p-4 flex flex-col items-center bg-white shadow rounded">
              <img src={product.image} alt={product.name} className="w-full h-auto mb-4 object-cover" />
              <h2 className="text-xl text-center">{product.name}</h2>
              <p className="text-center">Rp {product.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
