import React from "react";
import DotLoadingWrapper from "./DotLoadingStyled";

function DotLoading(props) {
  return (
    <DotLoadingWrapper>
      <div className="dot-pulse"></div>
    </DotLoadingWrapper>
  );
}

export default DotLoading;
