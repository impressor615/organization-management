import "./_icon-link.scss";

import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";

import React from "react";
import { Link } from "react-router-dom";

interface Props {
  icon: IconProp;
  to: string;
  text: string;
  active?: boolean;
  size?: SizeProp;
}

const IconLink = ({ to, icon, text, active, size = "2x" }: Props) => (
  <Link className={classnames("icon-link", { active })} to={to}>
    <FontAwesomeIcon icon={icon} size={size} />
    <div>{ text }</div>
  </Link>
);

export default IconLink;
