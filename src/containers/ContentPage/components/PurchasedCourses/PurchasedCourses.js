import MyPurchasedCourseTable from 'containers/ContentPage/components/MyPurchasedCourseTable/MyPurchasedCourseTable'
import { selectPurchasedCourses } from "redux/features/courses/coursesSelector";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMyPurchasedCourses } from "redux/features/courses/coursesThunk";
import Wrapper from './PurchasedCoursesStyle'
import { BookOutlined } from "@ant-design/icons";

export default function PurchasedCourses() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyPurchasedCourses());
  }, []);
  return (
    <Wrapper>
      {/*Area 1  */}
      <div className="title-area">
        <h2>
          <BookOutlined style={{ marginRight: 8 }} />
          My purchased courses
        </h2>
      </div>
      <MyPurchasedCourseTable />
    </Wrapper>
  );
}
