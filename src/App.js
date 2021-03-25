//routing
import React from "react";

//routing
import { Route } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";

//routing
function App() {
  return (
    <div>
      <Layout>
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
        <Route path="/" exact component={BurgerBuilder} />
      </Layout>
    </div>
  );
}

// testing the unmount inside the
// class App extends React.Component {
//   state = {
//     show: true,
//   };

//   componentDidMount() {
//     setTimeout(() => {
//       this.setState({ show: false });
//     }, 5000);
//   }

//   render() {
//     return (
//       <div>
//         <Layout>{this.state.show ? <BurgerBuilder /> : null}</Layout>
//       </div>
//     );
//   }
// }

export default App;
