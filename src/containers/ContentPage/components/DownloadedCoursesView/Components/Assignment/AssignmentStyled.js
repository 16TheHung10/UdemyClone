import styled from "styled-components";
export const AssignmentWrapper = styled.div`
  background: white;
  padding: 2rem 1rem;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  .assignment {
    &-title {
      text-align: center;
    }
    &-des {
      font-size: 1.5rem;
    }
    &-attachment {
      display: flex;
      background: #f0f2f5;
      padding: 1rem;
      border-radius: 5px;
      flex-direction: column;
      a {
        color: black;
        text-decoration: underline;
        padding: 1rem;
        background: white;
        flex-basis: 1;
        width: 100%;
        border-radius: inherit;
        margin-bottom: 1rem;
      }
    }
    &-text-area {
      margin-bottom: 1rem;
    }
  }
  .no-attachments {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .ant-typography {
      font-size: 2rem;
      margin-top: 2rem;
    }
  }
`;
