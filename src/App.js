//routing
import React, { Component } from "react";
import { connect } from "react-redux";

//routing
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import asyncComponent from "./hoc/asyncComponent/asyncComponent";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
// import Checkout from "./containers/Checkout/Checkout";
// import Orders from "./containers/Orders/Orders";
// import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/logout/Logout";

import * as actions from "./store/actions/index";
//routing

const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/Checkout");
});
const asyncOrders = asyncComponent(() => {
  return import("./containers/Orders/Orders");
});
const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    //guarding the  sections

    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      // Layout provide the menu to the phone version
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}
// testing the unmount inside the
// class App extends React.Component {
//   state = {
//     show: true,
//   };

//   componentDidMount() {
//     setTimeout(() => {
//       this.setState({ show: false });
//     }, 5000);
//   }

//   render() {
//     return (
//       <div>
//         <Layout>{this.state.show ? <BurgerBuilder /> : null}</Layout>
//       </div>
//     );
//   }
// }

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

//I had not the error with connect here, but if it would happen  i can fix it by implementic HOC withRouter
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
