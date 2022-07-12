import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Navbar from "./components/Sidebar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Producto from "./pages/Producto";
import 'antd/dist/antd.css';
import './App.less';

function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      setAuth(true);
    }
  }, []);

  return (
    <Router>
      <div className="c c-main">
        <Navbar setAuth={setAuth} auth={auth} />
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login" auth={auth}>
            <Login setAuth={setAuth} auth={auth} />
          </Route>
          <React.Fragment>
            <div className="c-content">
              <div className="container">
                <PrivateRoute exact path="/inicio" component={Home} auth={auth} />
                <PrivateRoute
                  exact
                  path="/producto"
                  component={Producto}
                  auth={auth}
                />
              </div>
            </div>
          </React.Fragment>
          <Route path="*" component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
}

const PrivateRoute = ({ auth, component: Component, ...rest }) => {
  useEffect(() => {
  }, [])
  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? <Component {...props} /> : <Redirect to={{ pathname: "/" }} />
      }
    />
  );
};

function PageNotFound() {
  return <h1>Page Not Found 404</h1>;
}

export default App;
