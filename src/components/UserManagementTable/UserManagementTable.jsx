import {
  Button,
  Space,
  Table,
  Typography,
  Switch,
  Popconfirm,
  Modal,
  Tabs,
} from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import AccountSetting from "containers/ContentPage/components/Setting/components/AccountSetting/AccountSetting";
import { default as React, useState } from "react";
import CoursesOfInstructor from "containers/ContentPage/components/InstructorManagement/components/CoursesOfInstructor/CoursesOfInstructor";
import useSearchTable from "hooks/useSearchTable";
import StringUtils from "utils/StringUtils";
import * as userApis from "apis/features/userApi";
import * as studentSelector from "redux/features/student/studentSelector";
import * as studentThunk from "redux/features/student/studentThunk";
import * as instructorSelector from "redux/features/instructor/instructorSelector";
import * as instructorThunk from "redux/features/instructor/instructorThunk";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

const { TabPane } = Tabs;

const UserManagementTableWrapper = styled.div`
  &&& {
    .ant-table-content {
      scrollbar-color: #d2d2d2;
      scrollbar-width: thin;
      overflow: -moz-scrollbars-vertical;
      &::-webkit-scrollbar {
        width: 20px;
      }
      &::-webkit-scrollbar-track {
        background-color: transparent;
      }
      &::-webkit-scrollbar-thumb {
        border: 5px solid transparent;
        border-radius: 100px;
        background-color: #d2d2d2;
        background-clip: content-box;
      }
    }
  }
`;

