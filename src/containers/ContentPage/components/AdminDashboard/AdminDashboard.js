// ANT design
import { Col, Row } from "antd";
// SVG
import { ReactComponent as AchievementIcon } from "assets/svg/achievement.svg";
import { ReactComponent as AdministratorIcon } from "assets/svg/administrator.svg";
import { ReactComponent as GraduationIcon } from "assets/svg/graduation.svg";
import { ReactComponent as KnowledgeIcon } from "assets/svg/knowledge.svg";
import { ReactComponent as OnlineCourseIcon } from "assets/svg/online-course.svg";
import { useEffect, useState } from "react";
// redux of sidebar
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "redux/features/auth/AuthSelector";
import { sideBarAction } from "redux/features/sidebar/sidebarSlice";
// style component
import Wrapper from "./AdminDashboardStyle";

// APi
import {getAllOrder} from "apis/features/Order/Order"
import {getUserByRole} from "apis/features/userApi"
import {getCoursesByOrderAndPage} from "apis/features/Courses/Courses"

function AdminDashboard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [totalSale,setTotalSale]=useState(0)
  const [totalStudent,setTotalStudent]=useState(0)
  const [totalInstructor,setTotalInstructor]=useState(0)
  const [totalCourses,setTotalCourses]=useState(0)

  //get all order
  const getDataOrder = async ()=>{
    const response = await getAllOrder()
    const result =response?.data?.data?.reduce((acc,cur)=>{
      return acc+cur?.total
    },0)
    setTotalSale(result)
  }

  //get all student, instructor
  const getDataUser = async (role)=>{
    const response = await getUserByRole(role)
    if(role==="Student"){
      setTotalStudent(response.data.data.length)
    }else{
      setTotalInstructor(response.data.data.length)
    }
    
  }

  //get all courses
  const getDataCourses = async ()=>{
    const response = await getCoursesByOrderAndPage(1,10,"createdAt","desc")
    setTotalCourses(response.data.data.totalResult)
  }

  // Set state of redux side bar
  const userProfile = useSelector(selectUser)
  useEffect(() => {
    // Lấy số liệu dashboard
    getDataOrder()
    getDataUser("Student")
    getDataUser("Instructor")
    getDataCourses()
    // End
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
          <AdministratorIcon style={{ marginRight: 4 }} />
          Admin Dashboard
        </h2>
      </div>
      {/* Area 2 */}
      <Row>
        <Col xs={24} md={12} xxl={6} className="info-area">
          <div className="info-area-1">
            <h5>Total Sales</h5>
            <h2>{`$${totalSale}`}</h2>
            {/* <span style={{ backgroundColor: "#ffc136" }}>New 0</span> */}
          </div>

          <div className="info-area-2">
            <AchievementIcon width={70} height={70} />
          </div>
        </Col>
        <Col xs={24} md={12} xxl={6} className="info-area">
          <div className="info-area-1">
            {/* Chưa có data */}
            <h5>Total Instructor</h5>
            <h2>{totalInstructor}</h2>
            {/* <span style={{ backgroundColor: "#c182f9" }}>New 0</span> */}
          </div>

          <div className="info-area-2">
            <GraduationIcon width={70} height={70} />
          </div>
        </Col>
        <Col xs={24} md={12} xxl={6} className="info-area">
          <div className="info-area-1">
            <h5>Total Courses</h5>
            <h2>{totalCourses}</h2>
            {/* <span style={{ backgroundColor: "#ffa052" }}>New 0</span> */}
          </div>

          <div className="info-area-2">
            <OnlineCourseIcon width={70} height={70} />
          </div>
        </Col>
        <Col xs={24} md={12} xxl={6} className="info-area">
          <div className="info-area-1">
            <h5>Total Students</h5>
            <h2>{totalStudent}</h2>
            {/* <span style={{ backgroundColor: "#cca1ff" }}>New 0</span> */}
          </div>

          <div className="info-area-2">
            <KnowledgeIcon width={70} height={70} />
          </div>
        </Col>
      </Row>
    </Wrapper>
  );
}

export default AdminDashboard;
