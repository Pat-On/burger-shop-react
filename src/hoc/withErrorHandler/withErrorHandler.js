import React, { Component, useState, useEffect } from "react";

import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxillary/Auxillary";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    console.log(props);
    console.log(axios);
    const [error, setError] = useState(null);

    useEffect(() => {
      return () => {
        console.log("[withErrorHandler - unmounted]");
      };
    }, []);
    // state = {
    //   error: null,
    // };

    // we want to make it rn before component mount, so we want to leave it here
    const reqInterceptor = axios.interceptors.request.use((req) => {
      console.log("[did you get here? reqInterceptor]");
      setError(null);
      return req;
    });
    const resInterceptor = axios.interceptors.response.use(
      (res) => res,
      (err) => {
        console.log(err);
        setError(err);
      }
    );
    console.log(error);
    // componentDidMount() {
    //   this.reqInterceptor = axios.interceptors.request.use((req) => {
    //     this.setState({ error: null });
    //     return req;
    //   });
    //   this.resInterceptor = axios.interceptors.response.use(
    //     (res) => res,
    //     (error) => {
    //       this.setState({ error: error });
    //     }
    //   );
    // }

    useEffect(() => {
      return () => {
        // clean up function
        // console.log(error);
        console.log("will unmount", reqInterceptor, resInterceptor);
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.request.eject(resInterceptor);
      };
    }, [reqInterceptor, resInterceptor]);

    // componentWillUnmount() {
    //   // console.log("will unmount", this.reqInterceptor, this.resInterceptor);
    //   axios.interceptors.request.eject(this.reqInterceptor);
    //   axios.interceptors.request.eject(this.resInterceptor);
    // }

    const errorConfirmedHandler = () => {
      setError(null);
    };

    console.log(error);
    return (
      <Aux>
        <Modal show={error} modalClosed={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;
