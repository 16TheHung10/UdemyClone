import { yupResolver } from "@hookform/resolvers/yup";
import { Rate, Space, Typography, Input, Form } from "antd";
import { ButtonStyled } from "components/Button/ButtonStyled";
import React, { useEffect } from "react";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { HaveNoRateWrapper } from "./HaveNoRateStyled";
const { Title, Paragraph } = Typography;
const { TextArea } = Input;

export default function HaveNoRate({
  handleChangePointRating,
  onChangeRateContent,
  rate,
  onSubmit,
  loading,
}) {
  const schema = yup
    .object({
      content: yup
        .string()
        .required("Please Enter Your Review!")
        .max(300, "Your review must be less than 200 character"),

      rating: yup.number().min(0.5, "Rating must be greater than 0"),
    })
    .required();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      content: "",
      rating: 5,
    },
  });

  return (
    <HaveNoRateWrapper>
      <Space direction="vertical" className="ratingArea rating-course">
        <Form onFinish={handleSubmit(onSubmit)}>
          <Space align="center" className="rating-course-header">
            <Title level={4} className="rating-course-title">
              Do You Like This Course ? Please Rate It
            </Title>
            <ButtonStyled loading={loading} htmlType="submit">
              Rate
            </ButtonStyled>
          </Space>
          <Controller
            name="rating"
            control={control}
            render={({ field }) => (
              <>
                <Rate {...field} allowHalf />
                {errors.rating && (
                  <Paragraph className="error-message">
                    {errors.rating?.message}
                  </Paragraph>
                )}
              </>
            )}
          />
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <>
                <TextArea
                  {...field}
                  placeholder="Write your review here"
                  rows={6}
                  maxLength={300}
                />
                {errors.content && (
                  <Paragraph className="error-message">
                    {errors.content?.message}
                  </Paragraph>
                )}
              </>
            )}
          />
        </Form>
      </Space>
    </HaveNoRateWrapper>
  );
}
