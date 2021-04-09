import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { listItems } from "../redux/actions/itemActions";

import Item from "../components/Item";
import Loader from "../components/Loader";
import Error from "../components/Error";

const Home = () => {
  const dispatch = useDispatch();
  const itemsList = useSelector((state) => state.itemsList);
  const { loading, error, items } = itemsList;

  useEffect(() => {
    dispatch(listItems());
  }, [dispatch]);
  
  return (
    <section className="py-6">
      <div className="container ">
        {loading ? (
          <Loader />
        ) : error ? (
          <Error />
        ) : (
          <>
            <h1 className="mb-5 title hr">New Arrivals</h1>
            <div className="columns is-multiline is-vcentered is-mobile">
              {items.map((item) => (
                <Fragment key={item._id}>
                  <div className="column is-half-mobile is-one-third-tablet is-one-quarter-desktop">
                    <Item item={item} />
                  </div>
                </Fragment>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