function UserManagementTable(props) {
  const { getColumnSearchProps } = useSearchTable();
  const { data, tableRowSelection, modalTitle, type } = props;
  const [userData, setUserData] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalData, setModalData] = useState({});

  React.useEffect(() => {
    handleGetUserData();
  }, [type]);

  const handleGetUserData = async () => {
    setDataLoading(true);
    const res = await userApis.getUserByRole(type);
    setUserData(res.data.data);
    setDataLoading(false);
  };

  const hideSwitchHandler = () => {};

  const switchActiveHandler = async (id) => {
    await userApis.toggleActiveUser(id);
    await handleGetUserData();
  };

  const showModal = (data) => {
    setVisibleModal(true);
    setModalData(data);
  };

  const handleOk = () => {
    setVisibleModal(false);
  };

  const handleCancel = () => {
    setVisibleModal(false);
  };

  const handleTableChange = (newPagination, filters, sorter, search) => {
    console.log(
      "page=",
      newPagination,
      "filter=",
      filters,
      "sorter=",
      sorter,
      "search=",
      search
    );
  };

  const studentColumns = [
    {
      title: "",
      dataIndex: "image",
      key: "imageUrl",
      align: "center",
      width: "72px",
      render: (text, record) => (
        <img
          style={{ width: "52px", height: "52px" }}
          alt=""
          src={record.image}
        />
      ),
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      align: "center",
      ...getColumnSearchProps("userName"),
      sorter: (a, b) => {
        if (!a.userName) {
          return 1;
        }

        if (!b.userName) {
          return -1;
        }
        if (a.userName < b.userName) return -1;
        else return 1;
      },
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      align: "center",
      ...getColumnSearchProps("firstName"),
      sorter: (a, b) => {
        if (!a.firstName) {
          return 1;
        }
        if (!b.firstName) {
          return -1;
        }
        if (
          StringUtils.removeVietnameseTones(a.firstName) <
          StringUtils.removeVietnameseTones(b.firstName)
        )
          return -1;
        else return 1;
      },
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      align: "center",
      ...getColumnSearchProps("lastName"),
      sorter: (a, b) => {
        if (!a.lastName) {
          return 1;
        }
        if (!b.lastName) {
          return -1;
        }
        if (
          StringUtils.removeVietnameseTones(a.lastName) <
          StringUtils.removeVietnameseTones(b.lastName)
        )
          return -1;
        else return 1;
      },
    },
    {
      title: "Active",
      dataIndex: "",
      key: "toggleActive",
      align: "center",
      fixed: "right",
      width: "100px",
      filters: [
        {
          text: "Active",
          value: true,
        },
        {
          text: "Blocked",
          value: false,
        },
      ],
      onFilter: (value, record) => record.isActive === value,
      render: (_, record) => (
        <Popconfirm
          onConfirm={() => switchActiveHandler(record.id)}
          onCancel={() => console.log("cancel")}
          title={`Are you sure you want to ${
            record.isActive ? "deactivate" : "activate"
          } this account`}
          content={
            <Space
              style={{ width: "100%", justifyContent: "center" }}
              size={32}
            >
              <Button>Cancel</Button>
              <Button type="primary" danger onClick={hideSwitchHandler}>
                Accept
              </Button>
            </Space>
          }
          trigger="click"
        >
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked
            checked={record.isActive}
          />
        </Popconfirm>
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      fixed: "right",
      width: "10%",
      align: "center",
      render: (_, record) => (
        <Space>
          <Button onClick={() => showModal(record)} type="primary">
            View Detail
          </Button>
        </Space>
      ),
    },
  ];

  const instructorColumns = [
    {
      title: "",
      dataIndex: "image",
      key: "imageUrl",
      align: "center",
      width: "72px",
      render: (text, record) => (
        <img
          style={{ width: "52px", height: "52px" }}
          alt=""
          src={record.image}
        />
      ),
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      align: "center",
      ...getColumnSearchProps("userName"),
      sorter: (a, b) => {
        if (!a.userName) {
          return 1;
        }

        if (!b.userName) {
          return -1;
        }
        if (a.userName < b.userName) return -1;
        else return 1;
      },
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      align: "center",
      ...getColumnSearchProps("firstName"),
      sorter: (a, b) => {
        if (!a.firstName) {
          return 1;
        }
        if (!b.firstName) {
          return -1;
        }
        if (
          StringUtils.removeVietnameseTones(a.firstName) <
          StringUtils.removeVietnameseTones(b.firstName)
        )
          return -1;
        else return 1;
      },
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      align: "center",
      ...getColumnSearchProps("lastName"),
      sorter: (a, b) => {
        if (!a.lastName) {
          return 1;
        }
        if (!b.lastName) {
          return -1;
        }
        if (
          StringUtils.removeVietnameseTones(a.lastName) <
          StringUtils.removeVietnameseTones(b.lastName)
        )
          return -1;
        else return 1;
      },
    },
    {
      title: "Total Course",
      dataIndex: "courseNumber",
      key: "courseNumber",
      align: "center",
    },
    {
      title: "Active",
      dataIndex: "",
      key: "toggleActive",
      align: "center",
      fixed: "right",
      width: "100px",
      filters: [
        {
          text: "Active",
          value: true,
        },
        {
          text: "Blocked",
          value: false,
        },
      ],
      onFilter: (value, record) => record.isActive === value,
      render: (_, record) => (
        <Popconfirm
          onConfirm={() => switchActiveHandler(record.id)}
          onCancel={() => console.log("cancel")}
          title={`Are you sure you want to ${
            false ? "deactivate" : "activate"
          } this account`}
          content={
            <Space
              style={{ width: "100%", justifyContent: "center" }}
              size={32}
            >
              <Button onClick={hideSwitchHandler}>Cancel</Button>
              <Button type="primary" danger onClick={hideSwitchHandler}>
                Accept
              </Button>
            </Space>
          }
          trigger="click"
        >
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked
            checked={record.isActive}
          />
        </Popconfirm>
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      align: "center",
      width: "10%",
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Button onClick={() => showModal(record)} type="primary">
            View Detail
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <UserManagementTableWrapper>
      <Modal
        destroyOnClose={true}
        visible={visibleModal}
        style={{ top: 20 }}
        width={1000}
        title={modalTitle}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Back
          </Button>,
        ]}
      >
        <Tabs defaultActiveKey="1" type="card" centered={true}>
          <TabPane tab="Profile" key="1">
            <AccountSetting data={modalData} type="Instructor" />
          </TabPane>
          {type === "Instructor" && (
            <TabPane tab="Courses" key="2">
              <CoursesOfInstructor id={modalData.id} />
            </TabPane>
          )}
        </Tabs>
      </Modal>
      <Typography.Title level={4}>{type} Management</Typography.Title>
      <Table
        onChange={handleTableChange}
        // rowSelection={{ onChange: (data) => tableRowSelection(data) }}
        rowKey="id"
        loading={dataLoading}
        columns={type === "Instructor" ? instructorColumns : studentColumns}
        dataSource={userData}
        scroll={{
          x: 1400,
        }}
      ></Table>
    </UserManagementTableWrapper>
  );
}

export default UserManagementTable;
