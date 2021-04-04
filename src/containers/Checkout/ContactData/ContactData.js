import React, { useState } from "react";
import axios from "../../../axios-order";
import { connect } from "react-redux";

import Spinner from "../../../components/UI/Spinnner/Spinner";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";

import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";

const ContactData = (props) => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },

    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Zip Code",
      },
      value: "",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
      },
      valid: false,
      touched: false,
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },

    email: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "e-Mail",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },

    deliverMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
          { value: "slowest", displayValue: "Slowest" },
        ],
      },
      value: "fastest",
      // validation: {
      //   required: true,
      // },
      //!IMPORTANT he added it here because he want to make working the validation
      valid: true,
      //first way how to resolve the error related to drop menu
      // he said that he like it because it is keeping our elements the same
      validation: {},
    },
  });
  const [formIsValid, setFormIsValid] = useState(
    true
    // loading: false,
  );

  const orderHandler = (e) => {
    e.preventDefault();

    //we need only the key and value not a setting
    const formData = {};
    for (let formElementIdentifier in orderForm) {
      //creating key value paris and setting it to the value

      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }

    const order = {
      ingredients: props.ings,
      //recalculate prices on server because user my try to "play"
      price: props.price,
      orderData: formData,
      userId: props.userId,
    };

    props.onOrderBurger(order, props.token);
  };

  const checkValidity = (value, rules) => {
    let isValid = true;
    //second level validation - if we want or optionally second way of doing it
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      //shallow copy
      ...orderForm,
    };

    //we are going deeper with cloning
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    //changing the value of the state touched
    updatedFormElement.touched = true;

    //updating the validation state for all elements
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      //f-t = f t - t = t f - f = fetch
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    console.log(updatedFormElement);
    setOrderForm({
      ...updatedOrderForm,
      [inputIdentifier]: updatedFormElement,
    });
    setFormIsValid(formIsValid);
    // this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  // inputChangedHandler = (event, inputIdentifier) => {
  //   const updatedOrderForm = {
  //     ...this.state.orderForm,
  //   };
  //   const updatedFormElement = {
  //     ...updatedOrderForm[inputIdentifier],
  //   };
  //   updatedFormElement.value = event.target.value;
  //   updatedFormElement.valid = this.checkValidity(
  //     updatedFormElement.value,
  //     updatedFormElement.validation
  //   );
  //   updatedFormElement.touched = true;
  //   updatedOrderForm[inputIdentifier] = updatedFormElement;

  //   let formIsValid = true;
  //   for (let inputIdentifier in updatedOrderForm) {
  //     formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
  //   }
  //   this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  // };

  const formElementArray = [];
  for (let key in orderForm) {
    formElementArray.push({
      id: key,
      config: orderForm[key],
    });
  }

  let form = (
    <form onSubmit={orderHandler}>
      {/* <Input elementType="..." elementConfig="..." value="..." /> */}
      {formElementArray.map((formElement) => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={(event) => inputChangedHandler(event, formElement.id)}
        />
      ))}

      <Button disabled={!formIsValid} btnType="Success">
        ORDER
      </Button>
    </form>
  );
  if (props.loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
