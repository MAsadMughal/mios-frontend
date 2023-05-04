import axios from "axios";
import React, {useEffect, useState } from "react";
import { ReactNotifications } from "react-notifications-component";
import { Link, useParams } from "react-router-dom";
import Notification from "../../Notifications/Notifications";
const image = window.location.origin + "/Assets/no-data.svg";
const PendingByOrder = () => {
    const host = process.env.REACT_APP_API_URL;
    const [allProfits, setAllProfits] = useState([]);
    useEffect(() => {
        getAllProfits();
        // eslint-disable-next-line
    }, [])
    const { id } = useParams();
    const getAllProfits = async () => {
        const { data } = await axios.get(`${host}/api/profitrecords/pendingprofitsbyuser/${id}`);
        setAllProfits(data);
    }

    const paySingleProfits = async (user, amount, orderId) => {
        try {
            const { data } = await axios.post(`${host}/api/profitrecords/paySingleProfit`, { userId: user, amount, orderId });
            Notification('Success', data.message, 'success')
            await getAllProfits();
        } catch (error) {
            Notification('Error', error.message, 'danger')
        }
    }

    return (
        <><ReactNotifications />
            <div className="main">
                <div className="container-fluid">
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr className="table-dark">
                                <th colSpan="1" >Sr.</th>
                                <th colSpan="1" className="text-center">Customer Name</th>
                                <th colSpan="1" className="text-center">Company Name</th>
                                <th colSpan="1" className="text-center">Contact</th>
                                <th colSpan="1" className="text-center">Pending Profit</th>
                                <th colSpan="1" className="text-center">Profit Status</th>
                                <th colSpan="1" className="text-center">Pay Profit</th>
                                <th colSpan="1" className="text-center">Detail</th>
                            </tr>
                        </thead>
                        <tbody>

                            {allProfits && allProfits?.map((item, key) => {
                                console.log(item);
                                return (<tr key={key}>
                                    <td colSpan="1" className="text-center">{key + 1}</td>
                                    <td colSpan="1" className="text-center">{item?.user?.name}</td>
                                    <td colSpan="1" className="text-center">{item?.user?.company}</td>
                                    <td colSpan="1" className="text-center">{item?.user?.city}</td>
                                    <td colSpan="1" className="text-center">{item?.profitAmount}</td>
                                    <td colSpan="1" className="text-center">{item?.profitStatus}</td>
                                    <td colSpan="1" className="text-center"><button disabled={item?.profitAmount <= 0 || item?.profitStatus === "Paid"} onClick={() => paySingleProfits(item?.user?._id, item?.profitAmount, item?._id)} className="btn btn-primary">Pay Profit </button></td>
                                    <td colSpan="1" className="text-center"><Link to={`/admin/orderproduct/details/${item?._id}`}><button className="btn btn-primary">Detail</button></Link></td>
                                </tr>)
                            })}
                        </tbody>
                    </table>
                    {allProfits?.length <= 0 && <div className='no_data'>
                        <img className='no_data-img' src={image} alt='No Data' ></img>
                    </div>}
                </div>
            </div>
        </>
    );
}

export default PendingByOrder;

