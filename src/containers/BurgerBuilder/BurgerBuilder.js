import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Auxillary/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinnner/Spinner";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import axios from "../../axios-order";
import * as actionTypes from "../../store/actions";

// const INGREDIENTS_PRICES = {
//   salad: 0.5,
//   cheese: 0.4,
//   meat: 1.3,
//   bacon: 0.7,
// };

class BurgerBuilder extends Component {
  //old version
  // constructor(props) {
  //   super(props);
  //   this.state = {...}
  // }

  state = {
    // ingredients: null,
    // totalPrice: 4,
    // purchasable: false,
    purchasing: false,
    loading: false,
  };

  componentDidMount() {
    // axios
    //   .get(
    //     "https://react-my-burger-6df65-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json"
    //   )
    //   .then((response) => this.setState({ ingredients: response.data }));
  }

  updatePurchase(ingredients) {
    // const ingredients = { ...this.state.ingredients };
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push("price=" + this.props.price);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  render() {
    const disabledInfo = {
      // ...this.state.ingredients,
      ...this.props.ings,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = <Spinner />;
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientRemove={this.props.onIngredientRemove}
            ingredientAdded={this.props.onIngredientAdded}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchase(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price}
          purchaseCancel={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    // we have access to it via props
    ings: state.ingredients,
    price: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName,
      }),
    onIngredientRemove: (ingName) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName,
      }),
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
