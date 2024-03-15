import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import "../components/view.css";

const initialValues = {
    order_id: "",
    customer_name: "",
    order_date: "",
    status: "",
};

const View = () => {
    const [addData, setAddData] = useState(initialValues);
    const { id } = useParams();

    const getSingleOrder = async (id) => {

        console.log("getsingleuser called==");
        console.log("id==", id);
        try {
            const response = await axios.get(`http://localhost:4000/orders/${id}`);
            console.log("response ==", response);
            console.log("response from api ==", response);
            if (response.status === 200) {
                console.log(addData);
                setAddData({ ...response.data });
            }
        } catch (error) {
            console.error("Error fetching order data:", error);
        }
    };

    useEffect(() => {
        getSingleOrder(id);
    }, [id]);

    return (
        <div className="viewcontainer">
            <div className="heading">
                <h1>View Order Details</h1>
            </div>
            <div className="information">
                <ul>
                    <li><span>Order_id:</span>&nbsp;{addData.order_id}</li>
                    <li><span>Customer Name:</span>&nbsp;{addData.customer_name}</li>
                    <li><span>Order_date:</span>&nbsp;{addData.order_date}</li>
                    <li><span>Status:</span>&nbsp;{addData.status}</li>
                </ul>
            </div>
            <div className="buttons">
                <Link to="/homeorder"><button className="btn btn-info">Go to Home Page</button></Link>
            </div>
        </div>
    );
}

export default View;
