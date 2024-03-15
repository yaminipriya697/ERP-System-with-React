import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./addedit.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const initialValues = {
  name: "",
  category: "",
  price: "",
  stock: "",
};

const AddEdit = () => {
  const navigate = useNavigate();
  const [addData, setAddData] = useState(initialValues);
  const { name, category, price, stock } = addData;
  const { id } = useParams();

  const addProduct = (data) => {
    axios
      .post("http://localhost:4000/product", data)
      .then((response) => {
        toast.success("Product added successfully", {
          position: "top-center",
          autoClose: 3000,
        });
        navigate("/home");
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        toast.error("Error adding product", {
          position: "top-center",
          autoClose: 3000,
        });
      });
  };

  const updateProduct = (data, productId) => {
    axios
      .put(`http://localhost:4000/products/${productId}`, data)
      .then((response) => {
        toast.success("Product updated successfully", {
          position: "top-center",
          autoClose: 3000,
        });
        navigate("/home");
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        toast.error("Error updating product", {
          position: "top-center",
          autoClose: 3000,
        });
      });
  };

  const getSingleProduct = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:4000/products/${productId}`);
      if (response.status === 200) {
        setAddData({ ...response.data });
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Error fetching product", {
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

    const { name, category, price, stock } = addData;

    if (!name || !category || !price || !stock) {
      toast.error("Please enter all fields", {
        position: "top-center",
        autoClose: 3000,
      });
    } else {
      if (id) {
        updateProduct(addData, id);
      } else {
        addProduct(addData);
      }
    }
  };

  useEffect(() => {
    if (id) {
      getSingleProduct(id);
    }
  }, [id]);

  return (
    <div className="container1">
      <form onSubmit={handleSubmit} className="col-md-6">
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Enter product Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            className="form-control"
            id="category"
            name="category"
            value={category}
            onChange={handleChange}
            placeholder="Enter category"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={price}
            onChange={handleChange}
            placeholder="Enter price"
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            className="form-control"
            id="stock"
            name="stock"
            value={stock}
            onChange={handleChange}
            placeholder="Enter stock"
          />
        </div>
        <br />
        <input type="submit" value={id ? "Update product" : "Add product"} className="btn"/>
        <Link to ="/home"><button>Go to Prodcuts Page</button></Link>
      </form>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default AddEdit;
