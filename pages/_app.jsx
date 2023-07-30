import "../styles/globals.css";
import useAuth from "./services/loggedin";
import Header from "./components/layout/header";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Login from "./user/login";

export default function App({ Component, pageProps }) {
  const [loggedin, setLoggedin] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log("user-test:", JSON.parse(user));
    !user && router.pathname !== "user/login"
      ? router.push("/user/login")
      : setLoggedin(true);
  }, []);

  return (
    <Provider store={store}>
      <Header name={pageProps.user} loggedin={loggedin} />

      <main className="px-4 py-6">
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}
