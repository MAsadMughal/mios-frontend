import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Payments = () => {
  const host = process.env.REACT_APP_API_URL;

  const [order, setOrder] = useState([])

  const getOrders = async () => {
    const { data } = await axios.get(`${host}/api/order/allorders`)
    setOrder(data)
  }

  useEffect(() => {
    getOrders()

    // eslint-disable-next-line
  }, [order])

  const handleClick = async (id) => {
    await axios.put(`${host}/api/order/verifyorderpayment/${id}`)
  }



  return (
    <>
      <div className='container my-3'>
        <div className='row'>
          <div className='col-md-12'>
            <h1 className='text-center mb-4'>Order Payments</h1>
            <table className='table' width={'90%'}>
              <thead>
                <tr>
                  <th>Order Id</th>
                  <th>Order Amount</th>
                  <th>Paymet Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {order && order.map((item, ind) => {
                  return (
                    <tr key={ind}>
                      <td>{item._id}</td>
                      <td>{item.orderAmount}</td>
                      <td>
                        {
                          item.paymentStatus !== true ? (
                            <button className='btn btn-danger btn-sm'>
                              Not Verified
                            </button>
                          ) : (
                            <button className='btn btn-success btn-sm'>Verified</button>
                          )
                        }
                      </td>
                      <td>
                        {
                          item.paymentStatus !== true ? (
                            <button className='btn btn-primary btn-sm' onClick={() => { handleClick(item._id) }}>Click to verify</button>
                          ) : (
                            <button className='btn btn-success btn-sm'>Paid</button>
                          )
                        }
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </>
  )
}

export default Payments