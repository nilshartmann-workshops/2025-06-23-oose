/* eslint-disable simple-import-sort/imports,unused-imports/no-unused-imports */
import "./index.css";

import { scan } from "react-scan"; // must be imported before React and React DOM

import React from "react";
import ReactDOM from "react-dom/client";

// import App from "./standalone/compiler/CompilerApp.tsx";
// import App from "./standalone/context/ContextApp.tsx";
import App from "./standalone/transition/TransitionApp.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
