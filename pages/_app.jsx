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

  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 3);
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <Provider store={store}>
      {show ? (
        <>
          <Sidebar loggedin={loggedin} />
          <main className="px-4 py-6">
            <Suspense fallback={<CircularIndeterminate />}>
              {/* {isLoading ? ( */}
              <Component {...pageProps} />
              {/* ) : (
                <CircularIndeterminate />
              )} */}
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
        </>
      ) : (
        <></>
      )}
    </Provider>
  );
}
