import styled from "styled-components";

const backgroundImageURL = `${
  process.env.PUBLIC_URL + "/recommend-background.jpg"
}`;

const PersonalizedRecommendationWrapper = styled.div`
  &&& {
    background: #fff;
    width: 100%;
    padding: 30px;
    border-radius: 3px;
    border: 1px solid #efefef;
    text-align: left;
    background-image: url(${backgroundImageURL});
    .ant-typography {
      color: #fff;
      margin: 0;
    }
    .ant-space {
      width: 100%;
    }
    .ant-btn {
      height: 40px;
      padding: 0 20px;
      border: 0;
      line-height: 1;
      display: flex;
      align-items: center;
      border-radius: 3px;
      color: #fff;
      background: #ed2a26;
      font-size: 14px;
      font-weight: 500;
      &:hover {
        background-color: #c72127;
      }
    }
  }
  @media (max-width: 1199.98px) {
    .personalized-recommendation_wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
  }
`;

export default PersonalizedRecommendationWrapper;
