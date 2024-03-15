import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './dashboard.css';

const Dashboard = () => {
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  const getCount = async () => {
    try {
      const productResponse = await axios.get('http://localhost:4000/productcount');
      const orderResponse = await axios.get('http://localhost:4000/ordercount');

      console.log('productcount==', productResponse);
      console.log('ordercount==', orderResponse);

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
    <div className="mainContainer">
      <div className="dashboardContainer">
        <div className="Navbar">
          <div className="dashboard-heading">
          <Link to="/data"><h1>Dashboard Management</h1></Link>
          </div>
          <div className="components">
            <Link to="/home" className="btn primary"> Products List</Link>
            <Link to="/homeorder" className="btn info">Orders List</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
