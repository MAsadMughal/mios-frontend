import React, { useContext, useEffect } from 'react'
import ProductContext from '../../context/Product/ProductContext';
import UserContext from '../../context/User/UserContext';
import "./Dashboard.css";


const Dashboard = () => {
  const { getAndSetUsers } = useContext(UserContext)
  const { getCategories, getProducts } = useContext(ProductContext)
  useEffect(() => {
    const getCustomers = async () => {
      await getAndSetUsers();
      await getCategories();
      getProducts();
    }
    getCustomers();
  }, [])// eslint-disable-line react-hooks/exhaustive-deps


  return (
    <>
      <div className='main'>
        <div className='container-fluid'>
          <div className='page-heading'>Today's Summary</div>
          <div className="">
            <div className="row align-items-stretch">
              <div className="c-dashboardInfo col-lg-3 col-md-6">
                <div className="wrap">
                  <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Total Orders<svg
                    className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                    </path>
                  </svg></h4><span className="hind-font caption-12 c-dashboardInfo__count">0</span>
                </div>
              </div>
              <div className="c-dashboardInfo col-lg-3 col-md-6">
                <div className="wrap">
                  <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Total Unit Orders<svg
                    className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                    </path>
                  </svg></h4><span className="hind-font caption-12 c-dashboardInfo__count">0</span>
                  {/* <span className="hind-font caption-12 c-dashboardInfo__subInfo">Last month: PKR 30</span> */}
                </div>
              </div>
              <div className="c-dashboardInfo col-lg-3 col-md-6">
                <div className="wrap">
                  <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Ordered Sale<svg
                    className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                    </path>
                  </svg></h4><span className="hind-font caption-12 c-dashboardInfo__count">0</span>
                </div>
              </div>
              <div className="c-dashboardInfo col-lg-3 col-md-6">
                <div className="wrap">
                  <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Company Profit<svg
                    className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                    </path>
                  </svg></h4><span className="hind-font caption-12 c-dashboardInfo__count">0</span>
                </div>
              </div>
            </div>
            <div className="row align-items-stretch">
              <div className="c-dashboardInfo col-lg-4 col-md-6">
                <div className="wrap">
                  <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Return Orders<svg
                    className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                    </path>
                  </svg></h4><span className="hind-font caption-12 c-dashboardInfo__count">0</span>
                </div>
              </div>
              <div className="c-dashboardInfo col-lg-4 col-md-6">
                <div className="wrap">
                  <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Delivered Orders<svg
                    className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                    </path>
                  </svg></h4><span className="hind-font caption-12 c-dashboardInfo__count">0</span>
                  {/* <span className="hind-font caption-12 c-dashboardInfo__subInfo">Last month: PKR 30</span> */}
                </div>
              </div>
              <div className="c-dashboardInfo col-lg-4 col-md-6">
                <div className="wrap">
                  <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Pending Orders<svg
                    className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                    </path>
                  </svg></h4><span className="hind-font caption-12 c-dashboardInfo__count">0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
