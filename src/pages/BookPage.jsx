import React, { useState, useEffect } from 'react'
import { Link} from 'react-router-dom'
import Rating from '../components/Rating'
import axios from 'axios'

const BookPage = ({ match }) => {
    // book id matches the match object from props
    // const book = books.find(book => book._id === match.params.id)
    const [book, setBook] = useState({})

    useEffect(() => {
        const fetchBook = async () => {
            const bookId = match.params.id
            const { data } = await axios.get(process.env.REACT_APP_API + `/books/${bookId}`)
            setBook(data);   
        }

        fetchBook()

    }, [match])

    return (
        <div className="py-6">
            <div className="container">
                <Link className="button is-light my-3 " to="/">Go Back</Link>

                <div className="columns is-multiline">
                    <div className="column has-text-centered is-6-tablet is-5-desktop ">
                        <img src={book.image} alt={book.name} style={{ maxHeight: "75vh" }} />
                    </div>
                    <div className="column is-8-mobile is-offset-2-mobile is-6-tablet is-4-desktop">
                        <ul className="content">
                            <li>
                                <h3>{book.name}</h3>
                            </li>
                            <li>
                                <Rating value={book.rating} text={`${book.numReviews} reviews`} color='#f8d125' />
                            </li>
                            <li>
                                Price: ${book.price}
                            </li>
                            <li>
                                Description: {book.description}
                            </li>
                        </ul>
                    </div>
                    <div className="column is-8-mobile is-offset-2-mobile is-6-tablet is-3-desktop">
                        <div className="card">
                            <div className="card-content">
                                <p className="title is-6">
                                    Status
                                </p>
                                <p className="subtitle is-6">
                                    {book.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                </p>
                            </div>
                            <footer className="card-footer pb-0 ">
                                <button
                                    className="card-footer-item button py-3 has-background-primary has-text-white"
                                    disabled={book.countInStock === 0}
                                >
                                    <strong>Add to Cart</strong>
                                </button>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookPage
