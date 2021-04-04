import React, { useEffect } from "react";

import { connect } from "react-redux";

import Order from "../../components/Order/Order";
import axios from "../../axios-order";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinnner/Spinner";

const Orders = (props) => {
  // state = {
  //   orders: [],
  //   loading: true,
  // };

  //in this scenario it is like componentDidMount
  useEffect(() => {
    props.onFetchOrders(props.token, props.userId);
  }, []);
  // componentDidMount() {
  //   this.props.onFetchOrders(this.props.token, this.props.userId);
  //   // axios
  //   //   .get("/orders.json")
  //   //   .then((res) => {
  //   //     // console.log(res);
  //   //     const fetchedOrders = [];
  //   //     for (let key in res.data) {
  //   //       fetchedOrders.push({ ...res.data[key], id: key });
  //   //     }
  //   //     // console.log(fetchedOrders);
  //   //     this.setState({ loading: false, orders: fetchedOrders });
  //   //   })
  //   //   .catch((err) => {
  //   //     this.setState({ loading: false });
  //   //   });
  // }

  let orders = <Spinner />;
  if (!props.loading) {
    orders = props.orders.map((order) => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price}
      />
    ));
  }
  return <div>{orders}</div>;
};

//everything belong to the REDUX
//we are getting it via the plug in from the main file? store correct: index.js <Provider store={store}>
const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token, // getting from different reducer nice
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ///action creators
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
// export default Orders;
