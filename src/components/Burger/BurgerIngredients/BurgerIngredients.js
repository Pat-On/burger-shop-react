import React from "react";
import classes from "./BurgerIngredient.css";

const burgerIngredient = (props) => {
  let ingredient = null; // is going to render nothing if there is no option or error

  switch (props.type) {
    case "bread-bottom":
      ingredient = <div className={classes.BreadBottom}></div>;
      break;
    case "bread-top":
      ingredient = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>
      );
      break;
    case "meat":
      ingredient = <div className={classes.Meat}></div>;
      break;
  }
};

export default burgerIngredient;
