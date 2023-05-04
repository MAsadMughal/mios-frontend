import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import UserContext from '../../context/User/UserContext';
import "./Customers.css";

const Customers = () => {
  const [allUsers, setAllUser] = useState([])
  const { getAndSetUsers } = useContext(UserContext);



  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await axios.get('/api/auth/allUsers');
      if (allUsers.length !== data.length) {
        setAllUser(data);
      }
    }
    getAllUsers();
  }, [allUsers])


  const getUsers = async () => {
    const { data } = await axios.get('/api/auth/allUsers');
    if (allUsers.length !== data.length) {
      setAllUser(data);
    }
    await getAndSetUsers();
  }


  const deleteAccount = async (e) => {
    await axios.delete(`/api/auth/delete/${e.currentTarget.id}`);
    await axios.get('/api/auth/allUsers');
    await getUsers()
  }



  return (
    <center>
      <div>
        <br/>
        <h1>All Customers Details({allUsers && allUsers.length})</h1>
        <br/>
        <table className='table' width={'90%'}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>Address</th>
              <th>Role</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          {allUsers && allUsers.map((item, ind) => {
            return (
              <tbody key={ind}>
                <tr>
                  <td>{ind+1}</td>
                  <td> {item.name} </td>
                  <td> {item.email} </td>
                  <td> {item.phone} </td>
                  <td> {item.city && item.city} </td>
                  <td> {item.address && item.address} </td>
                  <td> {item.role} </td>
                  <td> {(item.role === "dropshipper") ? (item.dropShipperStatus ? `True` : `False`) : `--`} </td>
                  <td><Link to={`/admin/customer/edit/${item._id}`}><button className="btn btn-info" id={item._id} >Edit</button> </Link> </td>
                  <td><button id={item._id} className="btn btn-danger" onClick={deleteAccount}>Delete</button> </td>
                </tr>
              </tbody>
            )
          })}

        </table>
      </div>
    </center >
  )
}

export default Customers