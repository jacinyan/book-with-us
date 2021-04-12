import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {addDecimals} from '../utils/addDecimals'

import { listItems, deleteItem } from "../redux/actions/itemActions";

import Loader from "../components/Loader";
import Error from "../components/Error";

const ItemsList = ({ history, match }) => {
  const dispatch = useDispatch();

  const itemsList = useSelector((state) => state.itemsList);
  const { loading, error, items } = itemsList;

  const itemDelete = useSelector((state) => state.itemDelete);
  const { success } = itemDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listItems());
    } else {
      history.push('/')
    }
  }, [dispatch, history, userInfo, success]);

  const handleDeleteItem = (id) => {
    if (window.confirm("Are you sure")) {
        dispatch(deleteItem(id));
    }
  };

  const handleCreateItem = (item) => {
      // create item
  }

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
                <button className="button is-rounded has-text-primary is-light " onClick={handleCreateItem}><i className="fas fa-plus"></i>&nbsp;&nbsp;Create Item</button>
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
                      <td>
                        ${addDecimals(item.price)}
                      </td>
                      <td>
                        {item.genre}
                      </td>
                      <td>
                        {item.author}
                      </td>
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
      </div>
    </section>
  );
};

export default ItemsList;
