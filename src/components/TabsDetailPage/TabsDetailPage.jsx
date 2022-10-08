import { Tabs } from "antd";
import React from "react";
import TabsDetailPageWrapper from "./TabsDetailPage.styled";

function TabsDetailPage(props) {
  const { tabPanes } = props;
  const _props = { ...props };
  delete _props.tabPanes;
  return (
    <>
      <TabsDetailPageWrapper {..._props} className="tabs-detail-page_tabs">
        {tabPanes.map((tabPane) => (
          <Tabs.TabPane tab={tabPane.tab} key={tabPane.key}>
            {tabPane.tabContent}
          </Tabs.TabPane>
        ))}
      </TabsDetailPageWrapper>
    </>
  );
}

export default TabsDetailPage;
