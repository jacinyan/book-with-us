import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import ItemPage from "./pages/ItemPage";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Shipping from "./pages/Shipping";

function App() {
  // console.count('App rendered');
  return (
    <>
      <ToastContainer />
      <Layout>
        <Switch>
          <Route path="/" exact render={(props) => <Home {...props} />} />
          <Route
            path="/items/:id"
            render={(props) => <ItemPage {...props} />}
          />
          <Route path="/cart" render={(props) => <CartPage {...props} />} />
          <Route path="/login" render={(props) => <Login {...props} />} />
          <Route path="/register" render={(props) => <Register {...props} />} />
          <Route path="/profile" render={(props) => <Profile {...props} />} />
          <Route path="/shipping" render={(props) => <Shipping {...props} />} />
          {/* <Redirect to="/" /> */}
        </Switch>
      </Layout>
    </>
  );
}

export default App;
