import styled from 'styled-components';

const InstructorCardWrapper = styled.div`
  &&& {
    width: 100%;
    padding: 10px;
    background-color: #fff;
    border-radius: 3px;
    height: 100%;
    border: 1px solid #efefef;
    & > div {
      display: flex;
      height: 100%;
      flex-direction: column;
      align-items: center;
      width: 100%;
      padding: 20px;
    }
    
    .instructor-card_title-wrapper {
      margin: 0 0 8px 0;
      .ant-typography {
        font-size: 1.8rem;
      }
      .anticon-check-circle {
        font-size: 1.8rem;
      }
    }
    .instructor-card_totalStudent {
      position: relative;
      &::after {
        content: "•";
        margin: 0px 4px;
      }
    }
    .instructor-card_footer {
      margin-top: auto;
    }
    .btn {
      font-size: 1.4rem;
      margin-top: 16px;
      color: black;
      font-weight: bold;
      &:hover {
        color: red;
      }
    }
  }
`;

export default InstructorCardWrapper;