import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "./redux/store/clientStore";
import { useRouter } from "next/router";
import { useEffect, useState, Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";
import CircularIndeterminate from "@/pages/components/layout/loading";
const Sidebar = dynamic(() => import("./components/layout/sidebar"), {
  loading: () => <CircularIndeterminate />,
});

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

  // useEffect(() => {
  //   const handleRouteChange = (url, { shallow }) => {
  //     console.log(
  //       `App is changing to ${url} ${
  //         shallow ? "with" : "without"
  //       } shallow routing`
  //     );
  //     document.getElementById("spinner").style.display = "block";
  //     return;
  //   };

  //   const handleRouteComplete = (url, { shallow }) => {
  //     console.log("you have finished going to the new page");
  //     document.getElementById("spinner").style.display = "none";
  //     return;
  //   };

  //   router.events.on("routeChangeStart", handleRouteChange);
  //   router.events.on("routeChangeComplete", handleRouteComplete); // If the component is unmounted, unsubscribe

  //   // from the event with the `off` method:
  //   return () => {
  //     router.events.off("routeChangeStart", handleRouteChange);
  //   };
  // }, []);

  return (
    <Provider store={store}>
      <Sidebar loggedin={loggedin} />
      <main className="px-4 py-6">
        <Suspense fallback={<CircularIndeterminate />}>
          <Component {...pageProps} />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={true}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Suspense>
      </main>
    </Provider>
  );
}
