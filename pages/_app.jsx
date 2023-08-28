import "../styles/globals.css";
import Header from "./components/layout/header";
import Sidebar from "./components/layout/sidebar";
import { Provider } from "react-redux";
import { store } from "./redux/store/clientStore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  const [loggedin, setLoggedin] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user && router.pathname !== "user/login") {
      setLoggedin(false);
      router.push("/user/login");
    } else {
      setLoggedin(true);
    }
  }, [router.pathname]);

  return (
    <Provider store={store}>
      {/* <Header name={pageProps.user} loggedin={loggedin} /> */}
      <Sidebar loggedin={loggedin} />

      <main className="px-4 py-6">
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </main>
    </Provider>
  );
}
