import styled from "styled-components";

const CardSubscriptionsWrapper = styled.div`
  &&& {
    padding: 16px;
    width: 100%;
    .card-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: solid 1px #d6d6d6;
      border-radius: 5px;
      padding: 1rem;
      min-height: 24rem;
      background-color: white;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      &:hover {
        cursor: pointer;
      }
    }
    h3 {
      font-size: 16px;
      font-weight: 501;
      font-family: "Roboto", sans-serif;
      color: #333;
      margin-top: 8px;
    }
    p {
      font-size: 13px;
      color: #686f7a;
      margin-top: 8px;
      font-family: "Roboto", sans-serif;
      font-weight: 400;
      margin-bottom: 17px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
`;

export default CardSubscriptionsWrapper;
