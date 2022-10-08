import { Tabs } from "antd";
import styled from "styled-components";

const TabsDetailPageWrapper = styled(Tabs)`
  &&& {
    .ant-tabs-tab:hover {
      color: red;
    }
    .ant-tabs-nav-wrap {
      background-color: #fff;
    }
    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
      color: red;
    }
    .ant-tabs-ink-bar {
      background: red;
    }
  }
`;

export default TabsDetailPageWrapper;