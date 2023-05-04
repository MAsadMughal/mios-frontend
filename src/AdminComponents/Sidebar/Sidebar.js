import React, { useContext, } from 'react'
import "./Sidebar.css"
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import UserContext from '../../context/User/UserContext';
import ProductContext from '../../context/Product/ProductContext';


const Sidebar = () => {
    const { allUsers, wholesellers, dropShippers, requests, user } = useContext(UserContext);
    const { categories, products } = useContext(ProductContext);

    const bodyStyles =
        user.isAdmin === true && user.name && window.innerWidth >= 750
            ? {
                paddingLeft: "80px",
            }
            : {};
    if (window.innerWidth >= 768) {
        document.body.style.paddingLeft = bodyStyles.paddingLeft;
    }




    const Navigate = useNavigate();
    const handleLogout = async () => {
        await axios.get("/api/auth/logout");
        Navigate('/admin/login')
        window.location.reload();
    }


    return (
        <>
            <header className="header">
                <div className="header__container">

                    <div className='d-flex'>
                        <div className="header__search">
                            <input type="search" placeholder="Search" className="header__input" />
                            <i className='bx bx-search header__icon'>   </i>
                        </div>

                    </div>

                    <div className="header__toggle">
                        <i className='bx bx-menu' id="header-toggle"></i>
                    </div>
                </div>
            </header>
            <div className="nav" id="navbar">
                <nav className="nav__container">
                    <div>
                        <Link to="/" className="nav__link nav__logo">
                            <i className='bx bxs-disc nav__icon' ></i>
                            <span className="nav__logo-name">MIOS</span>
                        </Link>

                        <div className="nav__list">
                            <div className="nav__items">
                                <h3 className="nav__subtitle">Profile</h3>

                                <Link to="/" className="nav__link active">
                                    <i className='bx bx-home nav__icon' ></i>
                                    <span className="nav__name">Home</span>
                                </Link>

                                <div className="nav__dropdown">
                                    <Link to="/admin/customer/all" className="nav__link">
                                        <i className='bx bx-user nav__icon' ></i>
                                        <span className="nav__name">Customers({allUsers})</span>
                                        <i className='bx bx-chevron-down nav__icon nav__dropdown-icon'></i>
                                    </Link>

                                    <div className="nav__dropdown-collapse">
                                        <div className="nav__dropdown-content">
                                            <Link to="/admin/customer/wholeseller" className="nav__dropdown-item">Wholesellers({wholesellers})</Link>
                                            <Link to="/admin/customer/dropshipper" className="nav__dropdown-item">Dropshippers({dropShippers})</Link>
                                            <Link to="/admin/customer/requests" className="nav__dropdown-item">Requests({requests})</Link>
                                        </div>
                                    </div>
                                </div>
                                <Link to="/admin/categories" className="nav__link">
                                    <i className='bx bx-category nav__icon' ></i>
                                    <span className="nav__name">Categories({categories && categories.length})</span>
                                </Link>

                                <div className="nav__dropdown">
                                    <Link to="/admin/products" className="nav__link">
                                        <i className='bx bx-store-alt nav__icon' ></i>
                                        <span className="nav__name">Products({products && products.length})</span>
                                        <i className='bx bx-chevron-down nav__icon nav__dropdown-icon'></i>
                                    </Link>

                                    <div className="nav__dropdown-collapse">
                                        <div className="nav__dropdown-content">
                                            <Link to="/admin/products" className="nav__dropdown-item">All Products</Link>
                                            <Link to="/admin/onsale" className="nav__dropdown-item">On Sale</Link>
                                            <Link to="/admin/featured" className="nav__dropdown-item">Featured</Link>
                                        </div>
                                    </div>
                                </div>
                                <Link to="/admin/payments" className="nav__link">
                                    <i className='bx bx-dollar nav__icon' ></i>
                                    <span className="nav__name">Payments</span>
                                </Link>
                                <Link to="/admin/shippingcost" className="nav__link">
                                    <i className='bx bx-calculator nav__icon' ></i>
                                    <span className="nav__name">Shipping Cost</span>
                                </Link>
                                <div className="nav__dropdown">
                                    <div className="nav__link">
                                        <i className='bx bx-file nav__icon' ></i>
                                        <span className="nav__name">Reports</span>
                                        <i className='bx bx-chevron-down nav__icon nav__dropdown-icon'></i>
                                    </div>

                                    <div className="nav__dropdown-collapse">
                                        <div className="nav__dropdown-content">
                                            <Link to="/admin/reports/order-report" className="nav__dropdown-item">Order Report</Link>
                                            <Link to="/admin/customer" className="nav__dropdown-item">Customer Details </Link>
                                            <Link to="/admin/profit" className="nav__dropdown-item">Dropship Customer Profit</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="nav__dropdown">
                                    <Link to="/admin/pendingprofits" className="nav__link">
                                        <i className='bx bx-menu nav__icon' ></i>
                                        <span className="nav__name">DS Profit</span>
                                        <i className='bx bx-chevron-down nav__icon nav__dropdown-icon'></i>
                                    </Link>

                                    <div className="nav__dropdown-collapse">
                                        <div className="nav__dropdown-content">
                                            <Link to="/admin/pendingprofits" className="nav__dropdown-item">Pending Profit</Link>
                                            <Link to="/admin/dropship-paid" className="nav__dropdown-item">Paid Profit</Link>
                                        </div>
                                    </div>
                                </div>


                            </div>

                            <div className="nav__items">
                                <h3 className="nav__subtitle">Orders</h3>

                                <div className="nav__dropdown">
                                    <Link to="/admin/wholesaleorders" className="nav__link">
                                        <i className='bx bx-task nav__icon' ></i>
                                        <span className="nav__name">Wholesale</span>
                                        <i className='bx bx-chevron-down nav__icon nav__dropdown-icon'></i>
                                    </Link>

                                    <div className="nav__dropdown-collapse">
                                        <div className="nav__dropdown-content">
                                            <Link to="/admin/return" className="nav__dropdown-item">Return Orders</Link>
                                            <Link to="/admin/pending-orders" className="nav__dropdown-item">Pending Orders</Link>
                                        </div>
                                    </div>

                                </div>
                                <div className="nav__dropdown">
                                    <Link to="/admin/dropshiporders" className="nav__link">
                                        <i className='bx bx-task nav__icon' ></i>
                                        <span className="nav__name">Dropship</span>
                                        <i className='bx bx-chevron-down nav__icon nav__dropdown-icon'></i>
                                    </Link>

                                    <div className="nav__dropdown-collapse">
                                        <div className="nav__dropdown-content">
                                            <Link to="/" className="nav__dropdown-item">Return Orders</Link>
                                            <Link to="/" className="nav__dropdown-item">Pending Orders</Link>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="nav__link nav__logout" onClick={handleLogout}>
                        <i className='bx bx-log-out nav__icon' ></i>
                        <span className="nav__name">Log Out</span>
                    </div>
                </nav>
            </div>

        </>
    )
}


export default Sidebar