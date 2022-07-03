import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Loading from "component/Sub/Loading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStore } from "reduxStore/store";
import { persistStore } from "redux-persist";

function MainApp({ Component, pageProps }) {
  const reduxStore = useStore(pageProps.initialReduxState);
  const persistor = persistStore(reduxStore);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleStart = (url) => {
      console.log(`Loading: ${url}`);
      setLoading(true);
    };
    const handleStop = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);
  return (
    <>
      {loading && <Loading />}
      <ToastContainer position="top-right" theme="colored" autoClose={8000} hideProgressBar={false} newestOnTop={false} draggable={false} pauseOnVisibilityChange closeOnClick pauseOnHover />
      <Provider store={reduxStore}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}

export default MainApp;
