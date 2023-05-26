// import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/modal';
import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import Login from './Components/Auth/Login';
import ProductMain from './Components/Product/ProductMain';
import ProductState from './context/Product/ProductState';
import Cart from './Components/Cart/Cart';
import Sidebar from "./Components/Sidebar/Sidebar";
import MyShopMain from './Components/MyShop/MyShopMain';

import UserBank from './Components/Dashboard/UserBank';
import UserBankUpdate from './Components/Dashboard/UserBankUpdate';


// Admin Imports
import axios from 'axios';
import AdminLogin from './AdminComponents/Auth/Login';
import Categories from './AdminComponents/Categories/Categories';
import EditCategory from './AdminComponents/Categories/EditCategory';
import Customers from './AdminComponents/Customers/Customers';
import Dropship from './AdminComponents/Customers/Dropship';
import EditCustomers from './AdminComponents/Customers/EditCustomers';
import Requests from './AdminComponents/Customers/Requests';
import Wholeseller from './AdminComponents/Customers/Wholeseller';
import Dashboard from "./AdminComponents/Dashboard/Dashboard";
import AddProduct from './AdminComponents/Product/AddProduct';
import EditProduct from './AdminComponents/Product/EditProduct';
import Featured from './AdminComponents/Product/Featured';
import OnSale from './AdminComponents/Product/OnSale';
import AdminProducts from './AdminComponents/Product/Products';
import SidebarLayout from './AdminComponents/Sidebar/SidebarLayout';
import Usercreation from './AdminComponents/Usercreation/Usercreation';
import Signup from './Components/Auth/Signup';
import NotFound from './Components/NotFound';
import RequestedDS from './Components/RequestedDS';
import User from './context/User/User';
import ProductDetail from './Components/Product/ProductDetail';
import UserDashboard from './Components/Dashboard/UserDashboard';
import OrderState from './context/Order/OrderState';
import UserProfile from './Components/Dashboard/UserProfile';
import MyOrders from './Components/Orders/MyOrders';
import PlaceOrder from './Components/Orders/PlaceOrder';
import Shippingcost from './AdminComponents/Shippingcost/Shippingcost'
import Addshippingcost from './AdminComponents/Shippingcost/Addshippingcost'
import WholesaleOrder from './AdminComponents/Orders/WholesaleOrder';
import DropshipOrder from './AdminComponents/Orders/DropshipOrder';
import FeaturedProducts from './Components/Product/Featured';
import Instock from './Components/Product/Instock';
import OutOfStock from './Components/Product/OutOfStock';
import OnSaleProducts from './Components/Product/OnSale';
import PendingOrders from './Components/Orders/PendingOrders';
import DeliveredOrders from './Components/Orders/DeliveredOrders';
import ShippedOrders from './Components/Orders/ShippedOrders';
import ReturnedOrders from './Components/Orders/ReturnedOrders';
import CategoryProducts from './Components/Product/CategoryProducts';
import OrderProductDetails from './AdminComponents/Orders/OrderProductDetails';
import UpdateShippingStatus from './AdminComponents/Orders/UpdateShippingStatus';
import EditOrderAdminW from './AdminComponents/Orders/EditOrderAdminW';
import EditOrderAdminD from './AdminComponents/Orders/EditOrderAdminD';
import OrderReport from './AdminComponents/Reports/OrderReport';
import DropshipPending from './AdminComponents/Dropshippersprofit/DropshipPending';
import PendingByOrder from './AdminComponents/Dropshippersprofit/PendingByOrder';
import DropshipPaid from './AdminComponents/Dropshippersprofit/DropshipPaid';
import Loader from './Loader/Loader';
import PaidPerUser from './AdminComponents/Dropshippersprofit/PaidPerUser';
import ProfitOrderDetails from './AdminComponents/Dropshippersprofit/ProfitOrderDetails';
import PendingOrderEdit from './Components/Orders/PendingOrderEdit';
import ImportProducts from './AdminComponents/Product/ImportProducts';

