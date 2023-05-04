import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductContext from "./ProductContext";

const ProductState = (props) => {
  const host = process.env.REACT_APP_API_URL;
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [CartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [shippCat, setShippingCat] = useState(0);
  const [MyShopItems, setMyShopItems] = useState([]);

  // const [featured, setFeatured] = useState([])
  // const [onSale, setOnSale] = useState([])

  const getCategories = async () => {
    const { data } = await axios.get(`${host}/api/category/allcategories`);
    setCategories(data?.categories);
  };
  const getProducts = async () => {
    const { data } = await axios.get(`${host}/api/product/allProducts`);
    setProducts(data?.products);
  };
  const getShipCat = async () => {
    const { data } = await axios.get(`${host}/api/shipping/shippingcalc`);
    setShippingCat(data);
  };
  useEffect(() => {
    getShipCat();
  }, []);

  const Cart = async () => {
    const { data } = await axios.get(`${host}/api/cart/allcartitems`);
    setCartItems(data);
  };

  const getMyshop = async () => {
    const { data } = await axios.get(`${host}/api/myshop/allmyshopitems`);
    setMyShopItems(data);
  };

  useEffect(() => {
    getCategories();
    getProducts();
    Cart();
    getMyshop();
  }, [setCartItems]);

  const addToCart = async ({ product }, quantity) => {
    const cart = {
      product,
      quantity,
    };
    await axios
      .post(`${host}/api/cart/addtocart`, { cart })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const removeCartProduct = async (id) => {
    await axios
      .delete(`${host}/api/cart/deletecartitem/${id}`)
      .then(function (response) {
        setCartItems(response.data.result);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateCartProductQty = async (id, qty) => {
    await axios
      .put(`${host}/api/cart/updatecart/${id}`, { qty })
      .then(function (response) {
        setCartItems(response.data.result);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const addToMyShop = async (product) => {
    await axios
      .post(`${host}/api/myshop/addtomyshop`, { product })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <ProductContext.Provider
      value={{
        categories,
        getCategories,
        products,
        getProducts,
        addToCart,
        Cart,
        CartItems,
        subTotal,
        shippCat,
        setSubTotal,
        removeCartProduct,
        updateCartProductQty,
        addToMyShop,
        getMyshop,
        MyShopItems,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
