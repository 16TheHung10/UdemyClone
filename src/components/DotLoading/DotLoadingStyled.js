import styled from "styled-components";

const DotLoadingWrapper = styled.div`
  &&& {
    padding: 4px 24px;
    border-radius: 12px;
    background-color: #fff;
    border: 1px solid #efefef;

    .dot-pulse {
      position: relative;
      left: -9999px;
      width: 10px;
      height: 10px;
      border-radius: 5px;
      background-color: #9880ff;
      color: #9880ff;
      box-shadow: 9999px 0 0 -5px #9880ff;
      animation: dotPulse 1.5s infinite linear;
      animation-delay: 0.25s;
    }

    .dot-pulse::before,
    .dot-pulse::after {
      content: "";
      display: inline-block;
      position: absolute;
      top: 0;
      width: 10px;
      height: 10px;
      border-radius: 5px;
      background-color: #9880ff;
      color: #9880ff;
    }

    .dot-pulse::before {
      box-shadow: 9984px 0 0 -5px #9880ff;
      animation: dotPulseBefore 1.5s infinite linear;
      animation-delay: 0s;
    }

    .dot-pulse::after {
      box-shadow: 10014px 0 0 -5px #9880ff;
      animation: dotPulseAfter 1.5s infinite linear;
      animation-delay: 0.5s;
    }

    @keyframes dotPulseBefore {
      0% {
        box-shadow: 9984px 0 0 -5px #000000;
      }
      30% {
        box-shadow: 9984px 0 0 2px #000000;
      }
      60%,
      100% {
        box-shadow: 9984px 0 0 -5px #000000;
      }
    }

    @keyframes dotPulse {
      0% {
        box-shadow: 9999px 0 0 -5px #8c8c8c;
      }
      30% {
        box-shadow: 9999px 0 0 2px #8c8c8c;
      }
      60%,
      100% {
        box-shadow: 9999px 0 0 -5px #8c8c8c;
      }
    }

    @keyframes dotPulseAfter {
      0% {
        box-shadow: 10014px 0 0 -5px #bfbfbf;
      }
      30% {
        box-shadow: 10014px 0 0 2px #bfbfbf;
      }
      60%,
      100% {
        box-shadow: 10014px 0 0 -5px #bfbfbf;
      }
    }
  }
`;

export default DotLoadingWrapper;