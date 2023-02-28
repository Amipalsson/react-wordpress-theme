import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
const { menu } = window.wp_config;

ReactDOM.render(
  <BrowserRouter>
    <App menu={menu} />
  </BrowserRouter>,
  document.getElementById("root")

);
