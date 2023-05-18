import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";



const PendingOrderEdit = () => {

    const host = process.env.REACT_APP_API_URL;
    const params = useParams();
    const { id } = params;
    const Navigate = useNavigate();

    const getDetails = async () => {
      const { data } = await axios.get(`${host}/api/order/orderproduct/${id}`);
      setShippingDetails(data.shippingDetails);
    };

  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });


  

  useEffect(() => {

    getDetails();

  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onChangeShip = (e) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value })
  }




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      await axios.put(`${host}/api/order/updateshippingdetails/${id}`, {
        name: shippingDetails.name,
        address: shippingDetails.address,
        email: shippingDetails.email,
        phone: shippingDetails.phone,
      });

      

      Navigate(`/orders/Pending`);

    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <form
              method="post"
              onSubmit={handleSubmit}
              className="py-2 px-4 rounded"
            >
              <div className="row mb-2   justify-content-center">
                <h3 className="text-center my-2">Edit Shipping Details</h3>
                <div className="form-group col-sm-8 mt-3">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    value={shippingDetails.name}
                    placeholder="Update Sipping Name"
                    className="form-control mt-2"
                    id="name"
                    name="name"
                    onChange={onChangeShip}
                    required
                  />
                </div>
                <div className="form-group col-sm-8 mt-3">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    value={shippingDetails.address}
                    placeholder="Enter Shipping Address"
                    className="form-control mt-2"
                    id="address"
                    name="address"
                    onChange={onChangeShip}
                    required
                  />
                </div>
                <div className="form-group col-sm-8 mt-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    value={shippingDetails.email}
                    placeholder="Enter Update Email"
                    className="form-control mt-2"
                    id="email"
                    name="email"
                    onChange={onChangeShip}
                    required
                  />
                </div>
                <div className="form-group col-sm-8 mt-3">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    value={shippingDetails.phone}
                    placeholder="Enter Update Phone Number"
                    className="form-control mt-2"
                    id="phone"
                    name="phone"
                    onChange={onChangeShip}
                    required
                  />
                </div>
                
                <div className="col-sm-8 ">
                  <button type="submit" className="btn btn-success ">
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PendingOrderEdit