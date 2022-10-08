import { Button, Col, Row, Table, Typography } from "antd";
import { columns, data } from "apis/mock/InvoiceData";
import { ReactComponent as Logo } from "assets/svg/ct_logo.svg";
import React from "react";
import {
  Wrapper,
  WrapperContent,
  WrapperFlex,
  WrapperHeader,
} from "./InvoiceStyled";
const { Text, Title, Paragraph } = Typography;
export default function InvoicePage() {
  return (
    <Wrapper>
      <WrapperHeader>
        <Logo className="logo-invoice" />
        <Title level={3} className="text-white">
          Invoice
        </Title>
      </WrapperHeader>
      <WrapperContent>
        <Row>
          <Col xs={16}></Col>
          <Col xs={8}>
            <Paragraph>Date :10 April 2022</Paragraph>
            <Paragraph>Invoice No :IVIP12023598</Paragraph>
            <Paragraph>Order ID :1258963487</Paragraph>
          </Col>
          <Col xs={24}>
            <Title level={3}>Invoice</Title>
          </Col>
          <Col xs={12}>
            <Title level={5}>To</Title>
          </Col>
          <Col xs={12}>
            <Title level={5}>Cursus</Title>
          </Col>
          <Col xs={12}>
            <Paragraph level={5}>Rock William</Paragraph>
            <Paragraph level={5}>133, Dracut</Paragraph>
            <Paragraph level={5}>Massachusetts</Paragraph>
            <Paragraph level={5}>01826</Paragraph>
            <Paragraph level={5}>United States</Paragraph>
          </Col>
          <Col xs={12}>
            <Paragraph level={5}>Cursus LTD</Paragraph>
            <Paragraph level={5}>#1234, Shahid karnail Singh Nagar,</Paragraph>
            <Paragraph level={5}>Near MBD Mall,</Paragraph>
            <Paragraph level={5}>141001</Paragraph>
            <Paragraph level={5}>Ludhiana</Paragraph>
            <Paragraph level={5}>Punjab</Paragraph>
            <Paragraph level={5}>India</Paragraph>
          </Col>
          <Col xs={24} className="margin-tab">
            <Table columns={columns} dataSource={data} pagination={false} />
          </Col>
          <Col xs={24} className="margin-tab">
            <WrapperFlex>
              <Title level={5}>Invoice Total : USD $220.00</Title>
              <Text>Paid via Paypal</Text>
            </WrapperFlex>
          </Col>
          <Col xs={18} className="margin-tab">
            <Text>Thanks for buying.</Text>
          </Col>
          <Col xs={6} className="margin-tab">
            <Button className="btn-print" type="primary" block danger>
              Print
            </Button>
          </Col>
        </Row>
      </WrapperContent>
    </Wrapper>
  );
}
