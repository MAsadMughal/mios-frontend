import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import ProductContext from '../../context/Product/ProductContext';


const EditCategory = () => {
  const host = process.env.REACT_APP_API_URL;
  const [name, setName] = useState("")
  const { getProducts } = useContext(ProductContext);

  useEffect(() => {
    const getDetails = async () => {
      const { data } = await axios.get(`/api/category/category/${id}`);
      setName(data.category?.name)
    }
    getDetails();
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  const onChange = (e) => {
    setName(e.target.value)
  };

  const params = useParams();
  const { id } = params;


  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${host}/api/category/editcategory/${id}`, { name });
      await getProducts();
      Navigate('/admin/categories');
    } catch (e) {

    }
  };
  
  return (
    <>

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="text-center my-4">Edit Category</h2>
            <form
              method="post"
              onSubmit={handleSubmit}
              className="card py-4 px-4 rounded"
            >
              <div className="row mb-2  d-flex justify-content-center">
                <div className="form-group col-sm-4">
                  <label htmlFor="pTitle">Category Title</label>
                  <br />
                  <br />
                  <input type="text" value={name} placeholder='Enter Category Title' className="form-control" id="pTitle" name="pTitle" onChange={onChange} required />
                </div>
                <div className='col-sm-4 align-self-end'>
                  <button type="submit" className="btn btn-success ">
                    Update Category
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditCategory