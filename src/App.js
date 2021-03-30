import { Redirect, Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './components/Layout'
import Home from "./pages/Home";
import BookPage from "./pages/BookPage";
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <>
      <ToastContainer />
      <Layout>
        <Switch>
          <Route path='/' exact render={props => <Home {...props} />} />
          <Route path='/books/:id' render={props => <BookPage {...props} />} />
          <Route path='/login' render={props => <Login {...props} />} />
          <Route path='/register' render={props => <Register {...props} />} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </>
  );
}

export default App;
