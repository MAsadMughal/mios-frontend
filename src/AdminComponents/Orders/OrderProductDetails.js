import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderProductDetails = () => {
  const [orderProduct, setOrderProduct] = useState([]);

  const params = useParams();
  let { id } = params;

  const getOrderProducts = async () => {
    let url = `http://localhost:5000/api/order/orderproduct/${id}`;
    let data = await fetch(url);
    data = await data.json();
    setOrderProduct(data);
  };

  useEffect(() => {
    getOrderProducts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  console.log(orderProduct);

  return (
    <>
      <div className="container mt-3">
        <h2>Product Details</h2>
        <table class="table table-striped table-bordered">
          <thead class="thead-dark">
            <tr className="table-dark text-center">
              <th scope="col">Product Image</th>
              <th scope="col">Product Title</th>
              <th scope="col">Price</th>
              <th scope="col">Sale Price</th>
              <th scope="col">Qty</th>
              <th scope="col">SubTotal</th>
            </tr>
          </thead>
          <tbody>
            {orderProduct.products &&
              orderProduct.products.map((el) => {
                return (
                  <tr key={el.product._id}>
                    <td className="table-product-images">
                      <img
                        src={el.product.photo.url}
                        alt={el.product.title}
                      />{" "}
                    </td>
                    <td>{el.product.title}</td>
                    <td>
                      {orderProduct.orderType === "Wholesale"
                        ? el.product.wholesalePrice
                        : el.product.dropshipperPrice}
                    </td>
                    <td>
                      {orderProduct.orderType === "Wholesale"
                        ? el.product.discountedPriceW > 0
                          ? el.product.discountedPriceW
                          : ""
                        : el.product.discountedPriceD > 0
                        ? el.product.discountedPriceD
                        : ""}
                    </td>
                    <td>{el.quantity}</td>
                    <td>
                      {orderProduct.orderType === "Wholesale"
                        ? el.product.discountedPriceW > 0
                          ? el.product.discountedPriceW * el.quantity
                          : el.product.wholesalePrice * el.quantity
                        : el.product.discountedPriceD > 0
                        ? el.product.discountedPriceD * el.quantity
                        : el.product.dropshipperPrice * el.quantity}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderProductDetails;
