import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "../hooks/useForm";
import { useFetchState } from "../hooks/useFetchState";
import { Link } from "react-router-dom";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

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

  const [panelOpen, setPanelOpen] = useFetchState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });

  const { state, handleChange, reset } = useForm({
    minPrice: "",
    maxPrice: "",
    genre: "",
    rating: "",
  });

  useEffect(() => {
    if (state.minPrice || state.maxPrice || state.genre || state.rating) {
      const timer = setTimeout(() => {
        dispatch(
          listItems(
            keyword,
            pageNumber,
            state.minPrice,
            state.maxPrice,
            state.genre,
            state.rating
          )
        );
      }, 800);
      return () => {
        clearTimeout(timer);
      };
    }
    dispatch(listItems(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber, state]);

  return (
    <>
      <Meta />
      <section className="py-6">
        {!keyword && !panelOpen.isPaneOpenLeft && <Carousel />}
        <div className="container ">
          {keyword && (
            <Link className="button is-rounded is-light my-3" to="/">
              Go Back
            </Link>
          )}
          <div style={{ marginTop: "32px" }}>
            <button onClick={() => setPanelOpen({ isPaneOpenLeft: true })}>
              Click me to open left pane with 20% width!
            </button>
          </div>
          <SlidingPane
            closeIcon={<div>Some div containing custom close icon.</div>}
            isOpen={panelOpen.isPaneOpenLeft}
            title="Hey, it is optional pane title.  I can be React component too."
            from="left"
            width="200px"
            onRequestClose={() => setPanelOpen({ isPaneOpenLeft: false })}
          >
            <Filter state={state} handleChange={handleChange} reset={reset} />
          </SlidingPane>
          {loading ? (
            <Loader />
          ) : error ? (
            <Error />
          ) : (
            <div className="columns is-multiline is-vcentered">
              {items.map((item) => (
                <Fragment key={item._id}>
                  <div className="column is-8-mobile is-offset-2-mobile is-one-third-tablet is-one-quarter-desktop">
                    <ItemCard item={item} />
                  </div>
                </Fragment>
              ))}
            </div>
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
