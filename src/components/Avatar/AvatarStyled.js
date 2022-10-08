import styled from "styled-components";

const AvatarWrapper = styled.img`
  &&& {
    box-shadow: 0px 2px 2px 0px rgb(0, 0, 0, 0.1);
    text-align: center;
    width: 100px;
    height: 100px;
    display: inline-block;
    border-radius: 100%;
    border: 2px solid #fff;
    .ant-avatar-string
    {
      transform: scale(2) translateX(-50%)!important;
    }
  }
`;

export const AvatarStringWrapper = styled.div`
  &&& {
    .instructor-card_img
    {
      background-color: #ed2a26;
    }
    .ant-avatar-string
    {
      transform: scale(2) translateX(-50%)!important;
    }
  }
`;
export default AvatarWrapper;
