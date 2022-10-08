import { ShoppingCartOutlined, TagOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Input, Switch, Tabs, Typography } from "antd";
import { CreditIcon } from "assets/IconComponent";
import { schemaPrice } from "containers/ContentPage/components/CreateCourse/validate/schema";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectPrice } from "redux/features/edit-course/EditCourseSelector";
import Wrapper from "../Media/MediaStyled";
const { TabPane } = Tabs;

export default function Price({ getAllSubmitRef, handleData }) {
  const handleDataPrice = useRef();
  const price = useSelector(selectPrice);
  useEffect(() => {
    getAllSubmitRef({ Price: handleDataPrice });
    // eslint-disable-next-line
  }, []);
  const [formPrice] = Form.useForm();
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(schemaPrice),
    defaultValues: price,
  });
  const onSubmit = (data) => {
    handleData(data);
  };
  return (
    <div className="basic-container">
      <div className="basic-header">
        <CreditIcon className="icon-header" />
        <Typography.Text className="text-header">Price</Typography.Text>
      </div>
      <Wrapper>
        {/* controller */}
        <div>
          <Form
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            layout="vertical"
            form={formPrice}
            onFinish={handleSubmit(onSubmit)}
          >
            <Tabs
              type="card"
              onTabClick={(key) => {
                if (key === "true") {
                  setValue("isFree", true);
                  setValue("price", 0);
                  setValue("salePrice", 0);
                } else {
                  setValue("isFree", false);
                  setValue("isRequiredEnroll", false);
                }
              }}
              defaultActiveKey={getValues("isFree").toString()}
            >
              <TabPane
                tab={
                  <>
                    <TagOutlined />
                    <Typography.Text>Free</Typography.Text>
                  </>
                }
                key={"true"}
              >
                <div className="display-flex flex-column align-item-center">
                  <div className="mg-y">
                    <Controller
                      name="isRequiredEnroll"
                      control={control}
                      render={({ field }) => {
                        return <Switch checked={field.value} {...field} />;
                      }}
                    />
                    <Typography.Text style={{ marginLeft: 16 }}>
                      Require Enroll
                    </Typography.Text>
                  </div>

                  <div>
                    <Typography.Text>
                      If the course is free, if student require to enroll your
                      course, if not required enroll, if students required sign
                      in to your website to take this course.
                    </Typography.Text>
                  </div>
                </div>
              </TabPane>
              <TabPane
                tab={
                  <div>
                    <ShoppingCartOutlined />
                    <Typography.Text>Paid</Typography.Text>
                  </div>
                }
                key={"false"}
              >
                <div className="paid-area">
                  <Form.Item label="Regular Price*">
                    <Controller
                      name="price"
                      control={control}
                      render={({ field }) => (
                        <>
                          <Input {...field} placeholder="$0" suffix="USD" />
                          {errors.price && (
                            <p className="error-message">
                              {errors.price?.message}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </Form.Item>
                  <Form.Item label="Discount Price">
                    <Controller
                      name="salePrice"
                      control={control}
                      render={({ field }) => (
                        <>
                          <Input {...field} placeholder="$0" suffix="USD" />
                          {errors.salePrice && (
                            <p className="error-message">
                              {errors.salePrice?.message}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </Form.Item>
                </div>
              </TabPane>
            </Tabs>
            <button
              type="submit"
              ref={handleDataPrice}
              className="btn-hidden"
            ></button>
          </Form>
        </div>
      </Wrapper>
    </div>
  );
}
