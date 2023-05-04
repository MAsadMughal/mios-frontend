import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import { AppBar, Divider, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ProductContext from '../../context/Product/ProductContext';
import UserContext from '../../context/User/UserContext';
import "./SideBar.css";
import { arr, navArr, orderStatuses } from './SidebarData';



export default function Sidebar() {
    const host = process.env.REACT_APP_API_URL;
    const [open, setOpen] = useState(false);
    const handleDrawerOpen = () => { setOpen(true); };
    const handleDrawerClose = () => { setOpen(false); };
    const Navbar = styled(AppBar)` background-color:transparent; backdrop-filter: blur(10px); color:black; `;
    const location = useLocation();
    const Navigate = useNavigate();
    const Navigation = (e) => { Navigate(e.target.id); setOpen(false); }
    let [numbers, setNumbers] = useState({ pending: 0, shipped: 0, delivered: 0, returned: 0 });
    let [count, setCount] = useState({});
    useEffect(() => {
        window.scrollTo(0, 0);
        const getNumbers = async () => {
            const pending = await axios.get(`${host}/api/order/pendingOrders`)
            const shipped = await axios.get(`${host}/api/order/shippedOrders`)
            const delivered = await axios.get(`${host}/api/order/deliveredOrders`)
            const returned = await axios.get(`${host}/api/order/returnedOrders`)
            setNumbers({ pending: pending?.data?.length, shipped: shipped?.data?.length, delivered: delivered?.data?.length, returned: returned?.data?.length })
            const { data } = await axios.get(`${host}/api/product/catcount`);
            setCount(data.count);
        }
        getNumbers();
    }, [location.pathname])
    const { CartItems, categories } = useContext(ProductContext);
    const { user } = useContext(UserContext);


    const logout = async () => {
        await axios.get(`${host}/api/auth/logout`);
        Navigate('/login');
        window.location.reload();
    }

    const bodyStyles =
        user.isAdmin === false && user.name && window.innerWidth >= 750
            ? {
                paddingLeft: "220px",
                width: "95%"
            }
            : {};
    document.body.style.paddingLeft = bodyStyles.paddingLeft;
    document.body.style.width = bodyStyles.width;

    return (
        <>{(!(location.pathname.includes('admin')) && window.innerWidth <= 750) ?
            <Box sx={{ display: 'flex' }}>
                <Navbar position="fixed" open={open}>
                    <Toolbar>
                        <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={{ marginRight: 5, }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16" fill="none" className="css-1170n61"><rect x="1" y="5" width="14" height="1.5" rx="1" fill="#007FFF"></rect><rect x="1" y="9" width="14" height="1.5" rx="1" fill="#007FFF"></rect></svg>               </IconButton>
                        <center style={{ flexGrow: 1 }} >
                            <Link to="/" className="header__logo" >MIOS</Link>
                        </center>
                        <div className="dropdown smooth-drop text-primary" style={{ cursor: "pointer", justifySelf: 'flex-end' }}>
                            <div className="dropdown-toggle ms-5" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                                <AccountCircleIcon fontSize='large' />
                            </div>
                            <div className="dropdown-menu" aria-labelledby="triggerId">
                                <Link style={{ textDecoration: 'none' }} to="/user/Profile">
                                    <div className="dropdown-item">Profile</div>
                                </Link>
                                <Link style={{ textDecoration: 'none' }} to="/user/dashboard">
                                    <div className="dropdown-item">Dashboard</div>
                                </Link>
                                <div onClick={logout} className="dropdown-item">Logout</div>
                            </div>
                        </div>
                    </Toolbar>
                </Navbar>

                <Drawer anchor="left" PaperProps={{ style: { backgroundColor: 'transparent', backdropFilter: 'blur(5px)' } }} BackdropProps={{ invisible: false, style: { opacity: 1, backgroundColor: "transparent" }, }} open={open} onClose={handleDrawerClose}>
                    <div style={{ alignSelf: 'flex-end', cursor: 'pointer', }}>
                        <CloseIcon sx={{ color: 'white', height: "40px", width: "40px", backgroundColor: '#1976d2' }} onClick={handleDrawerClose}>Close</CloseIcon>
                    </div>

                    <div style={{ backgroundColor: 'transparent', height: "100vh", width: "300px" }}>
                        <ul>
                            {/* Menu */}
                            {arr.map((item, ind) => {
                                return (
                                    <li key={ind} id={item.path} className='AdminSideBarLink' style={location.pathname.toLowerCase() === item.path.toLowerCase() ? { backgroundColor: 'deepskyblue', color: 'white' } : null} onClick={Navigation}>
                                        &nbsp;&nbsp;{item.title}
                                    </li>
                                )
                            })}
                            <Divider />
                            {/* Order Statuses */}
                            <div>
                                <h4 style={{ paddingTop: "10px", paddingLeft: "10px", }}>Orders</h4>
                                {orderStatuses.map((item, ind) => {
                                    return (
                                        <p key={ind} id={item.path} className="AdminSidebarSubHead" style={location.pathname.toLowerCase() === item.path.toLowerCase() ? { backgroundColor: 'deepskyblue', color: 'white' } : null} onClick={Navigation}>
                                            &nbsp;&nbsp;{item.title}({numbers[item.title.toLowerCase()]})
                                        </p>)
                                })}
                            </div>
                            <Divider />

                            {/* Types of Product Sales */}
                            <div>
                                <h4 style={{ paddingTop: "10px", paddingLeft: "10px", }}>Products</h4>
                                {navArr.map((item, ind) => {
                                    return (
                                        <p id={item.path} key={ind} className="AdminSidebarSubHead" style={location.pathname.toLowerCase() === item.path.toLowerCase() ? { backgroundColor: 'deepskyblue', color: 'white' } : null} onClick={Navigation}>
                                            &nbsp;&nbsp;{item.title}
                                        </p>)
                                })}
                            </div>
                            <Divider />

                            {/* Categories */}
                            <div>
                                <h4 style={{ paddingTop: "10px", paddingLeft: "10px", }}>Categories</h4>
                                {categories.map((item, ind) => {

                                    return (
                                        <Typography onClick={() => { handleDrawerClose() }}>
                                            <Link key={ind} to={`/category/${item._id}`} >
                                                <p className="AdminSidebarSubHead" style={location.pathname.toLowerCase() === `/category/${item._id}` ? { backgroundColor: 'deepskyblue', color: 'white' } : null} >
                                                    &nbsp;&nbsp;{item.name} ({count[item._id]})
                                                </p>
                                            </Link>
                                        </Typography>)
                                })}
                            </div>

                        </ul>
                    </div>
                </Drawer >
            </Box > : <Box sx={{ display: 'flex' }}>
                <Navbar position="fixed" open={open}>
                    <Toolbar>
                        <div className='nav-link' style={user.isAdmin === false && user ? { marginLeft: "200px", flexGrow: 1 } : null}>
                            <span className='mx-2'>
                                <Link className='nav__name' to='/'>Home</Link>
                            </span>
                            <span className='mx-2'>
                                <Link className='nav__name' to='/user/dashboard'>Dashboard</Link>
                            </span>
                            <span className='mx-2'>
                                <Link className='nav__name' to='/featured'>Featured</Link>
                            </span>
                            <span className='mx-2'>
                                <Link className='nav__name' to='/onSale'>Sale</Link>
                            </span>
                            <span className='mx-2'>
                                <Link className='nav__name' to='/instock'>In Stock</Link>
                            </span>
                            <span className='mx-2'>
                                <Link className='nav__name' to='/outofstock'>Out of Stock</Link>
                            </span>
                        </div>

                        <div className="header__cart">
                            <Link to='/cart' className='header__cart-link'>
                                <i className='bx bx-cart-alt header__icon'></i>
                                <span className='header__cart-count'>{CartItems ? CartItems?.cart?.length : 0}</span>
                            </Link>
                        </div>
                        <div className="dropdown smooth-drop text-primary" style={{ cursor: "pointer", justifySelf: 'flex-end' }}>
                            <div className="dropdown-toggle ms-5" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                                <AccountCircleIcon fontSize='large' />
                            </div>
                            <div className="dropdown-menu" aria-labelledby="triggerId">
                                <Link style={{ textDecoration: 'none' }} to="/user/Profile">
                                    <div className="dropdown-item">Profile</div>
                                </Link>
                                <Link style={{ textDecoration: 'none' }} to="/user/dashboard">
                                    <div className="dropdown-item">Dashboard</div>
                                </Link>
                                <div onClick={logout} className="dropdown-item">Logout</div>
                            </div>
                        </div>
                    </Toolbar>
                </Navbar>

                <Drawer variant="permanent" open={true} ModalProps={{ keepMounted: true }} >
                    <div style={{ backgroundColor: 'transparent', height: "100vh", marginTop: "2vh", width: "200px" }}>
                        <center style={{ fontSize: "30px" }} >
                            <Link to="/" className="header__logo" >MIOS</Link>
                        </center>
                        <ul>
                            {/* Menu */}
                            {(location.pathname !== "/" && location.pathname.toLowerCase() !== "/featured" && location.pathname.toLowerCase() !== "/onsale" && location.pathname.toLowerCase() !== "/instock" && location.pathname.toLowerCase() !== "/outofstock" && !location.pathname.includes("/category/")) && arr.map((item, ind) => {
                                return (
                                    <li key={ind} id={item.path} className='AdminSideBarLink' style={location.pathname.toLowerCase() === item.path.toLowerCase() ? { backgroundColor: 'deepskyblue', color: 'white' } : null} onClick={Navigation}>
                                        &nbsp;&nbsp;{item.title}
                                    </li>)
                            })}
                            <Divider />
                            {/* Order Statuses */}
                            {(location.pathname !== "/" && location.pathname.toLowerCase() !== "/featured" && location.pathname.toLowerCase() !== "/onsale" && location.pathname.toLowerCase() !== "/instock" && location.pathname.toLowerCase() !== "/outofstock" && !location.pathname.includes("/category/")) && <div>
                                <h4 style={{ paddingTop: "10px", paddingLeft: "10px", }}>Orders</h4>
                                {orderStatuses.map((item, ind) => {
                                    // const num = numbers[item.title.toLowerCase()];
                                    return (
                                        <p key={ind} id={item.path} className="AdminSidebarSubHead" style={location.pathname.toLowerCase() === item.path.toLowerCase() ? { backgroundColor: 'deepskyblue', color: 'white' } : null} onClick={Navigation}>
                                            &nbsp;&nbsp;{item.title}({numbers[item.title.toLowerCase()]})
                                        </p>)
                                })}
                                <Divider />
                            </div>}

                            {/* Categories */}
                            <div>
                                {(location.pathname === "/" || location.pathname.toLowerCase() !== "/featured" || location.pathname.toLowerCase() !== "/onsale" || location.pathname.toLowerCase() !== "/instock" || location.pathname.toLowerCase() !== "/outofstock" || location.pathname.includes("/category/")) && <div>
                                    <h4 style={{ paddingTop: "10px", paddingLeft: "10px", }}>Categories</h4>
                                    {categories.map((item, ind) => {
                                        return (
                                            <Link key={ind} to={`/category/${item._id}`}  >
                                                <p className="AdminSidebarSubHead" style={location.pathname.toLowerCase() === `/category/${item._id}` ? { backgroundColor: 'deepskyblue', color: 'white' } : null}>
                                                    &nbsp;&nbsp;{item?.name} ({count[item._id]})
                                                </p>
                                            </Link>
                                        )
                                    })}
                                </div>}
                            </div>

                        </ul>
                    </div>
                </Drawer>
            </Box >
        }
        </>
    );
}