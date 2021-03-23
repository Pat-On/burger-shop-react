import React, { Component } from "react";
import axios from "../../../axios-order";
// import axios from "axios";

import Spinner from "../../../components/UI/Spinnner/Spinner";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";

import Input from "../../../components/UI/Input/Input";

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
      },
    },
    formIsValid: false,
    loading: false,
  };

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    //alert("You continue!");
    //we need only the key and value not a setting
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      //creating key value paris and setting it to the value

      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }

    console.log(formData);
    const order = {
      ingredients: this.props.ingredients,
      //recalculate prices on server because user my try to "play"
      price: this.props.price,
      orderData: formData,
    };
    console.log(order);
    axios
      .post("orders.json", order)
      .then((response) => {
        console.log(response);
        this.setState({ loading: false });
        this.props.history.push("/");
        return response;
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });

    console.log(this.props.ingredients);
  };

  checkValidity(value, rules) {
    let isValid = true;

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
    console.log(inputIdentifier);
    console.log(event.target.value);

    const updatedOrderForm = {
      //shallow copy
      ...this.state.orderForm,
    };
    console.log(updatedOrderForm);
    //we are going deeper with cloning
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    console.log(updatedFormElement);
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    console.log(updatedFormElement.value);
    //changing the value of the state touched
    updatedFormElement.touched = true;

    updatedOrderForm[inputIdentifier] = updatedFormElement;
    console.log(updatedFormElement);

    //updating the validation state for all elements
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      //f-t = f t - t = t f - f = fetc
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

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
        {/* <Input
          elementtype="input"
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <Input
          elementtype="input"
          type="text"
          name="email"
          placeholder="Your email"
        />
        <Input
          elementtype="input"
          type="text"
          name="street"
          placeholder="Street"
        />
        <Input
          elementtype="input"
          type="text"
          name="postal"
          placeholder="Postal Code"
        /> */}
        <Button disabled={!this.state.formIsValid} btnType="Success">
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
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

export default ContactData;
