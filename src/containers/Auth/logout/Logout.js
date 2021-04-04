import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../../store/actions/index";

const Logout = (props) => {
  useEffect(() => {
    props.onLogout();
  }, []);

  // componentDidMount() {
  //   props.onLogout();
  // }
  // 1 way of redirecting:
  // to send props to redirect to the logOut
  //2 we will redirect declaratively
  //- more elegant hm? everything in one place?

  return <Redirect to="/" />; // ok now i Know why it is nice solution/
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
