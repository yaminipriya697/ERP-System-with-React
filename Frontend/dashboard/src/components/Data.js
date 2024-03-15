import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './dashboard.css';

const Data = () => {
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  const getCount = async () => {
    try {
      const productResponse = await axios.get('http://localhost:4000/productcount');
      const orderResponse = await axios.get('http://localhost:4000/ordercount');

      setProductCount(productResponse.data.productlength);
      setOrderCount(orderResponse.data.orderlength);
    } catch (error) {
      console.error('Error fetching counts:', error);
    }
  };

  useEffect(() => {
    getCount();
  }, []);

  return (
    <div className="Maindata">
      <button>Total No of Products: {productCount}</button>
      <button>Total No of Orders: {orderCount}</button>
      <button><Link to="/homeorder">Manage Orders</Link></button>
      <button><Link to="/home">Manage Products</Link></button>
    </div>
  );
};

export default Data;
