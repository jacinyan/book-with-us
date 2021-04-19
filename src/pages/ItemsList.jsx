import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addDecimals } from "../utils/addDecimals";

import {
  listItems,
  deleteItem,
  createItem,
} from "../redux/actions/itemActions";
import { ITEM_CREATE_RESET } from "../redux/constants/itemConstants";

import Loader from "../components/Loader";
import Error from "../components/Error";
import Pagination from "../components/Pagination";

const ItemsList = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch();

  const itemsList = useSelector((state) => state.itemsList);
  const { loading, error, items, page, pages } = itemsList;

  const itemDelete = useSelector((state) => state.itemDelete);
  const { success: successDelete } = itemDelete;

  const itemCreate = useSelector((state) => state.itemCreate);
  const { success: successCreate, item: createdItem } = itemCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  useEffect(() => {
    // console.log("before ITEM_CREATE_RESET");
    dispatch({ type: ITEM_CREATE_RESET });
    if (!userInfo.isAdmin) {
      history.push("/");
    }

    if (successCreate) {
      history.push(`/admin/items/${createdItem._id}/edit`);
    } else {
      dispatch(listItems("", pageNumber));
    }
    //successDelete added to trigger useEffect
  }, [dispatch, history, userInfo, successDelete, successCreate, createdItem, pageNumber]);

  const handleDeleteItem = (id) => {
    // console.log('Item delete handler');
    if (window.confirm("Are you sure")) {
      dispatch(deleteItem(id));
    }
  };

  const handleCreateItem = () => {
    // console.log('Item create handler');
    dispatch(createItem());
  };

  return (
    <section className="py-6">
      <div className="container is-max-widescreen">
        {loading ? (
          <Loader />
        ) : error ? (
          <Error />
        ) : (
          <>
            <div className="columns">
              <div className="column">
                <h1 className="mb-5 title hr">Items</h1>
              </div>
              <div className="column has-text-right">
                <button
                  className="button is-rounded has-text-primary is-light "
                  onClick={handleCreateItem}
                >
                  <i className="fas fa-plus"></i>&nbsp;&nbsp;Create Item
                </button>
              </div>
            </div>
            <div className="table-container">
              <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>GENRE</th>
                    <th>AUTHOR</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td>{item.name}</td>
                      <td>${addDecimals(item.price)}</td>
                      <td>{item.genre}</td>
                      <td>{item.author}</td>
                      <td>
                        <Link to={`/admin/items/${item._id}/edit`}>
                          <button className="button is-rounded is-light is-small">
                            <i className="fas fa-edit"></i>
                          </button>
                        </Link>
                        <button
                          className="button is-rounded is-danger is-small"
                          onClick={() => {
                            handleDeleteItem(item._id);
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        <Pagination pages={pages} page={page} isAdmin={true} />
      </div>
    </section>
  );
};

export default ItemsList;
