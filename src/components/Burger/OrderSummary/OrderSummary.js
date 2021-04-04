import React, { Component, useEffect } from "react";
import Aux from "../../../hoc/Auxillary/Auxillary";
import Button from "../../UI/Button/Button";

const OrderSummary = (props) => {
  // This could be a functional component, does not have to be a class - just for studies purpose.
  // componentDidUpdate() {
  //   console.log("[orderSummary] will update");
  // }

  useEffect(() => {
    console.log("[orderSummary] will update");
  }, []);

  const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {props.ingredients[igKey]}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: {props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCancel}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinue}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default OrderSummary;
