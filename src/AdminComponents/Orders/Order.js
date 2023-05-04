import React, { Component } from "react";
import Moment from 'moment';
import "./Order.css";
const image = window.location.origin + "/Assets/no-data.svg";
class Order extends Component {
  constructor() {
    super();
    this.state = {
      orders: [],
      loading: false,
      checked: false,
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

  onChecked = (e) => {
    this.setState({
      checked: !this.state.checked,
    });
  };

  handlePayment = async (_id) => {
    let url = `${this.host}/api/order/changepaymentstatus/${_id}`;
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let updatedUser = `${this.host}/api/order/allorders`
    let uUser = await fetch(updatedUser);
    let usr = await uUser.json();
    this.setState({ orders: usr });
  };


  handleDelete = async (id) => {
        // let url = `${this.host}/api/product/deleteproduct/${id}`;
        // let data = await fetch(url, {
        //   method: "DELETE",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // });
        // let updatedOrder = `${this.host}/api/order/allorders`
        // let uOrder = await fetch(updatedOrder);
        // let pro = await uOrder.json();
        // this.setState({ products: pro });
  }



  render() {
    return (
      <>
        <div className="main">
        <div className="container-fluid">
        <table className="table table-hover table-bordered">
          <thead>
            <tr className="table-dark">
              <th colSpan="1" >Sr.</th>
              <th colSpan="1" className="text-center">Customer Name</th>
              <th colSpan="1" className="text-center">Order Date</th>
              <th colSpan="1" className="text-center">Type</th>
              <th colSpan="1" className="text-center">Shipping Details</th>
              <th colSpan="1" className="text-center">Amount</th>
              <th colSpan="1" className="text-center">Product Details</th>
              <th colSpan="1" className="text-center">Payment Status</th>
              <th colSpan="1" className="text-center">Shipping Status</th>
              <th colSpan="1" className="text-center">Order Status</th>
              {/* <th colSpan="1" className="text-center">Actions</th> */}
            </tr>
          </thead>
          <tbody>


            {this.state.orders.map((order) => {
              return (
                <tr key={order._id}>
                  <td>{this.state.orders.indexOf(order) + 1}</td>
                  <td className="text-center">{order.user}</td>
                  <td className="text-center">{Moment(order.date).format('DD-MMM-YYYY')}</td>
                  <td className="text-center">{order.orderType}</td>
                  <td className="text-center" ><input
                        type="checkbox"
                        className="custom-control-input mx-2 cursor-pointer"
                        id="pSale"
                        checked={this.state.checked}
                        onChange={this.onChecked}
                      /></td>

                    {this.state.checked ? (
                    <div className="col-sm-2">
                      <div className="tooltips">
                        
                        </div>
                    </div>
                  ) : null}
                  <td className="text-center">{order.orderAmount}</td>
                  <td className="text-center">{order.orderDetails}</td>
                  <td className="text-center align-middle" ><label className="switch"> 
                    <input onChange={() => this.handlePayment(order._id) } type="checkbox" checked={order.payment}/>
                    <span></span>
                  </label></td>
                  <td className="text-center"><button className="btn btn-primary btn-sm"
                  disabled={order.payment === false ? true : false}
                    >{order.shippingStatus === true ? "Shipped" : "Unshipped" }</button></td>
                  <td className="text-center"><button className="btn btn-primary btn-sm" disabled={order.payment === false ? true : false}>{order.orderStatus === true ? "Delivered" : "Undelivered"}</button></td>
                  {/* <td className="text-center">Edit | <span onClick={() => this.handleDelete(order._id)}>Delete</span></td> */}
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
      </>
    );
  }
}


export default (Order);