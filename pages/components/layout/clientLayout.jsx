'use client';

import {Provider} from "react-redux";
// import {store} from "@/app/redux/store";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";

export function ClientLayout({children}) {
    return (
        <Provider store={store}>
            {children}
            <ToastContainer/>
        </Provider>
    )
}