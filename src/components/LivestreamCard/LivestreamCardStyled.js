
import styled from 'styled-components';
const LivestreamCardWrapper = styled.div`
  &&& {
    width: 100%;
    border-radius: 3px;
    padding: 15px;
    background-position: center;
    background-repeat: no-repeat;
    background: rgba(51, 1, 51, 0.1);
    .ant-space {
      text-align: center;
      width: 100%;
      border-radius: 3px;
      padding: 15px 10px;
      background-position: center;
      background-repeat: no-repeat;
      background: rgba(51, 1, 51, 0.1);
      box-shadow: 0 6px 25px rgb(0 0 0 / 13%);
      background: rgba(255, 255, 255, 0.06);
    }
    .livestream-card_live-dot {
      width: 6px;
      height: 6px;
      background: #ed2a26;
      position: absolute;
      border-radius: 100%;
      top: 2px;
      right: -9px;
    }
  }
`;

export default LivestreamCardWrapper;