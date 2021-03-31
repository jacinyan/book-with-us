import axios from 'axios'
import React, { Fragment, useState, useEffect } from 'react'
// import { useSelector } from 'react-redux'
import Book from '../components/Book'

const Home = () => {
    const [books, setBooks] = useState([])

    // 
    useEffect(() => {
      const fetchBooks =  async () => {
            const response = await axios.get(process.env.REACT_APP_API + '/books')
            const books = response.data;
            setBooks(books)
        }
        
        fetchBooks()
    }, [])

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
