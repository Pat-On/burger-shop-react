import React from "react";
import { Route } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";

function App() {
  return (
    <div>
      <Layout>
        <Route path="/" component={BurgerBuilder} />
        <Route path="/checkout" component={Checkout} />
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
