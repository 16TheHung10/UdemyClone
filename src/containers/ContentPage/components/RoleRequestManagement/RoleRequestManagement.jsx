import { Typography } from "antd";
import React, { useState } from "react";
import TabsDetailPage from "components/TabsDetailPage/TabsDetailPage";
import RoleRequestManagementTable from "./components/RoleRequestManagementTable";
import * as userApis from "apis/features/userApi";

function RoleRequestManagement(props) {
  const [requestData, setRequestData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [userData, setUserData] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  React.useEffect(() => {
    getAllRequest();
  }, []);

  const getAllRequest = async () => {
    setIsLoading(true);
    try {
      const res = await userApis.getAllUserRequest();

      const data = res.data.data.map((request) => ({
        ...request,
        email: request.user.email,
      }));
      setRequestData(data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      throw new Error(err.message);
    }
  };

  const updateData = async (data) => {
    await userApis.updateUserRole(data);
    await getAllRequest();
  };

  const tabPanesConfig = [
    {
      key: "1",
      tab: "Pending",
      tabContent: (
        <RoleRequestManagementTable
          type={0}
          isLoading={isLoading}
          onUpdateData={updateData}
          data={requestData.filter((data) => data.status === 0)}
        />
      ),
    },
    {
      key: "2",
      tab: "Approved",
      tabContent: (
        <RoleRequestManagementTable
          isLoading={isLoading}
          type={1}
          data={requestData.filter((data) => data.status === 1)}
        />
      ),
    },
    {
      key: "3",
      tab: "Rejected",
      tabContent: (
        <RoleRequestManagementTable
          isLoading={isLoading}
          type={2}
          data={requestData.filter((data) => data.status === 2)}
        />
      ),
    },
  ];
  return (
    <div style={{ padding: "30px" }}>
      <Typography.Title level={4}>Request Management</Typography.Title>
      <TabsDetailPage
        defaultActiveKey="1"
        tabBarStyle={{ fontWeight: "bold" }}
        centered
        tabPanes={tabPanesConfig}
      />
    </div>
  );
}

export default RoleRequestManagement;
