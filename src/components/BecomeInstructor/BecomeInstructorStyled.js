import styled from 'styled-components';

const BecomeInstructorWrapper = styled.div`
  &&& {
    background: #fff;
    width: 100%;
    padding: 30px;
    border-radius: 3px;
    border: 1px solid #efefef;
    .ant-space {
      width: 100%;
      text-align: center;
    }
    .ant-btn {
      height: 40px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      border: 0;
      line-height: 1;
      border-radius: 3px;
      color: #fff;
      background: #ed2a26;
      font-size: 1.4rem;
      font-weight: 500;
      &:hover {
        background-color: #c72127;
      }
    }
  }
`;

export default BecomeInstructorWrapper;