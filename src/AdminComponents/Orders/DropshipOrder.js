import { React, useEffect, useState, useRef } from 'react'
import axios from "axios";
// import moment from "moment";
import "./Order.css";
import { Link } from "react-router-dom";
import Loader from "../../Loader/Loader";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
// import { DateRangePicker } from 'react-date-range';
const image = window.location.origin + "/Assets/no-data.svg";

const DropshipOrder = () => {

    const host = process.env.REACT_APP_API_URL;

    const modalRef = useRef(null);
    // const closeRef = useRef(null);
    const [orders, setOrders] = useState([])
    // eslint-disable-next-line
    const [allOrders, setAllOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [checked, setChecked] = useState(false)
    const [details, setDetails] = useState([])
    // const [startDate, setStartDate] = useState(new Date());
    // const [endDate, setEndDate] = useState(new Date());

    const getOrders = async () => {
        setLoading(true)
        const { data } = await axios.get(`${host}/api/order/dropshiporder`);
        setOrders(data)
        setAllOrders(data)
        setLoading(false)
    }

    useEffect(() => {
        getOrders()

        // eslint-disable-next-line
    }, [])


    // eslint-disable-next-line
    const onChecked = (e) => {
        setChecked(!checked)
    };

    const handleShipping = (id) => {
        modalRef.current.click();
        let order = orders.find((order) => order._id === id);
        setDetails(order.shippingDetails)
    };

    const handleOrderStatues = async (id, orderStatus) => {
        let url = `${host}/api/order/changeorderstatus/${id}`;
        await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ orderStatus }),
        });
        let updatedUser = `${host}/api/order/dropshiporder`;
        let uUser = await fetch(updatedUser);
        let usr = await uUser.json();
        setOrders(usr);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            axios.delete(`${host}/api/order/deleteorderadmin/${id}`)
                .then(res => {
                    getOrders()
                })
        }
    };

    const handleReverse = async (id) => {
        axios.put(`${host}/api/order/reverseorder/${id}`)
            .then(res => {
                getOrders()
            })
            .catch(err => {
                window.alert("Something went wrong")
            })
    }

    const handlePayment = async (id) => {
        if (window.confirm("Are you sure you want to verify payment?")) {
            await axios.put(`${host}/api/order/verifyorderpayment/${id}`)
                .then(res => {
                    getOrders()
                })
                .catch(err => {
                    window.alert("Something went wrong")
                })
        }
    }

    return (
        <>
            {loading ? <Loader /> :
                <>
                    <div className="main">
                        <div className="container-fluid">
                            <h3 className='text-center my-4'>
                                Dropship Orders
                            </h3>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th colSpan="1" className="text-center align-middle">
                                            Sr.
                                        </th>
                                        <th colSpan="1" className="text-center align-middle">
                                            Customer Name
                                        </th>
                                        <th colSpan="1" className="text-center align-middle">
                                            Order Date
                                        </th>
                                        <th colSpan="1" className="text-center align-middle">
                                            Shipping Details
                                        </th>
                                        <th colSpan="1" className="text-center align-middle">
                                            Order Amount
                                        </th>
                                        <th colSpan="1" className="text-center align-middle">
                                            Type
                                        </th>
                                        <th colSpan="1" className="text-center align-middle">
                                            Product Details
                                        </th>
                                        <th colSpan="1" className="text-center align-middle">
                                            Payment Status
                                        </th>
                                        <th colSpan="1" className="text-center align-middle">
                                            Shipping Status
                                        </th>
                                        <th colSpan="1" className="text-center align-middle">
                                            Order Status
                                        </th>
                                        <th colSpan="1" className="text-center align-middle">
                                            Un Delivered
                                        </th>
                                        <th colSpan="1" className="text-center align-middle">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => {
                                        let date = new Date(order.date);
                                        return (
                                            <tr className="text-center align-middle" key={order._id}>
                                                <td>{orders.indexOf(order) + 1}</td>
                                                <td className="text-center align-middle">
                                                    {order.shippingDetails.name}
                                                </td>
                                                <td className="text-center align-middle">
                                                    {date.toLocaleDateString()}
                                                </td>
                                                <td className="text-center align-middle hover-pointer">
                                                    <span
                                                        className="btn btn-primary btn-sm"
                                                        onClick={() => handleShipping(order._id)}
                                                        title="Shipping Details"
                                                    >
                                                        Details
                                                    </span>
                                                </td>
                                                <td className="text-center align-middle">
                                                    {order.orderAmount}
                                                </td>
                                                <td className="text-center align-middle">
                                                    {order.orderType}
                                                </td>
                                                <td className="text-center align-middle hover-pointer ">
                                                    <Link to={`/admin/orderproduct/details/${order._id}`}>
                                                        <span className="btn btn-primary btn-sm">
                                                            Details
                                                        </span>
                                                    </Link>
                                                </td>
                                                <td className="text-center align-middle align-middle">
                                                    {
                                                        order.paymentStatus !== true ? (
                                                            <>
                                                                <button className='btn btn-danger btn-sm' onClick={() => { handlePayment(order._id) }}>
                                                                    Click to Verify
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <span className='text-primary'>
                                                                Verified
                                                            </span>
                                                        )
                                                    }
                                                </td>
                                                <td className="text-center align-middle">
                                                    {
                                                        order.shippingStatus === true ? (
                                                            <span className="text-success">Shipped</span>
                                                        ) : (
                                                            <Link to={`/admin/updateshippingstatus/${order._id}`} className="text-white" >
                                                                <button
                                                                    className="btn btn-primary btn-sm text-white">
                                                                    Click to ship
                                                                </button>
                                                            </Link>
                                                        )
                                                    }

                                                </td>
                                                <td className="text-center align-middle">

                                                    {
                                                        order.shippingStatus === true ? (
                                                            order.orderStatus === "Pending" ? (
                                                                <>
                                                                    <button
                                                                        className="btn btn-primary btn-sm mb-2"
                                                                        onClick={() =>
                                                                            handleOrderStatues(order._id, "Returned")
                                                                        }
                                                                        disabled={
                                                                            order.shippingStatus === false ? true : false
                                                                        }
                                                                    >
                                                                        {order.orderStatus === "Returned"
                                                                            ? "Returned"
                                                                            : "Order Return"}
                                                                    </button>
                                                                    <button
                                                                        className="btn btn-primary btn-sm"
                                                                        onClick={() =>
                                                                            handleOrderStatues(order._id, "Delivered")
                                                                        }
                                                                        disabled={
                                                                            order.shippingStatus === false ? true : false
                                                                        }
                                                                    >
                                                                        {order.orderStatus === "Delivered"
                                                                            ? "Delivered"
                                                                            : "Order Deliver"}
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                <span className="">
                                                                    {order.orderStatus}
                                                                </span>)
                                                        ) : (
                                                            <span className="text-danger">Not Shipped</span>
                                                        )
                                                    }



                                                </td>
                                                <td className="text-center align-middle">
                                                    {
                                                        order.orderStatus !== "Pending" ? (
                                                            <button className='btn btn-warning btn-sm' onClick={() => { handleReverse(order._id) }}>
                                                                Reverse Order
                                                            </button>
                                                        ) : (
                                                            <span>
                                                                Order Pending
                                                            </span>
                                                        )
                                                    }

                                                </td>
                                                <td className="text-center align-middle">
                                                    <Link to={`/admin/editwholesaleorder/${order._id}`}>
                                                        <span className="edit-delete">Edit</span>
                                                    </Link>
                                                    &nbsp;|&nbsp;
                                                    <span
                                                        className="edit-delete"
                                                        onClick={() => handleDelete(order._id)}
                                                    >
                                                        Delete
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            {orders.length === 0 && (
                                <div className="no_data">
                                    <img className="no_data-img" src={image} alt="No Data"></img>
                                </div>
                            )}
                        </div>
                    </div>
                    <button
                        ref={modalRef}
                        type="button"
                        className="btn btn-primary d-none"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                    >
                        Launch demo modal
                    </button>

                    <div
                        className="modal fade"
                        id="exampleModal"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">
                                        Shipping Details
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <table className="table table-bordered">
                                        <tbody>
                                            <tr>
                                                <th scope="row">Name</th>
                                                <td>{details.name}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">E-mail</th>
                                                <td>{details.email}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">City</th>
                                                <td>{details.city}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Address</th>
                                                <td>{details.address} </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Phone</th>
                                                <td>{details.phone}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default DropshipOrder