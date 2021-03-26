import React, { Component } from "react";

import { connect } from "react-redux";

import Order from "../../components/Order/Order";
import axios from "../../axios-order";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinnner/Spinner";

class Orders extends Component {
  // state = {
  //   orders: [],
  //   loading: true,
  // };
  componentDidMount() {
    this.props.onFetchOrders();
    // axios
    //   .get("/orders.json")
    //   .then((res) => {
    //     // console.log(res);
    //     const fetchedOrders = [];
    //     for (let key in res.data) {
    //       fetchedOrders.push({ ...res.data[key], id: key });
    //     }
    //     // console.log(fetchedOrders);
    //     this.setState({ loading: false, orders: fetchedOrders });
    //   })
    //   .catch((err) => {
    //     this.setState({ loading: false });
    //   });
  }
  render() {
    console.log(this.props.orders);
    console.log(this.props.loading);
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map((order) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ));
    }
    return <div>{orders}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ///action creators
    onFetchOrders: () => dispatch(actions.fetchOrders()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
// export default Orders;
