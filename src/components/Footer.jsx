import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {

    return (
        <footer className="footer has-background-primary has-text-white">
            <div className="container is-fluid">
                <div className="columns is-mobile">
                    <div className="column">
                        <p>Copyright @ BooksRUs</p>
                    </div>
                    <div className="column has-text-right">
                        <Link to="#" className="has-text-white">
                            <i className="fab fa-facebook"></i>
                        </Link>
                        <Link to="#" className="has-text-white">
                            <i className="fab fa-twitter"></i>
                        </Link>
                        <Link to="#" className="has-text-white">
                            <i className="fab fa-linkedin"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
