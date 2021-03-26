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
    type: actionTypes.purchaseBurgerFail,
    error: error,
  };
};

// async action creator action dispatched after we click the button on gui
export const purchaseBurgerStart = (orderData) => {
  //middleware again - funk -
  return (dispatch) => {
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
