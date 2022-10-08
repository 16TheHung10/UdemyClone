import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Collapse, Typography } from "antd";
import { faqList } from "apis/mock/PaidMembership";
import React from "react";
import { WrapperFaq, WrapperPaid } from "./PaidMembershipStyled";

const { Panel } = Collapse;
export default function FaqPanel() {
  const renderPanelFaq = () => {
    return faqList.map((item, index) => {
      return (
        <Panel
          collapsible={item.isDisable ? `disabled` : ``}
          header={
            <Typography.Text className="benefit-text">
              {item.title}
            </Typography.Text>
          }
          key={index}
        >
          <Typography.Text>{item.describeText}</Typography.Text>
        </Panel>
      );
    });
  };
  return (
    <WrapperPaid>
      <WrapperFaq>
        <Collapse
          key={"collapse3"}
          ghost
          expandIcon={({ isActive }) => {
            return isActive ? (
              <MinusOutlined className="icon-paid" />
            ) : (
              <PlusOutlined className="icon-paid" />
            );
          }}
          expandIconPosition="end"
        >
          {renderPanelFaq()}
        </Collapse>
      </WrapperFaq>
    </WrapperPaid>
  );
}
