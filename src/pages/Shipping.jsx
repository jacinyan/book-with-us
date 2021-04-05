import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../redux/actions/cartActions";
import CheckoutSteps from '../components/CheckoutSteps'

const Shipping = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment")
  };

  return (
    <section className="hero is-fullheight-with-navbar">
      <div className="hero-body">
        <div className="container has-text-centered">
          <CheckoutSteps step1 step2 />
          <div className="columns">
            <div className="column is-8 is-offset-2">
              <h2 className="title">Shipping</h2>
              <hr className="login-hr" />
              <div className="box has-shadow">
                <form onSubmit={handleSubmit}>
                  <div className="field">
                    <div className="control has-icons-left">
                      <input
                        className="input"
                        type="text"
                        placeholder="Address"
                        autoFocus=""
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-home"></i>
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <div className="control has-icons-left">
                      <input
                        className="input "
                        type="text"
                        placeholder="City"
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-city"></i>
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <div className="control has-icons-left">
                      <input
                        className="input "
                        type="text"
                        placeholder="Postal Code"
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-mail-bulk"></i>
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <div className="control has-icons-left">
                      <input
                        className="input "
                        type="text"
                        placeholder="Country"
                        value={country}
                        required
                        onChange={(e) => setCountry(e.target.value)}
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-globe"></i>
                      </span>
                    </div>
                  </div>
                  <button className="button is-block is-primary is-fullwidth">
                    <strong>Continue</strong>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shipping;
