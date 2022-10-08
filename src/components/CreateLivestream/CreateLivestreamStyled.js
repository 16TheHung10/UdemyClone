import styled from "styled-components";

const CreateLivestreamWrapper = styled.div`
  &&& {
    background-color: #fff;
    border-radius: 3px;
    width: 100%;
    border: 1px solid #efefef;
    .create-live-stream_header {
      padding: 15px 20px;
      border-bottom: 1px solid #efefef;
    }
    .ant-typography {
      margin: 0;
    }
    .ant-space {
      width: 100%;
    }
    .create-live-stream_body {
      padding: 20px;
      text-align: center;
      .create-live-stream_icon {
        display: inline-block;
        width: 60px;
        height: 60px;
        line-height: 43px;
        font-size: 30px;
        text-align: center;
        padding: 14px 0;
        background: #ffecec;
        border-radius: 100%;
        border-bottom: 1px solid #efefef;
      }
      .ant-btn {
        line-height: 1;
        font-size: 1.5rem;
        height: 40px;
        padding: 10px 20px;
        border-radius: 3px;
        &:hover {
          background-color: #333;
        }
      }
    }
  }
`;

export default CreateLivestreamWrapper;