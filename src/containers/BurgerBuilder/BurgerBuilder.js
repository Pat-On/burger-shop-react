import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Auxillary/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinnner/Spinner";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import axios from "../../axios-order";
//WOW he mentioned that it is going to automatically grab the index.js without pointing to it <LOL>
import * as actions from "../../store/actions/index";

// const INGREDIENTS_PRICES = {
//   salad: 0.5,
//   cheese: 0.4,
//   meat: 1.3,
//   bacon: 0.7,
// };

const BurgerBuilder = (props) => {
  //old version
  // constructor(props) {
  //   super(props);
  //   this.state = {...}
  // }

  const [purchasing, setPurchasing] = useState(false);
  //  state = {
  //   // ingredients: null,
  //   // totalPrice: 4,
  //   // purchasable: false,
  //   purchasing: false,
  //   // loading: false, //moved to the redux/funk
  // };
  useEffect(() => {
    props.onInitIngredients();
  }, []);
  // componentDidMount() {
  //   this.props.onInitIngredients();
  // }

  const updatePurchase = (ingredients) => {
    // const ingredients = { ...this.state.ingredients };
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  const purchaseHandler = () => {
    if (props.isAuthenticated) setPurchasing(true);
    if (!props.isAuthenticated) {
      props.onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    // const queryParams = [];
    // for (let i in this.state.ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(i) +
    //       "=" +
    //       encodeURIComponent(this.state.ingredients[i])
    //   );
    // }
    // queryParams.push("price=" + this.props.price);
    // const queryString = queryParams.join("&");
    props.onInitPurchase();
    props.history.push("/checkout");
  };

  const disabledInfo = {
    // ...this.state.ingredients,
    ...props.ings,
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;

  let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

  if (props.ings) {
    burger = (
      <Aux>
        <Burger ingredients={props.ings} />
        <BuildControls
          ingredientRemove={props.onIngredientRemove}
          ingredientAdded={props.onIngredientAdded}
          disabled={disabledInfo}
          price={props.price}
          purchasable={updatePurchase(props.ings)}
          ordered={purchaseHandler}
          isAuth={props.isAuthenticated}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        ingredients={props.ings}
        price={props.price}
        purchaseCancel={purchaseCancelHandler}
        purchaseContinue={purchaseContinueHandler}
      />
    );
  }
  // NOT REQUIRED HERE ANYMORE

  // if (this.state.loading) {
  //   orderSummary = <Spinner />;
  // }
  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};
const mapStateToProps = (state) => {
  return {
    // we have access to it via props
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemove: (ingName) =>
      dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));

// left as a reference

// addIngredientHandler = (type) => {
//   const oldCount = this.state.ingredients[type];
//   const updatedCount = oldCount + 1;
//   const updatedIngredients = {
//     ...this.state.ingredients,
//   };
//   updatedIngredients[type] = updatedCount;
//   const priceAddition = INGREDIENTS_PRICES[type];
//   const oldPrice = this.state.totalPrice;
//   const newPrice = oldPrice + priceAddition;

//   this.setState({
//     totalPrice: newPrice,
//     ingredients: updatedIngredients,
//   });
//   this.updatePurchase(updatedIngredients);
// };

// removeIngredientHandler = (type) => {
//   const oldCount = this.state.ingredients[type];
//   if (oldCount <= 0) return;
//   const updatedCount = oldCount - 1;
//   const updatedIngredients = {
//     ...this.state.ingredients,
//   };
//   updatedIngredients[type] = updatedCount;
//   const priceAddition = INGREDIENTS_PRICES[type];
//   const oldPrice = this.state.totalPrice;
//   const newPrice = oldPrice - priceAddition;

//   this.setState({
//     totalPrice: newPrice,
//     ingredients: updatedIngredients,
//   });
//   this.updatePurchase(updatedIngredients);
// };
