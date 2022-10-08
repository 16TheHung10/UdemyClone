import { Button } from "antd";
import styled from "styled-components";
export const ButtonStyled = styled(Button)`
  height: ${(props) => props.height || "4rem"};
  background-color: ${(props) => props.bgColor || "#ed2a26"};
  color: ${(props) => props.color || "white"};
  font-weight: ${(props) => props.fontWeight || 600};
  transition: all 0.3s;
  border-radius: ${(props) => props.radius || "4px"};
  border: none;
  &:hover {
    background-color: ${(props) => props.bghover || "black"};
    color: ${(props) => props.colorhover || "white"};
  }
  &:active {
    background-color: black;
    color: white;
  }
  &:focus {
    background-color: black;
    color: white;
  }
`;
