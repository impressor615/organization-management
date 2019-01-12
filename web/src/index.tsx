import "@/assets/scss/main.scss";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCaretDown,
  faCaretUp,
  faCog,
  faCrown,
  faPlus,
  faPowerOff,
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
  faPowerOff,
  faCog,
  faCrown,
];
library.add(...faIcons);
ReactDOM.render(
    <App />,
    document.getElementById("app"),
);
