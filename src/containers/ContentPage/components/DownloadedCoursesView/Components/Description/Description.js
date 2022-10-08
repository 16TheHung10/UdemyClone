import React from "react";
import { DescriptionWrapper } from "./DescriptionWrapper";

export default function Description({ description }) {
  return (
    <DescriptionWrapper
      dangerouslySetInnerHTML={{
        __html:
          description === "" ? (
            <span style={{ color: "var(--text-color)" }}>No description</span>
          ) : (
            description
          ),
      }}
    ></DescriptionWrapper>
  );
}
