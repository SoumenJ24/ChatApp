/* for React 17

import React from "react";
import ReactDOM from "react-dom";


ReactDOM.render(<App />, document.querySelector("#root"));
*/
import { createRoot } from "react-dom/client";
import App from "./App";
const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
