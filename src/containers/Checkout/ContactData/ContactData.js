import React, { Component } from "react";
import axios from "../../../axios-order";
import { connect } from "react-redux";

import Spinner from "../../../components/UI/Spinnner/Spinner";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";

import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";

class ContactData extends Component {
  state = {
    orderForm: {
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
    },
    formIsValid: true,
    // loading: false,
  };

  orderHandler = (e) => {
    e.preventDefault();

    //we need only the key and value not a setting
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      //creating key value paris and setting it to the value

      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }

    const order = {
      ingredients: this.props.ings,
      //recalculate prices on server because user my try to "play"
      price: this.props.price,
      orderData: formData,
    };

    this.props.onOrderBurger(order, this.props.token);
  };

  checkValidity(value, rules) {
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
  }

  inputChangedHandler = (event, inputIdentifier) => {
    console.log(event.target.value);
    const updatedOrderForm = {
      //shallow copy
      ...this.state.orderForm,
    };

    //we are going deeper with cloning
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
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

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
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

  render() {
    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
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
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
        ))}

        <Button disabled={!this.state.formIsValid} btnType="Success">
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
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
