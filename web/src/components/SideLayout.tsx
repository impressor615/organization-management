import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";

import { ConnectProps } from "@/@types/types";
import IconLink from "@/components/IconLink";
import SideBar from "@/components/SideBar";
import SideMenus from "@/components/SideMenus";

interface Props extends ConnectProps {
  children: React.ReactNode;
}

const SideLayout = ({ children, location }: Props) => {
  return (
    <Fragment>
      <SideBar>
        <IconLink text="조직도" icon="sitemap" to="/dashboard" active={/dashboard/.test(location.pathname)} />
      </SideBar>
      <SideMenus />
      <div className="app-container">
        { children }
      </div>
    </Fragment>
  );
};

export default withRouter(SideLayout as any);
