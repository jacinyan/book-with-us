import React from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Item = ({ item }) => {
    return (
        <div className="card">
            <div className="card-image has-text-centered" >
                <figure className="pt-4">
                    <Link to={`/items/${item._id}`}>
                        <img src={item.image} alt="" style={{ maxHeight: 220 }} />
                    </Link>
                </figure>
            </div>
            <div className="card-content">
                <div className="content ">
                    <p className="title is-6 ">
                        <Link to={`/items/${item._id}`} className="has-text-primary">
                            {item.name}
                        </Link>
                    </p>
                </div>
                <div className="content is-small">
                    <Rating
                        value={item.rating}
                        text={`${item.numReviews} reviews`}
                        color='#f8d125'
                    />
                </div>
                <div className="content is-medium">
                    ${item.price}
                </div>
            </div>
        </div>

    )
}

export default Item
