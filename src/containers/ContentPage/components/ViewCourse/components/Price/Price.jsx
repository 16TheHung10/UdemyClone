import { ShoppingCartOutlined, TagOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Input, Switch, Tabs, Typography } from "antd";
import { CreditIcon } from "assets/IconComponent";
import { schemaPrice } from "containers/ContentPage/components/CreateCourse/validate/schema";
import { Controller, useForm } from "react-hook-form";
import Wrapper from "../Media/MediaStyled";
const { TabPane } = Tabs;

export default function Price({ price }) {
  const [formPrice] = Form.useForm();
  const { control, getValues } = useForm({
    resolver: yupResolver(schemaPrice),
    defaultValues: price,
  });
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
          >
            <Tabs type="card" activeKey={getValues("isFree").toString()}>
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
                        return (
                          <Switch checked={field.value} disabled {...field} />
                        );
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
                          <Input
                            {...field}
                            readOnly
                            placeholder="$0"
                            suffix="USD"
                          />
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
                          <Input
                            {...field}
                            readOnly
                            placeholder="$0"
                            suffix="USD"
                          />
                        </>
                      )}
                    />
                  </Form.Item>
                </div>
              </TabPane>
            </Tabs>
          </Form>
        </div>
      </Wrapper>
    </div>
  );
}
