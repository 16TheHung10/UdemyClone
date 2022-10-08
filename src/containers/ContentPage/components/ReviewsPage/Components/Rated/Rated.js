import { Rate, Space, Typography, Input, Image, Form, Button } from "antd";
import { ButtonStyled } from "components/Button/ButtonStyled";
import ReviewCard from "../ReviewCard/ReviewCard";
import React, { Fragment, useEffect } from "react";
import { RatedWrapper } from "./RatedStyled";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
export default function Rated({
  handleChangePointRating,
  onChangeRateContent,
  reviewContent,
  rate,
  loading,
  onSubmit,
  isUpdate,
  onUpdate,
}) {
  const { content, rating, enrollment } = reviewContent;
  const { fullName, image } = enrollment.user;

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
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      content: rate?.content,
      rating: 5,
    },
  });
  useEffect(() => {
    setValue("content", rate?.content);
    setValue("rating", rate?.rating);
  }, [rate?.content, setValue]);

  return (
    <RatedWrapper>
      <div className="ratingArea rating-course">
        {isUpdate ? (
          <Fragment>
            <Space
              align="center"
              direction="vertical"
              className="rating-course-user-info"
            >
              <div align="center" className="rating-course-avatar">
                <Image width={100} height={100} preview={false} src={image} />
              </div>
              <Form onFinish={handleSubmit(onSubmit)} className="form-update">
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
                <ButtonStyled
                  loading={loading}
                  htmlType="submit"
                  className="update-btn"
                >
                  Update Rating
                </ButtonStyled>
              </Form>
            </Space>
          </Fragment>
        ) : (
          <Fragment>
            <Space className="header">
              <Title level={4} className="header-title">
                Your Rating
              </Title>
            </Space>
            <ReviewCard
              linkAvatar={image}
              userName={fullName}
              createdAt={reviewContent?.createdAt}
              startPoint={rating}
              comment={content}
              disabledReport
              onUpdate={onUpdate}
            />
          </Fragment>
        )}
      </div>
    </RatedWrapper>
  );
}
