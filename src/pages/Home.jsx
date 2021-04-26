import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "../hooks/useForm";

import { listItems } from "../redux/actions/itemActions";

import ItemCard from "../components/ItemCard";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Pagination from "../components/Pagination";
import Carousel from "../components/Carousel/index";
import Filter from "../components/Filter";
import Meta from "../components/Meta";

const Home = ({ match }) => {
  const dispatch = useDispatch();

  const itemsList = useSelector((state) => state.itemsList);
  const { loading, error, items, page, pages } = itemsList;

  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const { state, handleChange, reset } = useForm({
    minPrice: "",
    maxPrice: "",
    genre: "",
    rating: ""
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(
        listItems(
          keyword,
          pageNumber,
          state.minPrice,
          state.maxPrice,
          state.genre,
          state.rating,
        )
      );
    }, 1100);
    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, keyword, pageNumber, state]);

  return (
    <>
      <Meta />
      <section className="py-6">
        {!keyword && <Carousel />}
        <div className="container ">
          {keyword && (
            <Link className="button is-rounded is-light my-3" to="/">
              Go Back
            </Link>
          )}
          {loading ? (
            <Loader />
          ) : error ? (
            <Error />
          ) : (
            <>
              <section>
                <Filter state={state} handleChange={handleChange} reset={reset}/>
              </section>
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
          <Pagination
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </div>
      </section>
    </>
  );
};

export default Home;
