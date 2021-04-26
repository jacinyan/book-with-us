import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "../hooks/useForm";
import { useFetchState } from "../hooks/useFetchState";
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
  const { loading, error, items, pages, page } = itemsList;

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
      }, 700);
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
        {!keyword && !panelOpen.isPaneOpenLeft && items.length !== 0 && (
          <Carousel />
        )}
        <div className="container ">
          {!panelOpen.isPaneOpenLeft && (
            <p
              className="toggle-panel"
              onClick={() => setPanelOpen({ isPaneOpenLeft: true })}
            >
              Advanced
            </p>
          )}
          <SlidingPane
            closeIcon={<div>Some div containing custom close icon.</div>}
            isOpen={panelOpen.isPaneOpenLeft}
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
          ) : items.length === 0 ? (
            <>
              <h3 className="title">Oops, nothing shows up...</h3>
              <p className="subtitle">You may try either:</p>
              <ul>
                <li>a. enter other keywords in the search box</li>
                <li>b. refine or reset your conditions in the filter</li>
              </ul>
            </>
          ) : (
            <>
              <div className="columns is-multiline is-vcentered">
                {items.map((item) => (
                  <Fragment key={item._id}>
                    <div className="column is-8-mobile is-offset-2-mobile is-one-third-tablet is-one-quarter-desktop">
                      <ItemCard item={item} />
                    </div>
                  </Fragment>
                ))}
              </div>
              <Pagination
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ""}
              />
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