axios.defaults.withCredentials = true;
function App() {
  const host = process.env.REACT_APP_API_URL;
  let [user, setUser] = useState({});
  let [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  let [error, setError] = useState('');
  let DSrequest = false;
  let admin = false;

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`${host}/api/auth/user`, { withCredentials: true });
        setUser(data);
        setLoading(false)
      } catch (e) {
        setLoading(false)
        setError('');
      }
    }
    getUserDetails();

    // eslint-disable-next-line
  }, [])


  if (user._id && user.isAdmin === false && user.role === "dropshipper" && user.dropShipperStatus === false) {
    DSrequest = true;
  }


  if (user._id && user.isAdmin === true) {
    admin = true;
  }
  return (
    <>
      <div className='home'>
        {loading ? <Loader /> :
          <BrowserRouter>
            <ProductState>
              <User>
                <OrderState>
                  {admin && <SidebarLayout setuser={setUser} />}
                  {/* {DSrequest ? null : (user._id && user.isAdmin === false) ? <Sidebar setuser={setUser} /> : null} */}
                  {DSrequest ? null : (user._id && user.isAdmin === false) ? <Sidebar /> : null}
                  <Routes>
                    {/* <Login/> */}
                    <Route path="/" element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <ProductMain data="fetchallproducts" /> : admin ? <Dashboard /> : <Navigate to="/login" />} />
                    <Route path="/login" element={DSrequest ? <Navigate to="/" /> : (user._id && user.isAdmin === false) ? <Navigate to="/" /> : admin ? <Navigate to="/" /> : <Login />} />
                    <Route path="/signup" element={DSrequest ? <Navigate to="/" /> : (user._id && user.isAdmin === false) ? <Navigate to="/" /> : admin ? <Navigate to="/" /> : <Signup setuser={setUser} />} />
                    <Route path='/productMain' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <ProductMain /> : <Navigate to="/login" />} />
                    {/* <Route path='/categories/:id' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin == false) ? <CategoryProducts params={{ id: ':id' }} /> : null} /> */}
                    <Route path='/featured' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <FeaturedProducts /> : <Navigate to="/" />} />
                    <Route path='/onsale' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <OnSaleProducts /> : <Navigate to="/" />} />
                    <Route path='/instock' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <Instock /> : <Navigate to="/" />} />
                    <Route path='/outOfStock' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <OutOfStock /> : <Navigate to="/" />} />
                    <Route path='/cart' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <Cart /> : <Navigate to="/" />} />
                    <Route path='/myshop' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <MyShopMain /> : <Navigate to="/" />} />
                    <Route path='/product/:id' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <ProductDetail params={{ id: 'id' }} /> : <Navigate to="/" />} />
                    <Route path='/user/dashboard' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <UserDashboard /> : <Navigate to="/" />} />
                    <Route path='/user/profile' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <UserProfile /> : <Navigate to="/" />} />
                    <Route path='/myOrders' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <MyOrders /> : <Navigate to="/" />} />
                    <Route path='/orders/pending' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <PendingOrders /> : <Navigate to="/" />} />
                    <Route path='/orders/Pending/orderedit/:id' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <PendingOrderEdit /> : <Navigate to="/" />} />
                    <Route path='/orders/delivered' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <DeliveredOrders /> : <Navigate to="/" />} />
                    <Route path='/orders/shipped' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <ShippedOrders /> : <Navigate to="/" />} />
                    <Route path='/orders/returned' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <ReturnedOrders /> : <Navigate to="/" />} />
                    <Route path='/category/:id' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <CategoryProducts /> : <Navigate to="/" />} />
                    <Route path='/checkout' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <PlaceOrder /> : <Navigate to="/" />} />
                    <Route path='/user/addbankdetails' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <UserBank /> : <Navigate to="/" />} />
                    <Route path='/user/updatebank' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <UserBankUpdate /> : <Navigate to="/" />} />
                    {/* <Route path='/checkout' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin == false) ? <Checkout /> : null} /> */}

                    {/* Admin Routes */}
                    <Route exact path="/admin/" element={(user._id && user.isAdmin === false) ? <ProductMain data="fetchallproducts" /> : !admin ? <AdminLogin setUser={setUser} /> : <Dashboard />} />
                    <Route exact path="/admin/login" element={(user._id && user.isAdmin === false) ? <ProductMain data="fetchallproducts" /> : !admin ? <AdminLogin setUser={setUser} /> : <Dashboard />} />
                    <Route path="/admin/usercreation" element={admin ? <Usercreation /> : <Navigate to="/admin/login" />} />
                    <Route path="/admin/dashboard" element={admin ? <Dashboard /> : <Navigate to="/admin/login" />} />
                    <Route path="/admin/customer" element={admin ? <Customers /> : <Navigate to="/admin/login" />} />
                    <Route path="/admin/customer/wholeseller" element={admin ? <Wholeseller /> : <Navigate to="/admin/login" />} />
                    <Route path="/admin/customer/dropshipper" element={admin ? <Dropship /> : <Navigate to="/admin/login" />} />
                    <Route path="/admin/customer/requests" element={admin ? <Requests /> : <Navigate to="/admin/login" />} />
                    <Route path="/admin/customer/edit/:id" element={admin ? <EditCustomers /> : <Navigate to="/admin/login" />} />
                    <Route path="/admin/products" element={admin ? <AdminProducts /> : <Navigate to="/admin/login" />} />
                    <Route path="/admin/featured" element={admin ? <Featured /> : <Navigate to="/admin/login" />} />
                    <Route path="/admin/onsale" element={admin ? <OnSale /> : <Navigate to="/admin/login" />} />
                    <Route path="/admin/categories" element={admin ? <Categories /> : <Navigate to="/admin/login" />} />
                    {/* <Route path="/admin/payments" element={admin ? <Payments /> : <Navigate to="/admin/login" />} /> */}
                    {/* <Route path="/admin/allorders" element={admin ? <Order /> : <Navigate to="/admin/login" />} /> */}
                    <Route path="/admin/dropshiporders" element={admin ? <DropshipOrder /> : <Navigate to="/admin/login" />} />
                    <Route path="/admin/wholesaleorders" element={admin ? <WholesaleOrder /> : <></>} />
                    <Route path="/admin/orderproduct/details/:id" element={admin ? <OrderProductDetails /> : <></>} />
                    <Route path="/admin/updateshippingstatus/:id" element={admin ? <UpdateShippingStatus /> : <></>} />
                    <Route path="/admin/editwholesaleorder/:id" element={admin ? <EditOrderAdminW /> : <></>} />
                    <Route path="/admin/editdropshiporder/:id" element={admin ? <EditOrderAdminD /> : <></>} />
                    <Route path="/admin/shippingcost" element={admin ? <Shippingcost /> : <Navigate to="/admin/login" />} />
                    {/* <Route path="/admin/reports" element={admin ? <Reports /> : <Navigate to="/admin/login" />} /> */}
                    <Route path="/admin/pendingprofits" element={admin ? <DropshipPending /> : <Navigate to="/admin/login" />} />
                    <Route path="/admin/pendingprofits/byorder/:id" element={admin ? <PendingByOrder /> : <Navigate to="/admin/login" />} />
                    <Route path="/admin/dropship-paid" element={admin ? <DropshipPaid /> : <Navigate to="/admin/login" />} />
                    <Route path="/admin/paidperUser/:id" element={admin ? <PaidPerUser /> : <Navigate to="/admin/login" />} />
                    <Route path="/admin/singleprofit/:userid/:id" element={admin ? <ProfitOrderDetails /> : <Navigate to="/admin/login" />} />
                    {/* <Route path="/admin/products" element={admin ? <AddProduct /> : <Navigate to="/admin/login" />} /> */}
                    <Route path="/admin/addProduct" element={admin ? <AddProduct /> : <Navigate to="/admin/login" />} />
                    <Route path="/admin/addProduct/importproducts" element={admin ? <ImportProducts /> : <Navigate to="/admin/login" />} />
                    <Route path="/admin/category/edit/:id" element={admin ? <EditCategory /> : <Navigate to="/admin/login" />} />
                    <Route path="/admin/product/edit/:id" element={admin ? <EditProduct /> : <Navigate to="/admin/login" />} />
                    <Route path="/admin/reports/order-report" element={admin ? <OrderReport /> : <Navigate to="/admin/login" />} />
                    <Route path="/admin/addshippingcost" element={admin ? <Addshippingcost /> : <Navigate to="/admin/login" />} />

                    <Route path='*' element={NotFound} />
                  </Routes>
                </OrderState>
              </User>
            </ProductState>
          </BrowserRouter>
        }</div>
    </>
  );
}

export default App;
