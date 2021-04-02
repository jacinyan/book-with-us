import React, { useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../redux/actions/cartActions'

import Error from '../components/Error'

const CartPage = ({ match, location, history }) => {
    const itemId = match.params.id

    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    console.log(cart);
    const { cartItems } = cart

    useEffect(() => {
        if (itemId) {
            dispatch(addToCart(itemId, qty))
        }

    }, [dispatch, itemId, qty])

    return (
        <section className="py-6">
            <div className="container">
                <h1 className="mb-5">Shopping Cart</h1>
                {cartItems.map(cartItem =>
                    <Fragment key={cartItem.item}>
                        <div className="columns is-vcentered is-multiline">
                            <div className="column is-1 ">
                                <span >x</span>
                            </div>
                            <div className="column is-3 ">
                                <img src={cartItem.image} alt={cartItem.name} width="150" />
                            </div>
                            <div className="column is-2">
                                {cartItem.name}
                            </div>
                            <div className="column is-2">
                                <span className="price">${cartItem.price}</span>
                            </div>
                            <div className="column is-2">
                                <input
                                    type="number"
                                    defaultValue={cartItem.qty}
                                    min={1}
                                />
                            </div>
                            <div className="column is-2">
                                <span>${cartItem.qty * cartItem.price}</span>
                            </div>
                        </div>
                    </Fragment>
                )}
            </div>
        </section>
    )
}


export default CartPage
