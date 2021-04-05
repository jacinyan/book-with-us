import React, { useState } from "react";
import { Link } from "react-router-dom";

const Shipping = ({ location, history }) => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const redirect = location.search
    ? new URLSearchParams(location.search).get("redirect")
    : "";

  return (
    <section className="hero is-fullheight-with-navbar">
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="columns">
            <div className="column is-8 is-offset-2">
              <h2 className="title">Shipping</h2>
              <hr className="login-hr" />
              <div className="box has-shadow">
                <form>
                  <div className="field">
                    <div className="control has-icons-left">
                      <input
                        className="input"
                        type="text"
                        placeholder="Address"
                        autoFocus=""
                        value={address}
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
                        onChange={(e) => setPostalCode(e.target.value)}
                      />
                      <span className="icon is-small is-left">
                      <i class="fas fa-mail-bulk"></i>
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
                        onChange={(e) => setCountry(e.target.value)}
                      />
                      <span className="icon is-small is-left">
                      <i class="fas fa-globe"></i>
                      </span>
                    </div>
                  </div>
                  <button className="button is-block is-primary">
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
