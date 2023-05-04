import React, { Component } from "react";
import { Link } from "react-router-dom";
// import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import moment from "moment";
import "./Report.css"
const image = window.location.origin + "/Assets/no-data.svg";

class OrderReport extends Component {
  constructor() {
    super();
    this.state = {
      orders: [],
      loading: false,
      checked: false,
      odate: "",
      details: [],
    };
  }
  host = process.env.REACT_APP_API_URL;
  async componentDidMount() {
    let url = `${this.host}/api/order/allorders`;
    this.setState({ loading: true });
    let data = await fetch(url);
    data = await data.json();
    this.setState({ loading: false, orders: data });
  }



  onChange = async (e) => {
    this.setState({ [e.target.name]: (e.target.value ) });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    let date = new Date(this.state.odate);
    let edate = moment(date).format("YYYY-MM-DD");
    let url = `${this.host}/api/order/search/${edate}`;
    this.setState({ loading: true });
    let data = await fetch(url 
      , {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          },
          });
    data = await data.json();
    this.setState({ loading: false, orders: data });

  }

  handleShipping = (id) => {
    this.modalRef.current.click();
    let order = this.state.orders.find((order) => order._id === id);
    this.setState({ details: order.shippingDetails });
  };

  render() {
    return (
      <>
        <div className="main">
        <div className="container-fluid">
          <div className="d-flex justify-content-between">
          <form method="post" onSubmit={this.onSubmit}>
                <div className="d-flex justify-content-center">
                    <input type="text" className="form-control mb-2" placeholder="Search By Date" id="odate" name="odate" onChange={this.onChange} required />
                  <button type="submit"  className="btn btn-primary btn-sm d-none">
                    Search
                  </button>
                </div>
              </form>
              {/* {this.state.orders.length !== 0 && (
        <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="btn btn-primary btn-sm mb-2"
                    table="table-to-xls"
                    filename="Order Report"
                    sheet="Order Report"
                    buttonText="Export to Excel"/>)} */}
          </div>
          <table className="table table-hover table-bordered">
              <thead>
                <tr className="table-dark">
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
                {this.state.orders.map((order) => {
                  return (
                    <tr className="text-center align-middle" key={order._id}>
                      <td>{this.state.orders.indexOf(order) + 1}</td>
                      <td className="text-center align-middle">
                        {order.shippingDetails.name}
                      </td>
                      <td className="text-center align-middle">
                        {moment(order.date).format("DD-MMM-YYYY")}
                      </td>
                      <td className="text-center align-middle hover-pointer">
                        <span
                          className="btn btn-primary btn-sm"
                          onClick={() => this.handleShipping(order._id)}
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
                        <label className="switch">
                          <input
                            onChange={() => this.handlePayment(order._id)}
                            type="checkbox"
                            checked={order.payment}
                          />
                          <span></span>
                        </label>
                      </td>
                      <td className="text-center align-middle">
                        <button
                          className="btn btn-primary btn-sm text-white"
                          // onClick={() => this.handleShipStatus(order._id)}
                          disabled={
                            order.shippingStatus === true ? true : false
                          }
                        >
                          <Link
                            to={`/admin/updateshippingstatus/${order._id}`}
                            className="text-white"
                          >
                            {order.shippingStatus === true
                              ? "Shipped"
                              : "Pending"}
                          </Link>
                        </button>
                      </td>
                      <td className="text-center align-middle">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => this.handleOrderStatues(order._id)}
                          disabled={
                            order.shippingStatus === false ? true : false
                          }
                        >
                          {order.orderStatus === true ? "Delivered" : "Pending"}
                        </button>
                      </td>
                      <td className="text-center align-middle">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => this.handleOrderStatues(order._id)}
                          disabled={
                            order.shippingStatus === false ? true : false
                          }
                        >
                          {order.orderStatus === true ? "Delivered" : "Pending"}
                        </button>
                      </td>
                      <td className="text-center align-middle">
                        <Link to={`/admin/editwholesaleorder/${order._id}`}>
                          <span className="edit-delete">Edit </span>
                        </Link>
                        |
                        <span
                          className="edit-delete"
                          onClick={() => this.handleDelete(order._id)}
                        >
                          Delete
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
        
        {this.state.orders.length === 0 && <div className='no_data'> 
            <img className='no_data-img' src={image} alt='No Data' ></img>
            </div>} 
        </div>
        </div>

        <button
          ref={this.modalRef}
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
                      <td>{this.state.details.name}</td>
                    </tr>
                    <tr>
                      <th scope="row">E-mail</th>
                      <td>{this.state.details.email}</td>
                    </tr>
                    <tr>
                      <th scope="row">City</th>
                      <td>{this.state.details.city}</td>
                    </tr>
                    <tr>
                      <th scope="row">Address</th>
                      <td>{this.state.details.address} </td>
                    </tr>
                    <tr>
                      <th scope="row">Phone</th>
                      <td>{this.state.details.phone}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}


export default (OrderReport);