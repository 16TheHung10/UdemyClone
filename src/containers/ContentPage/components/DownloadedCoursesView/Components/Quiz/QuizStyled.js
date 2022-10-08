import styled from "styled-components";
export const QuizWrapper = styled.div`
  background: white;
  padding: 2rem 1rem;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  &&& {
    /* .ant-radio {
      border-color: #ed2a26;
    } */
    .ant-radio-inner {
      border-width: medium;
      &::after {
        background-color: #ed2a26;
      }
    }
    .ant-checkbox-checked .ant-checkbox-inner {
      background-color: #ed2a26;
      border-color: #ed2a26;
    }
    .ant-radio-checked {
      .ant-radio-inner {
        border-color: #ed2a26;
      }
    }
  }
  .no-quizzes {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .ant-typography {
      font-size: 2rem;
      margin-top: 2rem;
    }
  }
  .question-item {
    margin-bottom: 2rem;
    padding: 1rem;
    background: #f0f2f54a;
    border-radius: 1rem;
    box-shadow: rgb(119 105 105 / 24%) 0px 3px 8px;
  }
  .quizz {
    &-header {
      width: 100%;
    }
    &-title {
      text-transform: uppercase;
      text-align: center;
    }
    &-content {
      width: 100%;
    }
  }
`;
