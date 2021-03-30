import React, { Fragment } from 'react'
// import { useSelector } from 'react-redux'
import books from '../books'
import Book from '../components/Book'

const Home = () => {

    return (
        <section className="py-6">
            <div className="container is-fluid">
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
        </section>
    )
}

export default Home
