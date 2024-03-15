import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../components/home.css";



const Home = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getOrders = () => {
    axios.get("http://localhost:4000/orders")
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  };

  const deleteOrder = (id) => {
    if (window.confirm("Are you sure to delete the record")) {
      axios.delete(`http://localhost:4000/orders/${id}`)
        .then(response => {
          toast.success("Record deleted successfully", { position: "top-center", autoClose: 3000  , color: "white"});

          setData(prevData => prevData.filter(order => order.id !== id));
          navigate("/homeorder")
          
        })
        .catch(error => {
          toast.error(error, { position: "top-center", autoClose: 3000 });
        });
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="homecontainer">
      <div className="addbutton">
        <button className="btn success"><Link to="/addeditorder">Add New Order</Link></button>
      </div>
    <table className="table table-stripped">
      <thead className="thead-light">
        <tr className="headings">
          <th>Order id</th>
          <th>Customer Name</th>
          <th>Order_date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item,index) => (
          <tr key={index}>
            <td>{index+1}</td>
            <td>{item.customer_name}</td>
            <td>{item.order_date}</td>
            <td>{item.status}</td>
            <td>
              <Link to={`/addeditorder/${item.id}`} className="btn primary mr-2"> Edit</Link> &nbsp;
              <button className="btn danger mr-2" onClick={() => deleteOrder(index+1)} > Delete </button> &nbsp;
              <Link to={`/vieworder/${item.order_id}`} className="btn info"> View </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <ToastContainer />
  </div>
);
};

export default Home;