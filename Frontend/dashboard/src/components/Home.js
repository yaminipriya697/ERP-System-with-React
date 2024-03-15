import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./home.css";

const Home = () => {
  const [data, setData] = useState([]);

  const getProducts = () => {
    axios.get("http://localhost:4000/products")
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  };

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure to delete the record")) {
      axios.delete(`http://localhost:4000/products/${id}`)
        .then(response => {
          toast.success("Record deleted successfully", {
            position: "top-center", 
            autoClose: 3000,
            style: { color: "white" }
          });

          setData(prevData => prevData.filter(user => user.id !== id));
        })
        .catch(error => {
          toast.error(error, {
            position: "top-center", 
            autoClose: 3000,
            style: { color: "white" }
          });
        });
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="homecontainer">
      <div className="addbutton">
        <button className="btn success"><Link to="/addedit">Add New Product</Link></button>
      </div>
      <table className="table">
        <thead>
          <tr className="headings">
            <th>Product id</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.price}</td>
              <td>{item.stock}</td>
              <td>
                <Link to={`/addedit/${item.id}`} className="btn primary mr-2">Edit</Link> &nbsp;
                <button className="btn danger mr-2" onClick={() => deleteProduct(item.id)}>Delete</button> &nbsp;
                <Link to={`/view/${item.id}`} className="btn info mr-2">View</Link>
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
