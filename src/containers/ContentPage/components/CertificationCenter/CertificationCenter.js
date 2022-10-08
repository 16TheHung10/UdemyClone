import React from "react";
import {
  Wrapper,
  Container,
  CertificateCard,
  SectionButton,
} from "./CertificationStyled";
import {
  Typography,
  Image,
  Button,
  Form,
  Input,
  Col,
  Row,
  InputNumber,
  Tabs,
} from "antd";
import { Select } from "antd";

const { Option } = Select;
const { Title, Text } = Typography;
const { TabPane } = Tabs;
export default function CertificationCenter() {
  return (
    <Wrapper>
      <section className="banner">
        <div className="banner-content">
          <Title className="banner-title">Certification Center </Title>
          <Text className="banner-sub-title">For Students and Instructors</Text>
          <div className="banner-icon-container">
            <Image
              preview={false}
              width={135}
              src="https://gambolthemes.net/html-items/cursus_main_demo/images/logo1.svg"
            />
            <Image
              preview={false}
              width={80}
              src="https://gambolthemes.net/html-items/cursus_main_demo/images/cerificate_center/plus.svg"
            />
            <Image
              preview={false}
              width={135}
              src="https://gambolthemes.net/html-items/cursus_main_demo/images/cerificate_center/certicon.svg"
            />
          </div>
          <SectionButton>Start Certification</SectionButton>
        </div>
      </section>

      <section className="section find-certif">
        <Title className="section-title">Find Certificate</Title>
        <Container>
          <Form name="basic" wrapperCol={{ span: 24 }} autoComplete="off">
            <Row gutter={[8, 8]}>
              <Col xs={24} sm={12} md={6}>
                <Form.Item name="number">
                  <Input placeholder="#Number" className="find-certif-input" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Form.Item name="fullName  ">
                  <Input
                    placeholder="Full name"
                    className="find-certif-input"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Form.Item name="password">
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Search to Select"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    filterSort={(optionA, optionB) =>
                      optionA.children
                        .toLowerCase()
                        .localeCompare(optionB.children.toLowerCase())
                    }
                  >
                    <Option value="1">Not Identified</Option>
                    <Option value="2">Closed</Option>
                    <Option value="3">Communicated</Option>
                    <Option value="4">Identified</Option>
                    <Option value="5">Resolved</Option>
                    <Option value="6">Cancelled</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Form.Item>
                  <Button
                    block
                    htmlType="submit"
                    className="find-certif-input find-certif-button"
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Container>
      </section>

      <section className="section our-certif">
        <Container>
          <Title className="section-title">Our Certification</Title>
          <Text className="text-center">
            We prepared tests for the most popular categories and get cerificate
          </Text>
          <Tabs
            defaultActiveKey="1"
            centered
            type="card"
            className="tab-container"
          >
            <TabPane tab="Development" key="1">
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12} lg={6}>
                  <CertificateCard>Development</CertificateCard>
                </Col>
                <Col xs={24} md={12} lg={6}>
                  <CertificateCard>Development</CertificateCard>
                </Col>
                <Col xs={24} md={12} lg={6}>
                  <CertificateCard>Development</CertificateCard>
                </Col>
                <Col xs={24} md={12} lg={6}>
                  <CertificateCard>Development</CertificateCard>
                </Col>
                <Col xs={24} md={12} lg={6}>
                  <CertificateCard>Development</CertificateCard>
                </Col>
                <Col xs={24} md={12} lg={6}>
                  <CertificateCard>Development</CertificateCard>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="Finance & Accounting" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Degign" key="3">
              Content of Tab Pane 3
            </TabPane>
            <TabPane tab="Marketing" key="4">
              Content of Tab Pane 3
            </TabPane>
            <TabPane tab="Teaching and Academic" key="5">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </Container>
      </section>

      <section className="section benefit">
        <Title className=" benefit-title section-title">
          Who Can Get Benefit From This?
        </Title>
        <div className="benefit-img">
          <div className="benefit-img-item">
            <div className="benefit-img-bg">
              <Image
                preview={false}
                width={90}
                height={90}
                src="https://gambolthemes.net/html-items/cursus_main_demo/images/cerificate_center/student.svg"
              />
            </div>
            <Title level={4} className="text-center benefit-img-title">
              Student
            </Title>
          </div>

          <div className="benefit-img-item">
            <div className="benefit-img-bg">
              <Image
                width={90}
                height={90}
                preview={false}
                src="https://gambolthemes.net/html-items/cursus_main_demo/images/cerificate_center/instructor.svg"
              />
            </div>
            <Title level={4} className="text-center benefit-img-title">
              Student
            </Title>
          </div>
        </div>
      </section>

      <section className="section get-what">
        <Title className="section-title">What Will You Get?</Title>
        <Text className="get-what-subtitle">
          Cursus company, which confirms your skills and knowledge of
          Certification
        </Text>
        <Text className="get-what-paragraph">
          Morbi eget elit eget turpis varius mollis eget vel massa. Donec
          porttitor, sapien eget commodo vulputate, erat felis aliquam dolor,
          non condimentum libero dolor vel ipsum. Sed porttitor nisi eget nulla
          ullamcorper eleifend. Fusce tristique sapien nisi, vel feugiat neque
          luctus sit amet. Quisque consequat quis turpis in mattis. Maecenas
          eget mollis nisl. Cras porta dapibus est, quis malesuada ex iaculis
          at. Vestibulum egestas tortor in urna tempor, in fermentum lectus
          bibendum. In leo leo, bibendum at pharetra at, tincidunt in nulla. In
          vel malesuada nulla, sed tincidunt neque. Phasellus at massa vel sem
          aliquet sodales non in magna. Ut tempus ipsum sagittis neque cursus
          euismod. Vivamus luctus elementum tortor, ac aliquet dolor vehicula
          et. Nulla vehicula pharetra lacus ornare gravida. Vivamus mollis
          ullamcorper dui quis gravida. Aenean pulvinar pulvinar arcu a suscipit
        </Text>

        <SectionButton className="knownledge-btn">Kownledge Base</SectionButton>
      </section>
    </Wrapper>
  );
}
