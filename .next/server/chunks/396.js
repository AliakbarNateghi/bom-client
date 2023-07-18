exports.id = 396;
exports.ids = [396];
exports.modules = {

/***/ 1595:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 450));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 1844))

/***/ }),

/***/ 8474:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Fy": () => (/* binding */ getDisposableID),
/* harmony export */   "I6": () => (/* binding */ reducer)
/* harmony export */ });
/* unused harmony export DisposableIdSlice */
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3942);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _app_services_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1276);


const getDisposableID = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAsyncThunk)("disposable-id/", async (_, thunkAPI)=>{
    _app_services_api__WEBPACK_IMPORTED_MODULE_1__/* ["default"].init */ .Z.init();
    const response = await _app_services_api__WEBPACK_IMPORTED_MODULE_1__/* ["default"].get */ .Z.get("disposable-id");
    console.log("root disposableID :", response.data[0].disposable_id);
    const disposable_id = response.data[0].disposable_id;
    return disposable_id;
});
const initialState = {
    disposableID: null
};
const DisposableIdSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
    name: "uniqueCode",
    initialState,
    extraReducers: {
        [getDisposableID.pending]: (state)=>{
            state.status = "loading";
        },
        [getDisposableID.fulfilled]: (state, action)=>{
            state.status = "succeeded";
            state.disposableID = action.payload;
        },
        [getDisposableID.rejected]: (state, action)=>{
            state.status = "failed";
            state.error = action.error.message;
            console.log(action.error);
        }
    }
});
const { reducer  } = DisposableIdSlice;


/***/ }),

/***/ 2657:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "ZP": () => (/* binding */ user),
  "x4": () => (/* binding */ login)
});

// UNUSED EXPORTS: userSlice

// EXTERNAL MODULE: ./node_modules/.pnpm/@reduxjs+toolkit@1.9.5_react-redux@8.0.7_react@18.2.0/node_modules/@reduxjs/toolkit/dist/redux-toolkit.cjs.production.min.js
var redux_toolkit_cjs_production_min = __webpack_require__(3942);
// EXTERNAL MODULE: ./app/services/api.js
var api = __webpack_require__(1276);
;// CONCATENATED MODULE: ./app/services/localStorage.js
/* __next_internal_client_entry_do_not_use__ setUser,purgeLocalStorage auto */ const USER = "user";
const setUser = (user)=>{
    window.localStorage.setItem("user", JSON.stringify(user));
};
const purgeLocalStorage = ()=>{
    window.localStorage.removeItem(USER);
};
/* harmony default export */ const localStorage = ({
    setUser,
    purgeLocalStorage
});

;// CONCATENATED MODULE: ./app/redux/slices/user.js



const login = (0,redux_toolkit_cjs_production_min.createAsyncThunk)("login", async (payload, thunkAPI)=>{
    try {
        console.log("payload :", payload);
        api/* default.init */.Z.init();
        const { data  } = await api/* default.post */.Z.post("login", payload);
        return data;
    } catch (err) {
        console.error("Error during login:", err);
        throw err;
    }
});
const initialState = {
    user: {}
};
const userSlice = (0,redux_toolkit_cjs_production_min.createSlice)({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: {
        [login.fulfilled]: (state, { payload  })=>{
            setUser(payload["user"]);
            console.log("user payload :", payload["user"]);
            state.user = payload["user"];
        }
    }
});
const {} = userSlice.actions;
/* harmony default export */ const user = (userSlice.reducer);


/***/ }),

/***/ 4200:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "h": () => (/* binding */ store)
/* harmony export */ });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3942);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _app_redux_slices_user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2657);
/* harmony import */ var _slices_qrcode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8474);



const store = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__.configureStore)({
    reducer: {
        user: _app_redux_slices_user__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP,
        disposableId: _slices_qrcode__WEBPACK_IMPORTED_MODULE_1__/* .reducer */ .I6
    }
});


/***/ }),

/***/ 1276:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(121);

class Api {
    static init() {
        axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"].defaults.baseURL */ .Z.defaults.baseURL = "http://localhost:8000/api/";
        axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"].defaults.withCredentials */ .Z.defaults.withCredentials = true;
        axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"].defaults.headers.common.Accept */ .Z.defaults.headers.common.Accept = "application/json";
    }
    static constructUrl(resource, slug = "") {
        return `${resource}/${slug}`;
    }
    static async post(resource, params) {
        try {
            return await axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"].post */ .Z.post(this.constructUrl(resource), params);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
    static async put(resource, slug, params) {
        try {
            return await axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"].put */ .Z.put(this.constructUrl(resource, slug), params);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
    static async get(resource, slug, params) {
        try {
            return await axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .Z.get(this.constructUrl(resource, slug, {
                params,
                withCredentials: true
            }));
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
    static async delete(resource, params) {
        try {
            return await axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"]["delete"] */ .Z["delete"](this.constructUrl(resource), params);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Api);


/***/ }),

/***/ 1844:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClientLayout": () => (/* binding */ ClientLayout)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6931);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3671);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _app_redux_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4200);
/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1945);
/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8495);
/* __next_internal_client_entry_do_not_use__ ClientLayout auto */ 




function ClientLayout({ children  }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_redux__WEBPACK_IMPORTED_MODULE_1__.Provider, {
        store: _app_redux_store__WEBPACK_IMPORTED_MODULE_2__/* .store */ .h,
        children: [
            children,
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_toastify__WEBPACK_IMPORTED_MODULE_4__/* .ToastContainer */ .Ix, {})
        ]
    });
}


/***/ }),

/***/ 450:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Header)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6931);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8823);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3671);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* __next_internal_client_entry_do_not_use__ default auto */ 


