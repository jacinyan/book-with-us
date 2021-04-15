import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/Home";
import ItemDetails from "./pages/ItemDetails";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import OrderDetails from "./pages/OrderDetails";
import UsersList from "./pages/UsersList";
import UserEdit from "./pages/UserEdit";
import ItemsList from "./pages/ItemsList";
import ItemEdit from "./pages/ItemEdit";
import OrdersList from "./pages/OrdersList";

function App() {
  // console.count('App rendered');
  return (
    <>
      <ToastContainer position="top-center"/>
      <Layout>
        <Switch>
          <Route path="/" exact render={(props) => <Home {...props} />} />
          <Route
            path="/items/:id"
            render={(props) => <ItemDetails {...props} />}
          />
          <Route path="/cart" render={(props) => <CartPage {...props} />} />
          <Route path="/login" render={(props) => <Login {...props} />} />
          <Route path="/register" render={(props) => <Register {...props} />} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/shipping" component={Shipping} />
          <PrivateRoute path="/payment" component={Payment} />
          <PrivateRoute path="/place-order" component={PlaceOrder} />
          <PrivateRoute path="/orders/:id" component={OrderDetails} />
          <PrivateRoute path="/admin/users-list" component={UsersList} />
          <PrivateRoute path="/admin/users/:id/edit" component={UserEdit} />
          <PrivateRoute path="/admin/items-list" exact component={ItemsList} />
          <PrivateRoute path="/admin/items/:id/edit" component={ItemEdit} />
          <PrivateRoute path="/admin/orders-list" component={OrdersList} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </>
  );
}

export default App;
