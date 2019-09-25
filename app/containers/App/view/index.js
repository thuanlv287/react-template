import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import "@blueprintjs/core/lib/css/blueprint.css";
import routes from '../../../routes';
import LayoutView from '../../Layout';
import Login from '../../../screens/Login/view/Hook';

/**
 * 
 * @param {Component} Component specific component render
 * @param {rest} rest the rest properties
 */
const AdminRoute = ({ Component, ...rest }) => (
  <Route
    {...rest}
    render={
      props => (
        // isAuthenticated() ?
        true ?
          (
            <LayoutView>
              <Component {...props} />
            </LayoutView>
          )
          :
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )
    }
  />
)

const App = () => (
  <Router>
    <Switch>
      {
        routes && routes.map(route => (
          <AdminRoute
            key={route.path}
            path={route.path}
            Component={route.component}
          />
        ))
      }
      <Route exact path='/' component={Login} />
      <Route exact path='/login' component={Login} />
      <Route exact path='*' component={() => (<h1>404 Not found</h1>)} />
    </Switch>
  </Router>
)
export default App;