import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductContext from "./ProductContext";

const ProductState = (props) => {
  const host = process.env.REACT_APP_API_URL;
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [CartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [shippCat, setShippingCat] = useState(0);
  const [MyShopItems, setMyShopItems] = useState([]);

  const [featured, setFeatured] = useState([])
  const [onSale, setOnSale] = useState([])

  const getFeatured = async () => {
    setLoading(true)
    const { data } = await axios.get(`${host}/api/product/featured`);
    setFeatured(data?.featuredProducts);
    setLoading(false)
  };
  const getOnSale = async () => {
    setLoading(true)
    const { data } = await axios.get(`${host}/api/product/allonsale`);
    setOnSale(data?.onSaleProducts);
    setLoading(false)
  };



  const getCategories = async () => {
    setLoading(true)
    const { data } = await axios.get(`${host}/api/category/allcategories`);
    setCategories(data?.categories);
    setLoading(false)
  };
  const getProducts = async () => {
    setLoading(true)
    const { data } = await axios.get(`${host}/api/product/allProducts`);
    setProducts(data?.products);
    setLoading(false)
  };
  const getShipCat = async () => {
    setLoading(true)
    const { data } = await axios.get(`${host}/api/shipping/shippingcalc`);
    setShippingCat(data);
    setLoading(false)
  };
  useEffect(() => {
    getShipCat();
  }, []);

  const Cart = async () => {
    try {
      // setCartLoading(true)
      const { data } = await axios.get(`${host}/api/cart/allcartitems`);
      setCartItems(data);
      // setCartLoading(false)
    } catch (error) {
      // setCartLoading(false)
    }
  };

  const getMyshop = async () => {
    setLoading(true)
    const { data } = await axios.get(`${host}/api/myshop/allmyshopitems`);
    setMyShopItems(data);
    setLoading(false)
  };

  useEffect(() => {
    getCategories();
    getProducts();
    // Cart();
    getMyshop();
  }, [setCartItems]);

  const addToCart = async ({ product }, quantity) => {
    const cart = {
      product,
      quantity,
    };
    setLoading(true)
    setCartLoading(true)
    await axios.post(`${host}/api/cart/addtocart`, { cart })
      .then(function () {
        setCartLoading(false)
        setLoading(false)
      })
      .catch(function (error) {
        setCartLoading(false)
        setLoading(false)
        console.log(error);
      });
  };

  const removeCartProduct = async (id) => {
    setCartLoading(true)
    await axios.delete(`${host}/api/cart/deletecartitem/${id}`)
      .then(function (response) {
        setCartLoading(false)
        setCartItems(response.data.result);
      })
      .catch(function (error) {
        setCartLoading(false)
        console.log(error);
      });
  };

  const updateCartProductQty = async (id, qty) => {
    setCartLoading(true)
    await axios.put(`${host}/api/cart/updatecart/${id}`, { qty })
      .then(function (response) {
        setCartLoading(false)
        setCartItems(response.data.result);
      })
      .catch(function (error) {
        setCartLoading(false)
      });
  };

  const addToMyShop = async (product) => {
    setLoading(true)
    await axios.post(`${host}/api/myshop/addtomyshop`, { product })
      .then(function () {
        setLoading(false)
      })
      .catch(function (error) {
        setLoading(false)
        console.log(error);
      });
  };

  return (
    <ProductContext.Provider
      value={{
        loading, setLoading,
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
        getMyshop, getFeatured, getOnSale, featured, onSale,
        MyShopItems, cartLoading
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;