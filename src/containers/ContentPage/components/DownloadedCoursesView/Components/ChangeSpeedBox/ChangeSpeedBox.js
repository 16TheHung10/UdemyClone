import React from "react";
import { Wraper } from "./ChangeSpeedBoxStyled";

export default function ChangeSpeedBox() {
  const speedValue = [0.25, 0.5, 1, 1.25, 1.5, 1.75, 2];
  return (
    <Wraper>
      {speedValue?.map((item, index) => {
        return <Button>{item}</Button>;
      })}
    </Wraper>
  );
}
