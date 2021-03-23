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
      },

      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code",
        },
        value: "",
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
      },

      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "e-Mail",
        },
        value: "",
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
        value: "",
      },
    },
    loading: false,
  };

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    //alert("You continue!");
    const order = {
      ingredients: this.props.ingredients,
      //recalculate prices on server because user my try to "play"
      price: this.props.price,
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
    console.log(updatedFormElement.value);
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    console.log(updatedFormElement);
    this.setState({ orderForm: updatedOrderForm });
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
      <form>
        {/* <Input elementType="..." elementConfig="..." value="..." /> */}
        {formElementArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
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
        <Button btnType="Success" clicked={this.orderHandler}>
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
