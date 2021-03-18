import React from "react";

import Aux from "../../hoc/Auxillary/Auxillary";
import classes from "./Layout.module.css";

console.log(classes);
const layout = (props) => (
  <Aux>
    <div>Toolbar, SideDrawer, BackDrop</div>
    <main className={classes.Content}>{props.children}</main>
  </Aux>
);

export default layout;
