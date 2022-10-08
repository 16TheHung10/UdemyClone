import { Button, Space, Table, Typography, Popconfirm, Switch } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import * as studentSelector from "redux/features/student/studentSelector";
import UserManagementTable from "components/UserManagementTable/UserManagementTable";

import styled from "styled-components";

const StudentManagementWrapper = styled.div`
  &&& {
    padding: 30px;
    @media (max-width: 500px) {
      padding: 10px;
    }
  }
`;

function StudentManagement(props) {
  const studentData = useSelector(studentSelector.selectStudents);

  const handleRowSelection = (data) => {
    console.log(data);
  };
  return (
    <StudentManagementWrapper>
      <UserManagementTable
        data={studentData}
        tableRowSelection={handleRowSelection}
        modalTitle={"Student Detail"}
        type={"Student"}
      />
    </StudentManagementWrapper>
  );
}

export default StudentManagement;