function Header() {
    const user = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)((state)=>state.user.user);
    console.log("user", user);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("header", {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("nav", {
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex h-10 bg-white text-black",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                        className: "w-3/12 my-auto",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                            className: "mx-2",
                            children: localStorage.getItem("user") ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                className: "transition ease-in-out delay-0  hover:-translate-y-1  hover:scale-100 hover:bg-violet-950 hover:text-white duration-300 p-2 rounded ",
                                href: "/user/profile",
                                children: "Profile"
                            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                className: "transition ease-in-out delay-0  hover:-translate-y-1  hover:scale-100 hover:bg-violet-950 hover:text-white duration-300 p-2 rounded ",
                                href: "/user/login",
                                children: "Login"
                            })
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                        className: "flex justify-center flex-row w-6/12 my-auto",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                            className: "mx-2",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                href: "/orders",
                                className: "transition ease-in-out delay-0  hover:-translate-y-1  hover:scale-100 hover:bg-violet-950 hover:text-white duration-300 p-2 rounded ",
                                children: "Orders"
                            })
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                        className: "w-3/12 my-auto ",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                            className: "mx-2",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                className: "float-right",
                                href: "/",
                                children: "logo"
                            })
                        })
                    })
                ]
            })
        })
    });
}


/***/ }),

/***/ 8130:
/***/ (() => {



/***/ }),

/***/ 9403:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ RootLayout),
  "metadata": () => (/* binding */ metadata)
});

// EXTERNAL MODULE: external "next/dist/compiled/react-experimental/jsx-runtime"
var jsx_runtime_ = __webpack_require__(6931);
// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.2_react-dom@18.2.0_react@18.2.0/node_modules/next/font/google/target.css?{"path":"app/layout.jsx","import":"Inter","arguments":[{"subsets":["latin"]}],"variableName":"inter"}
var layout_jsx_import_Inter_arguments_subsets_latin_variableName_inter_ = __webpack_require__(1988);
var layout_jsx_import_Inter_arguments_subsets_latin_variableName_inter_default = /*#__PURE__*/__webpack_require__.n(layout_jsx_import_Inter_arguments_subsets_latin_variableName_inter_);
// EXTERNAL MODULE: ./app/globals.css
var globals = __webpack_require__(2756);
// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.2_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/build/webpack/loaders/next-flight-loader/module-proxy.js
var module_proxy = __webpack_require__(487);
;// CONCATENATED MODULE: ./components/layout/header.jsx

const proxy = (0,module_proxy.createProxy)(String.raw`/home/lkbrntgh/Desktop/bom-client/components/layout/header.jsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
/* harmony default export */ const header = (proxy.default);

;// CONCATENATED MODULE: ./components/layout/footer.jsx

function Footer() {
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {})
    });
}

;// CONCATENATED MODULE: ./components/layout/clientLayout.jsx

const clientLayout_proxy = (0,module_proxy.createProxy)(String.raw`/home/lkbrntgh/Desktop/bom-client/components/layout/clientLayout.jsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule: clientLayout_esModule, $$typeof: clientLayout_$$typeof } = clientLayout_proxy;
/* harmony default export */ const clientLayout = (clientLayout_proxy.default);

const e0 = clientLayout_proxy["ClientLayout"];

;// CONCATENATED MODULE: ./app/layout.jsx






const metadata = {
    title: "QAHVE",
    description: "qahve testing"
};
function RootLayout({ children  }) {
    return /*#__PURE__*/ jsx_runtime_.jsx("html", {
        lang: "en",
        className: "bg-white",
        children: /*#__PURE__*/ jsx_runtime_.jsx("body", {
            className: (layout_jsx_import_Inter_arguments_subsets_latin_variableName_inter_default()).className,
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(e0, {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(header, {}),
                    children,
                    /*#__PURE__*/ jsx_runtime_.jsx(Footer, {})
                ]
            })
        })
    });
}


/***/ }),

/***/ 8222:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _home_lkbrntgh_Desktop_bom_client_app_icon_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8130);
/* harmony import */ var _home_lkbrntgh_Desktop_bom_client_app_icon_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_home_lkbrntgh_Desktop_bom_client_app_icon_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5136);
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__);
    
    

    const imageModule = { ..._home_lkbrntgh_Desktop_bom_client_app_icon_js__WEBPACK_IMPORTED_MODULE_1__ }
    /* harmony default export */ async function __WEBPACK_DEFAULT_EXPORT__(props) {
      const { __metadata_id__: _, ...params } = props.params
      const imageUrl = (0,next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__.fillMetadataSegment)(".", params, "icon")

      const { generateImageMetadata } = imageModule

      function getImageMetadata(imageMetadata, idParam) {
        const data = {
          alt: imageMetadata.alt,
          type: imageMetadata.contentType || 'image/png',
          url: imageUrl + (idParam ? ('/' + idParam) : '') + "?ef46db3751d8e999",
        }
        const { size } = imageMetadata
        if (size) {
          data.sizes = size.width + "x" + size.height;
        }
        return data
      }

      if (generateImageMetadata) {
        const imageMetadataArray = await generateImageMetadata({ params })
        return imageMetadataArray.map((imageMetadata, index) => {
          const idParam = (imageMetadata.id || index) + ''
          return getImageMetadata(imageMetadata, idParam)
        })
      } else {
        return [getImageMetadata(imageModule, '')]
      }
    }

/***/ }),

/***/ 2756:
/***/ (() => {



/***/ })

};
;