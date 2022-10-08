import React from "react";
import { Space, Typography, Button } from "antd";
import PersonalizedRecommendationWrapper from "./PersonalizedRecommendationStyled";

function PersonalizedRecommendation(props) {
  return (
    <PersonalizedRecommendationWrapper>
      <Space direction="vertical" size={18} className="personalized-recommendation_wrapper">
        <Typography.Title level={4}>
          Get personalized recommendations
        </Typography.Title>
        <Typography.Text>
          Answer a few questions for your top picks
        </Typography.Text>
        <Button type="primary" danger>
          Get Started
        </Button>
      </Space>
    </PersonalizedRecommendationWrapper>
  );
}

export default PersonalizedRecommendation;
