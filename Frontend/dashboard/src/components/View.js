import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import "./view.css";


const initialValues = {
    name: "",
    category: "",
    price: "",
    stock : ""
};

const View = () => {
    const [addData, setAddData] = useState(initialValues);
    const { id } = useParams();

    const getSingleProduct = async (id) => {
        console.log("getsingleuser called==");
        try {
            const response = await axios.get(`http://localhost:4000/products/${id}`);
            console.log("response ==", response);
            if (response.status === 200) {
                setAddData({ ...response.data });
                console.log(addData);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        getSingleProduct(id);
    }, [id]);

    return (
        <div className="viewcontainer">
            <div className="heading">
                <h1>View Product Details</h1>
            </div>
            <div className="orderdata">
                <ul>
                    <li><span>Product id  : </span>&nbsp;{addData.id} </li>
                    <li><span>Product Name   :</span>  &nbsp; {addData.name}</li>
                    <li><span>Category   :</span> &nbsp;  {addData.category}</li>
                    <li><span>Price   :</span> &nbsp;  {addData.price}</li>
                    <li><span>Stock   :</span> &nbsp;  {addData.stock}</li>

                </ul>
            </div>
            <div class="buttons">
                <Link to ="/home" ><button className="btn btn-info" >Go to Home Page</button></Link>
            </div>
        </div>
    );
}

export default View;