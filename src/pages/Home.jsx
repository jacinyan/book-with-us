import React, { Fragment } from 'react'
// import { useSelector } from 'react-redux'
import books from '../books'
import Book from '../components/Book'

const Home = () => {

    return (
        <div className="py-6">
            <div className="container">
                <h1 className="mb-5">New Arrivals</h1>
                <div className="columns is-multiline is-vcentered is-mobile">
                    {books.map(book =>
                    <Fragment key={book._id}>
                        <div className="column is-half-mobile is-one-third-tablet is-one-quarter-desktop">
                            <Book book={book} />
                        </div>
                    </Fragment>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home
