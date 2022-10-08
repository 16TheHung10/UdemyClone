import { Button, Modal, Popconfirm, Space, Table, Tabs, Tag } from "antd";
import * as userApis from "apis/features/userApi";
import AccountSetting from "containers/ContentPage/components/Setting/components/AccountSetting/AccountSetting";
import useSearchTable from "hooks/useSearchTable";
import React, { useState } from "react";
import styled from "styled-components";
import { ApproveButton, RejectButton } from "Theme/GlobalStyles";

const { TabPane } = Tabs;

const RoleRequestManagementTableWrapper = styled.div`
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
    @media (max-width: 500px) {
      padding: 10px;
    }
  }
`;

const color = ["magenta", "volcano", "purple", "orange", "volcano", "gold"];

function RoleRequestManagementTable(props) {
  const { type, onUpdateData, isLoading, data } = props;
  const { getColumnSearchProps } = useSearchTable();
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const popConfirm = async (data) => {
    await onUpdateData(data);
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

  const columns = [
    {
      title: "",
      dataIndex: "",
      key: "imageUrl",
      align: "center",
      width: "70px",
      render: (text, record) => (
        <img
          style={{ width: "52px", height: "52px" }}
          alt=""
          src={record.user.image}
        />
      ),
    },
    {
      title: "User Name",
      dataIndex: "email",
      key: "userName",
      align: "center",
      ...getColumnSearchProps("email"),
      sorter: (a, b) => {
        if (!a.email) {
          return 1;
        }

        if (!b.email) {
          return -1;
        }
        if (a.email < b.email) return -1;
        else return 1;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
    {
      title: "Category",
      dataIndex: "categories",
      key: "categories",
      align: "center",
      render: (_, record) => {
        return record.categories.map((category, index) => (
          <Tag color={color[index]}>{category.name}</Tag>
        ));
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      filters: [
        {
          text: "Pending",
          value: 0,
        },
        {
          text: "Approved",
          value: 1,
        },
        {
          text: "Rejected",
          value: 2,
        },
      ],
      onFilter: (value, record) => record.status === value,
      render: (text) => (
        <>
          {text === 0 && <Tag color="#108ee9">Pending</Tag>}
          {text === 1 && <Tag color="#87d068">Approved</Tag>}
          {text === 2 && <Tag color="#f50">Rejected</Tag>}
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      fixed: "right",
      align: "center",
      width: "12%",
      render: (_, record) => {
        return type === 0 ? (
          <Space direction="vertical">
            <Button onClick={() => showModal(record.user)} type="primary">
              View Detail
            </Button>
            <Popconfirm
              placement="left"
              onConfirm={() => popConfirm({ id: record.id, status: 1 })}
              // onCancel={() => console.log("cancel")}
              title={`Are you sure you want to approve this request?`}
              content={
                <Space
                  style={{ width: "100%", justifyContent: "center" }}
                  size={32}
                >
                  <Button>Cancel</Button>
                  <ApproveButton type="primary">Approve</ApproveButton>
                </Space>
              }
              trigger="click"
            >
              <ApproveButton type="primary" style={{ width: "100%" }}>
                Approve
              </ApproveButton>
            </Popconfirm>

            <Popconfirm
              onConfirm={() => popConfirm({ id: record.id, status: 2 })}
              // onCancel={() => console.log("cancel")}
              placement="left"
              title={`Are you sure you want to reject this request?`}
              content={
                <Space
                  style={{ width: "100%", justifyContent: "center" }}
                  size={32}
                >
                  <Button>Cancel</Button>
                  <RejectButton type="primary">Reject</RejectButton>
                </Space>
              }
              trigger="click"
            >
              <RejectButton style={{ width: "100%" }} type="primary">
                Reject
              </RejectButton>
            </Popconfirm>
          </Space>
        ) : (
          <Button onClick={() => showModal(record.user)} type="primary">
            View Detail
          </Button>
        );
      },
    },
  ];
  return (
    <RoleRequestManagementTableWrapper>
      <Modal
        destroyOnClose={true}
        visible={visibleModal}
        style={{ top: 20 }}
        width={1000}
        title={"User Detail"}
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
        </Tabs>
      </Modal>
      <Table
        rowKey="id"
        onChange={handleTableChange}
        // rowSelection={{ onChange: (data) => console.log(data) }}
        loading={isLoading}
        dataSource={data}
        columns={columns}
        scroll={{
          x: 1400,
        }}
      ></Table>
    </RoleRequestManagementTableWrapper>
  );
}

export default RoleRequestManagementTable;
