import { Redirect, Route, Switch } from 'react-router-dom'
import Layout from './components/Layout'
import Home from "./pages/Home";
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact render={props => <Home {...props} />} />
        <Route path='/login' render={props => <Login {...props} />} />
        <Route path='/register' render={props => <Register {...props} />} />
        <Redirect to="/" />
      </Switch>
    </Layout>
  );
}

export default App;
