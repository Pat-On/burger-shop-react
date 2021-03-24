import React, { Component } from "react";

import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "../../containers/Checkout/ContactData/ContactData";

class Checkout extends Component {
  // state = {
  //   ingredients: null,
  //   price: 0,
  // };
  // we have it all in componentDidMount not in componentDidUpdate so
  // the last render is going to stay - burger - it is not going to overwrite because set was set up
  // componentDidMount is not going to run because of that we added the new element

  // componentWillMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price = 0;
  //   for (let param of query.entries()) {
  //     if (param[0] === "price") {
  //       price = param[1];
  //       console.log(price);
  //     } else {
  //       // ["item", quantity]

  //       ingredients[param[0]] = +param[1];
  //     }
  //   }
  //   this.setState({ ingredients: ingredients, totalPrice: price });
  // }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        {/* temporary dummy data */}
        <CheckoutSummary
          ingredients={this.props.ings}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinueHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
          // component={ContactData}
          //manual rendering the <ContactData /> so basically
          // we can just pass something to it
          // render={(props) => (
          // <ContactData
          //   price={this.props.price}
          //   ingredients={this.props.ingredients}
          //   {...props} //it will include the history object so the push inside th
          //   //contact data should work as well
          // />
          // )}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};

export default connect(mapStateToProps)(Checkout);
