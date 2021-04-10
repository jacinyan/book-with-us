import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/Home";
import ItemPage from "./pages/ItemPage";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import OrderPage from "./pages/OrderPage";
import UserList from "./pages/UserList";

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
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/shipping" component={Shipping} />
          <PrivateRoute path="/payment" component={Payment} />
          <PrivateRoute path="/place-order" component={PlaceOrder} />
          <PrivateRoute path="/orders/:id" component={OrderPage} />
          <PrivateRoute path="/admin/user-list" component={UserList} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </>
  );
}

export default App;
