import React from 'react'

const Loader = () => {
    return (
        <section className="section">
            <div className="container">
                <div className="columns is-vcentered">
                    <div className="column is-6 is-offset-3 ">
                        <div className="loader-wrapper is-active">
                            <div className="loader is-loading"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Loader
