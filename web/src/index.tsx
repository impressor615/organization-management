import "@/assets/scss/main.scss";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCaretDown,
  faCaretUp,
  faPlus,
  faSearch,
  faSitemap,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import ReactDOM from "react-dom";

import App from "@/pages";

const faIcons = [
  faSitemap,
  faPlus,
  faCaretDown,
  faCaretUp,
  faSearch,
  faUser,
];
library.add(...faIcons);
ReactDOM.render(
    <App />,
    document.getElementById("app"),
);
