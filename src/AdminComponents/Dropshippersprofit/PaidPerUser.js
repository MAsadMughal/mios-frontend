import axios from "axios";
import React, { useEffect, useState } from "react";
import { ReactNotifications } from "react-notifications-component";
import { Link, useParams } from "react-router-dom";
import Notification from "../../Notifications/Notifications";
import Loader from "../../Loader/Loader";
const image = window.location.origin + "/Assets/no-data.svg";
const PaidPerUser = () => {

    const host = process.env.REACT_APP_API_URL;
    const [profits, setAllProfits] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getAllProfits();
        // eslint-disable-next-line
    }, [])
    const { id } = useParams();
    const getAllProfits = async () => {
        setLoading(true)
        const { data } = await axios.get(`${host}/api/profitrecords/paidperuser/${id}`);
        setAllProfits(data);
        setLoading(false)
    }

    return (
        <><ReactNotifications />
            {loading ? <Loader /> : <div className="main">
                <div className="container-fluid">
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr className="table-dark">
                                <th colSpan="1" >Sr.</th>
                                <th colSpan="1" className="text-center">Customer Name</th>
                                <th colSpan="1" className="text-center">Orders No.</th>
                                <th colSpan="1" className="text-center">Profit Amount</th>
                                <th colSpan="1" className="text-center">Payment Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {profits && profits?.records?.map((item, key) => {
                                return (<tr key={key}>
                                    <td colSpan="1" className="text-center">{key + 1}</td>
                                    <td colSpan="1" className="text-center">{profits?.user?.name}</td>
                                    <td colSpan="1" className="text-center">
                                        {item?.orders.map((item, k) => {
                                            return (<>
                                                <Link to={`/admin/orderproduct/details/${item}`} style={{ fontSize: "20px" }}>&nbsp;&nbsp;|&nbsp;{k + 1}&nbsp;|&nbsp;&nbsp;</Link>{k + 1 % 3 == 0 && <br />}
                                            </>)
                                        })}
                                    </td >
                                    <td colSpan="1" className="text-center">{item?.amount}</td>
                                    <td colSpan="1" className="text-center">{new Date(item?.datePaid).toLocaleString('en-PK', { timeZone: 'Asia/Karachi' })}</td>
                                </tr>)
                            })}
                        </tbody>
                    </table>
                    {profits?.length <= 0 && <div className='no_data'>
                        <img className='no_data-img' src={image} alt='No Data' ></img>
                    </div>}
                </div>
            </div>}
        </>
    );
}

export default PaidPerUser;

