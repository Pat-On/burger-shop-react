import { useState, useEffect } from "react";

export default (httpClient) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    return () => {
      console.log("[withErrorHandler - unmounted]");
    };
  }, []);

  const reqInterceptor = httpClient.interceptors.request.use((req) => {
    console.log("[did you get here? reqInterceptor]");
    setError(null);
    return req;
  });

  const resInterceptor = httpClient.interceptors.response.use(
    (res) => res,
    (err) => {
      console.log(err);
      setError(err);
    }
  );

  useEffect(() => {
    return () => {
      console.log("will unmount", reqInterceptor, resInterceptor);
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.request.eject(resInterceptor);
    };
  }, [reqInterceptor, resInterceptor]);

  const errorConfirmedHandler = () => {
    setError(null);
  };

  return [error, errorConfirmedHandler];
};
