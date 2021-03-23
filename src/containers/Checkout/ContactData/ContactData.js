import React, { Component } from "react";
import axios from "../../../axios-order";
// import axios from "axios";

import Spinner from "../../../components/UI/Spinnner/Spinner";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";

import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
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
      customer: {
        name: "Patryk ",
        address: {
          street: "Teststreet 1",
          zipCode: "4152",
          country: "uk",
        },
        email: "paton@gma.com",
      },
      deliverMethod: "fastest",
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

  render() {
    let form = (
      <form>
        <Input
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
        />
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
