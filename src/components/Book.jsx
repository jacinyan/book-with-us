import React from 'react'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'

const Book = ({ book }) => {
    return (
        <div className="card">
            <div className="card-image has-text-centered" >
                <figure className="pt-4">
                    <Link to={`/books/${book._id}`}>
                        <img src={book.image} alt="" style={{ maxHeight: 220 }} />
                    </Link>
                </figure>
            </div>
            <div className="card-content">
                <Link to={`/books/${book._id}`}>
                    <div className="content">
                        <p className="title is-6">{book.name}</p>
                    </div>
                </Link>
                <div className="content is-small pt-3 ">
                        <Rating 
                            value={book.rating} 
                            text={`${book.numReviews} reviews`}
                        />
                </div>
                <div className="content is-medium">
                    ${book.price}
                </div>
            </div>
        </div>

    )
}

export default Book
