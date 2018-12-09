import "./_side-bar.scss";

import React from "react";

interface Props {
  children: React.ReactNode;
}

const SideBar = ({ children }: Props) => (
  <div className="side-bar">
    {children}
  </div>
);

export default SideBar;
