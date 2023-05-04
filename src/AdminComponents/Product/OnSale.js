import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class OnSale extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: false,
    };
  }
  host = process.env.REACT_APP_API_URL;
  async componentDidMount() {
    let url = `${this.host}/api/product/onsale`;
    this.setState({ loading: true });
    let data = await fetch(url);
    data = await data.json();
    this.setState({ loading: false, products: data });
  }



  render() {
    return (
      <>
        <div className="main">
        <div className="container-fluid">
          <div className="my-3 d-flex justify-content-center">
            <Link to="/admin/addProduct">
              <span className="btn btn-sm btn-primary">Add Product</span>
            </Link>
          </div>
        <table className="table table-hover table-bordered">
          <thead>
            <tr className="table-dark">
              <th colSpan="1" >Sr.</th>
              <th colSpan="1" className="text-center">SKU Number</th>
              <th colSpan="1" className="text-center">Title</th>
              <th colSpan="1" className="text-center">Stock</th>
              <th colSpan="1" className="text-center">Category</th>
              <th colSpan="1" className="text-center">Wholesale Price</th>
              <th colSpan="1" className="text-center">Discounted Price</th>
              <th colSpan="1" className="text-center">Purchase Price</th>
              <th colSpan="1" className="text-center">Product Weight</th>
              <th colSpan="1" className="text-center">Feature Product</th>
              <th colSpan="1" className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>


            {this.state.products.map((product) => {
              return (
                <tr key={product._id}>
                  <td>{this.state.products.indexOf(product) + 1}</td>
                  <td className="text-center">{product.skuNumber}</td>
                  <td className="text-center">{product.title}</td>
                  <td className="text-center">{product.stock}</td>
                  <td className="text-center">{product.category.name}</td>
                  <td className="text-center">{product.wholesalePrice}</td>
                  <td className="text-center">{product.discountedPrice}</td>
                  <td className="text-center">{product.purchasePrice}</td>
                  <td className="text-center">{product.weight} kg</td>
                  <td className="text-center">{product.featureProduct === true ? "No" : "Yes"}</td>
                  <td className="text-center">Edit | Delete</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
        </div>
      </>
    );
  }
}
