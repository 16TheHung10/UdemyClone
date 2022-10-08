import {
  CheckCircleOutlined
} from "@ant-design/icons";
import TabsDetailPage from "components/TabsDetailPage/TabsDetailPage";
import React, { useEffect } from "react";
// redux of sidebar
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "redux/features/auth/AuthSelector";
// ANT design
import { sideBarAction } from "redux/features/sidebar/sidebarSlice";
import ApprovedCourses from "./Component/ApprovedCourses/ApprovedCourses";
import PendingCourses from "./Component/PendingCourses/PendingCourses";
import RejectCourses from "./Component/RejectCourses/RejectCourses";
// style component
import Wrapper from "./CreatedCoursesManagementStyle";

function CreatedCoursesManagement(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProfile = useSelector(selectUser);
  const tabPanesConfig = [
    { key: "1", tab: "Pending courses", tabContent: <PendingCourses /> },
    {
      key: "2",
      tab: "Approved courses",
      tabContent: <ApprovedCourses />,
    },
    {
      key: "3",
      tab: "Rejected courses",
      tabContent: <RejectCourses />,
    },
  ];

  useEffect(() => {
    if (userProfile?.role !== "Admin") {
      navigate("/");
    }
    dispatch(sideBarAction.changeToDashboard());
  }, []);

  return (
    <Wrapper>
      {/*Area 1  */}
      <div className="title-area">
        <h2>
          <CheckCircleOutlined style={{ marginRight: 8 }} />
          Requested Courses Management
        </h2>
      </div>
      {/*Area 2: Tabpane  */}
      <TabsDetailPage
        defaultActiveKey="1"
        tabBarStyle={{ fontWeight: "bold" }}
        centered
        tabPanes={tabPanesConfig}
      />
    </Wrapper>
  );
}

export default CreatedCoursesManagement;
