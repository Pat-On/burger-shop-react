//it is holding the everything related to submiting the order
import * as actionTypes from "./actionTypes";

import axios from "../../axios-order";

//sync action creator
export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

// sync action creator - ???
export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

// async action creator action dispatched after we click the button on gui
export const purchaseBurger = (orderData) => {
  //middleware again - funk - why git is not counting it?
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    //he mentioned that it is normal pattern
    axios
      .post("orders.json", orderData)
      .then((response) => {
        console.log(response.data);
        dispatch(purchaseBurgerSuccess(response.data, orderData));
      })
      .catch((error) => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};
