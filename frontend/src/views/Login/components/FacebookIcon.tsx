import React from "react";
import { SvgIcon } from "@material-ui/core";

const FacebookIcon = () => {
  return (
    <SvgIcon>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" version="1">
        <path
          fill="#fff"
          d="M32 30a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h28a2 2 0 0 1 2 2v28z"
        />
        <path
          fill="#4267b2"
          d="M22 32V20h4l1-5h-5v-2c0-2 1.002-3 3-3h2V5h-4c-3.675 0-6 2.881-6 7v3h-4v5h4v12h5z"
        />
      </svg>
    </SvgIcon>
  );
};

export default FacebookIcon;
