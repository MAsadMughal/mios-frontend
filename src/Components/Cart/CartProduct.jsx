import { useState, useContext, useEffect } from 'react';
import ProductContext from "../../context/Product/ProductContext";
import UserContext from '../../context/User/UserContext';


export const CartProduct = ({ Data }) => {

    const context = useContext(ProductContext);
    const { removeCartProduct, updateCartProductQty } = context;
    const [Qty, setQty] = useState(Data.quantity);
    const [currPrice, setCurrPrice] = useState(0);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user.isAdmin === false) {
            if (user.role === "wholeseller") {
                if (Data.product.onSale) {
                    setCurrPrice(Data.product.discountedPriceW)
                } else {
                    setCurrPrice(Data.product.wholesalePrice)
                }
            } else if (user.role === "dropshipper") {
                if (Data.product.onSale) {
                    setCurrPrice(Data.product.discountedPriceD)
                } else {
                    setCurrPrice(Data.product.dropshipperPrice)
                }
            }
        }
    }, [])// eslint-disable-line react-hooks/exhaustive-deps


    useEffect(() => {
        if (Qty >= 1) {
            updateCartProductQty(Data.product._id, Qty);
        }
    }, [Qty])// eslint-disable-line react-hooks/exhaustive-deps

    const addOne = (id) => {
        setQty(Qty + 1);
    }

    const minusOne = (id) => {
        setQty(Qty - 1);
        //if Qty is less than 1, set Qty to 1
        if (Qty <= 1) {
            setQty(1);
        }
    }

    const handleRemove = (id) => {
        removeCartProduct(id);
    }

    const handleChange = (e) => {
        const newQty = parseInt(e.target.value);
        if (!isNaN(newQty)) {
            setQty(newQty);
            // updateProductQty(Data.product._id, newQty)
        } else {
            setQty(0);
        }
    }

    return (
        <>

            {/* {
                        price = Data.product.disQtyedPrice ? Data.product.disQtyedPrice : Data.product.wholesalePrice
                        price = price * Qty} */}

            <tr >
                <th scope="row">
                    <img src={Data.product.photo?.url || "https://i.imgur.com/xdbHo4E.png"} style={{ height: "145px", width: "110px", maxHeight: '110px', maxWidth: '110px' }} alt={Data.product.title} />
                </th>

                <td>
                    <p style={{ fontSize: "15px", fontWeight: "bold", lineHeight: "30px" }}>{Data.product.title}</p>
                </td>

                <td>
                    <p style={{ fontWeight: "bold", fontSize: "20px" }}>Rs. {currPrice && currPrice}</p>
                </td>

                <td className='d-flex justify-content-between'>
                    <div>
                        <button style={{ border: "1px solid lightgrey" }} onClick={minusOne}>
                            -
                        </button>
                        <input style={{ border: "1px solid lightgrey", width: "40px", background: "white", }} value={Qty} type="number" onChange={handleChange} name="quantity" min="1" />

                        <button style={{ border: "1px solid lightgrey" }} onClick={addOne}>
                            +
                        </button>
                    </div>
                    <div>
                        <button style={{ border: "1px solid lightgrey" }} onClick={() => handleRemove(Data.product._id)}>
                            X
                        </button>
                    </div>
                </td>

                <td>
                    <p style={{ fontWeight: "bold", fontSize: "20px" }}>Rs. {currPrice * Qty}</p>
                </td>
            </tr>



        </>
    )
}