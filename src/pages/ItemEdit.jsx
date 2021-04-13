import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { listItemDetails } from "../redux/actions/itemActions";

import Loader from "../components/Loader";
import Error from "../components/Error";

const ItemEdit = ({ history, match }) => {
  const itemId = match.params.id;

  const dispatch = useDispatch();

  const itemDetails = useSelector((state) => state.itemDetails);
  const { loading, error, item } = itemDetails;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [genre, setGenre] = useState(false);
  const [author, setAuthor] = useState(false);
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState(false);

  useEffect(() => {
    if (!item.name || item._id !== itemId) {
      dispatch(listItemDetails(itemId));
    } else {
      setName(item.name);
      setPrice(item.price);
      setGenre(item.genre);
      setAuthor(item.author);
      setImage(item.image);
      setCountInStock(item.countInStock);
      setDescription(item.description);
    }
  }, [dispatch, item, itemId, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // update item
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <section className="hero is-fullheight-with-navbar">
          <div className="hero-body">
            <div className="container is-max-desktop has-text-centered">
              <div className="columns">
                <div className="column is-8 is-offset-2">
                  <h2 className="mb-4 title">Edit Item</h2>
                  <hr className="login-hr" />
                  <div className="box has-shadow">
                    <form onSubmit={handleSubmit}>
                      <div className="field">
                        <div className="control has-icons-left">
                          <input
                            className="input"
                            type="text"
                            placeholder="Name"
                            autoFocus=""
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                          <span className="icon is-small is-left">
                            <i className="fas fa-signature"></i>
                          </span>
                        </div>
                      </div>
                      <div className="field">
                        <div className="control has-icons-left">
                          <input
                            className="input"
                            type="number"
                            placeholder="Price"
                            autoFocus=""
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                          />

                          <span className="icon is-small is-left">
                            <i className="fas fa-dollar-sign"></i>
                          </span>
                        </div>
                      </div>
                      <div className="field">
                        <div className="control has-icons-left">
                          <input
                            className="input "
                            type="text"
                            placeholder="Genre"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                          />
                          <span className="icon is-small is-left">
                            <i className="fas fa-book"></i>
                          </span>
                        </div>
                      </div>
                      <div className="field">
                        <div className="control has-icons-left">
                          <input
                            className="input "
                            type="text"
                            placeholder="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                          />
                          <span className="icon is-small is-left">
                            <i className="fas fa-at"></i>
                          </span>
                        </div>
                      </div>
                      <div className="field">
                        <div className="control has-icons-left">
                          <input
                            className="input "
                            type="number"
                            placeholder="Count In Stock"
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                          />
                          <span className="icon is-small is-left">
                            <i className="fas fa-sort-numeric-down-alt"></i>
                          </span>
                        </div>
                      </div>

                      <div className="field">
                        <div className="control has-icons-left">
                          <input
                            className="input "
                            type="text"
                            placeholder="Image"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                          />
                          <span className="icon is-small is-left">
                            <i className="fas fa-images"></i>
                          </span>
                        </div>
                      </div>
                      <div className="field">
                        <div className="control">
                          <textarea
                            class="textarea"
                            placeholder='Description...'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          ></textarea>
                        </div>
                      </div>

                      <div className="field is-grouped is-grouped-right">
                        <p className="control">
                          <button className="button is-rounded  is-primary">
                            <strong>Update</strong>
                          </button>
                        </p>
                        <p className="control">
                          <Link
                            to="/admin/items-list"
                            className="button is-rounded is-light "
                          >
                            Go Back
                          </Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ItemEdit;
