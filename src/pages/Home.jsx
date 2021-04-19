import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { listItems } from "../redux/actions/itemActions";

import ItemCard from "../components/ItemCard";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Pagination from "../components/Pagination";

const Home = ({ match }) => {
  const dispatch = useDispatch();

  const itemsList = useSelector((state) => state.itemsList);
  const { loading, error, items, page, pages } = itemsList;

  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1

  useEffect(() => {
    dispatch(listItems(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

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
            <div className="columns is-multiline is-vcentered">
              {items.map((item) => (
                <Fragment key={item._id}>
                  <div className="column is-8-mobile is-offset-2-mobile is-one-third-tablet is-one-quarter-desktop">
                    <ItemCard item={item} />
                  </div>
                </Fragment>
              ))}
            </div>
            
          </>
        )}
        
      </div>
      <Pagination pages={pages} page={page} keyword={keyword ? keyword : ''}/>
    </section>
  );
};

export default Home;
