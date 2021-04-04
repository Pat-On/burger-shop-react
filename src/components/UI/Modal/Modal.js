import React from "react";
import classes from "./Modal.module.css";
import Aux from "../../../hoc/Auxillary/Auxillary";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
  //this we are going to replace by React.memo()

  // shouldComponentUpdate(nextProps, nextState) {
  //   return (
  //     nextProps.show !== this.props.show ||
  //     nextProps.children !== this.props.children
  //   );
  // }

  // componentDidUpdate() {
  //   // console.log("[modal] will update");
  // }

  // console.log(props.show);
  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
        className={classes.Modal}
      >
        {props.children}
      </div>
    </Aux>
  );
};

export default React.memo(Modal, (prevProps, nextProps) => {
  return (
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
  );
});
