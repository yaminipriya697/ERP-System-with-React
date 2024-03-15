import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../components/addedit.css";


const initialValues = {
  customer_name: "",
  order_date: "",
  status: "",
};

const AddEdit = () => {
  const navigate = useNavigate();
  const [addData, setAddData] = useState(initialValues);
  const { customer_name, order_date, status } = addData; 
  const { id } = useParams();

  const addOrder = (data) => {
    axios
      .post("http://localhost:4000/order", data) 
      .then((response) => {
        toast.success("Order added successfully", {
          position: "top-center",
          autoClose: 3000,
        });
        navigate("/home");
      })
      .catch((error) => {
        console.error("Error on ordering product:", error);
        toast.error("Error on ordering product", {
          position: "top-center",
          autoClose: 3000,
        });
      });
  };

  const updateOrder = (data, orderId) => {
    axios
      .put(`http://localhost:4000/orders/${orderId}`, data)
      .then((response) => {
        toast.success("Order updated successfully", {
          position: "top-center",
          autoClose: 3000,
        });
        navigate("/home");
      })
      .catch((error) => {
        console.error("Error updating order:", error);
        toast.error("Error updating order", {
          position: "top-center",
          autoClose: 3000,
        });
      });
  };

  const getSingleOrder = async (orderId) => {
    try {
      const response = await axios.get(`http://localhost:4000/orders/${orderId}`);
      if (response.status === 200) {
        setAddData({ ...response.data });
      }
    } catch (error) {
      console.error("Error fetching order with that id:", error);
      toast.error("Error fetching order with that id", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handleChange = (e) => {
    setAddData({ ...addData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!customer_name || !order_date || !status) {
      toast.error("Please enter all fields", {
        position: "top-center",
        autoClose: 3000,
      });
    } else {
      if (id) {
        getSingleOrder(id).then(() => updateOrder(addData, id));
      } else {
        addOrder(addData);
      }
    }
  };

  useEffect(() => {
    if (id) {
      getSingleOrder(id);
    }
  }, [id]);

  return (
    <div className="container1">
      <form onSubmit={handleSubmit} className="col-md-6">
        <div className="form-group">
          <label htmlFor="customer_name">Customer Name</label>
          <input
            type="text"
            className="form-control"
            id="customername"
            name="customer_name"
            value={customer_name}
            onChange={handleChange}
            placeholder="Enter Customer Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="order_date">Order Date</label>
          <input
            type="text"
            className="form-control"
            id="order_date"
            name="order_date"
            value={order_date}
            onChange={handleChange}
            placeholder="Enter Order Date"
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <input
            type="text"
            className="form-control"
            id="status"
            name="status" 
            value={status}
            onChange={handleChange}
            placeholder="Enter Status"
          />
        </div>
        <br />
        <input type="submit" value={id ? "Update order" : "Add order"} />
        <Link to ="/homeorder"><button>Go to Orders Page</button></Link>
      </form>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default AddEdit;
