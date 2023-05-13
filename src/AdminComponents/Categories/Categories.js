import React, { useState, useContext, useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from "axios";
import { ReactNotifications } from "react-notifications-component"
import ProductContext from '../../context/Product/ProductContext';
import "./Categories.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
import Notification from '../../Notifications/Notifications';
import Loader from '../../Loader/Loader';
import UserContext from '../../context/User/UserContext';

const Categories = () => {
  const host = process.env.REACT_APP_API_URL;
  const { categories, getCategories, loading, setLoading } = useContext(ProductContext);
  const userload = useContext(UserContext);
  const [show, setShow] = useState(true)

  useEffect(() => {
    getCategories();
  }, [])// eslint-disable-line react-hooks/exhaustive-deps


  const deleteCategory = async (e) => {
    try {
      setLoading(true)
      await axios.delete(`${host}/api/category/deletecategory/${e.currentTarget.id}`);
      await getCategories();
      setLoading(false)
    } catch (e) {
      setLoading(false)
      Notification("Error", e.response.data, "danger")
    }
  }



  const [name, setName] = useState("");





  const onChange = (e) => {
    setName(e.target.value);
  }


  const createCategory = async (e) => {
    e.preventDefault();
    try {
      if (!name) {
        window.alert('Enter Category Name.');
      } else {
        setLoading(true)
        await axios.post(`${host}/api/category/addCategory`, { headers: { 'Content-Type': 'application/json' }, name })
        setName("");
        await getCategories();
        setLoading(false)
        Notification("Success", "Category Created Successfully", "success");
      }
    } catch (e) {
      setLoading(false)
      if (e.response?.data?.message) {
        Notification("Error", e.response.data.message, "danger");
      } else if (e.response?.data) {
        Notification("Error", e.response.data, "danger");
      } else if (e.response?.data?.errors[0]?.message) {
        Notification("Error", e.response.data.errors[0].message, "danger");
      } else if (e.response?.data?.errors?.message) {
        Notification("Error", e.response.data.errors.message, "danger");
      } else {
        Notification("Error", e.message, "danger");
      }
    }
  }








  return (
    <center>
      <ReactNotifications />
      <br />
      <button className="btn btn-info" onClick={() => setShow(!show)}>{show ? `Add New Category` : `Show All Categories`}</button>
      <br />
      {loading ? <Loader /> :
        <>
          {show ?
            <div>
              <br />
              <h1>All Categories({categories && categories.length})</h1>
              <table className='table' style={{ textAlign: 'center' }} width={'90%'}>
                <thead>
                  <tr color='color-primary'>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                {categories && categories.map((item, ind) => {
                  return (
                    <tbody key={ind}>
                      <tr>
                        <td>{ind + 1}</td>
                        <td> {item.name} </td>
                        <td><Link to={`/admin/category/edit/${item._id}`}><button className='btn btn-info' id={item._id}>Edit</button> </Link> </td>
                        <td><button className='btn btn-danger' id={item._id} onClick={deleteCategory}>Delete</button> </td>
                      </tr>
                    </tbody>
                  )
                })}

              </table>
            </div>

            :

            <section style={{ marginTop: '2%' }}>
              {/* Create New Category */}
              <div >
                <h1>Create New Category</h1><br />
                <form className='input-group w-50' method='post'  >
                  <input className='form-control' value={name} type="name" name="name" id='name' placeholder="Name" autoFocus onChange={onChange} required />
                  <input className='form-control' type="submit" value="Create Category" onClick={createCategory} />
                </form>
              </div>
            </section>
          }
        </>
      }
    </center >
  )
}

export default Categories