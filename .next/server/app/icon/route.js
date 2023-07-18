(() => {
var exports = {};
exports.id = 441;
exports.ids = [441];
exports.modules = {

/***/ 7783:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/@edge-runtime/cookies");

/***/ }),

/***/ 8530:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/@opentelemetry/api");

/***/ }),

/***/ 4426:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/chalk");

/***/ }),

/***/ 252:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/cookie");

/***/ }),

/***/ 2196:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/ua-parser-js");

/***/ }),

/***/ 4021:
/***/ ((module) => {

"use strict";
module.exports = import("next/dist/compiled/@vercel/og/index.node.js");;

/***/ }),

/***/ 4398:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "headerHooks": () => (/* binding */ headerHooks),
  "originalPathname": () => (/* binding */ originalPathname),
  "requestAsyncStorage": () => (/* binding */ requestAsyncStorage),
  "routeModule": () => (/* binding */ routeModule),
  "serverHooks": () => (/* binding */ serverHooks),
  "staticGenerationAsyncStorage": () => (/* binding */ staticGenerationAsyncStorage),
  "staticGenerationBailout": () => (/* binding */ staticGenerationBailout)
});

// NAMESPACE OBJECT: ./node_modules/.pnpm/next@13.4.2_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/build/webpack/loaders/next-metadata-route-loader.js?page=%2Ficon%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js!./app/icon.js?__next_metadata
var icon_next_metadata_namespaceObject = {};
__webpack_require__.r(icon_next_metadata_namespaceObject);
__webpack_require__.d(icon_next_metadata_namespaceObject, {
  "GET": () => (GET)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.2_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(3920);
// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.2_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(3012);
var module_default = /*#__PURE__*/__webpack_require__.n(app_route_module);
// EXTERNAL MODULE: ./node_modules/.pnpm/next@13.4.2_react-dom@18.2.0_react@18.2.0/node_modules/next/server.js
var server = __webpack_require__(1737);
// EXTERNAL MODULE: ./app/icon.js
var icon = __webpack_require__(8130);
;// CONCATENATED MODULE: ./node_modules/.pnpm/next@13.4.2_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/build/webpack/loaders/next-metadata-route-loader.js?page=%2Ficon%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js!./app/icon.js?__next_metadata



const imageModule = { ...icon }

const handler = imageModule.default
const generateImageMetadata = imageModule.generateImageMetadata

async function GET(_, ctx) {
  const { __metadata_id__ = [], ...params } = ctx.params || {}
  const targetId = __metadata_id__[0]
  let id = undefined
  const imageMetadata = generateImageMetadata ? await generateImageMetadata({ params }) : null

  if (imageMetadata) {
    id = imageMetadata.find((item) => {
      if (false) {}
      return item.id.toString() === targetId
    })?.id
    if (id == null) {
      return new server.NextResponse('Not Found', {
        status: 404,
      })
    }
  }
  return handler({ params: ctx.params ? params : undefined, id })
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/next@13.4.2_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Ficon%2Froute&name=app%2Ficon%2Froute&pagePath=private-next-app-dir%2Ficon.js&appDir=%2Fhome%2Flkbrntgh%2FDesktop%2Fbom-client%2Fapp&appPaths=%2Ficon&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=!

    

    

    

    const routeModule = new (module_default())({
    userland: icon_next_metadata_namespaceObject,
    pathname: "/icon",
    resolvedPagePath: "next-metadata-route-loader?page=%2Ficon%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js!/home/lkbrntgh/Desktop/bom-client/app/icon.js?__next_metadata",
    nextConfigOutput: undefined,
  })

    // Pull out the exports that we need to expose from the module. This should
    // be eliminated when we've moved the other routes to the new format. These
    // are used to hook into the route.
    const {
      requestAsyncStorage,
      staticGenerationAsyncStorage,
      serverHooks,
      headerHooks,
      staticGenerationBailout
    } = routeModule

    const originalPathname = "/icon/route"

    

/***/ }),

/***/ 8130:
/***/ (() => {



/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [962,630], () => (__webpack_exec__(4398)));
module.exports = __webpack_exports__;

})();