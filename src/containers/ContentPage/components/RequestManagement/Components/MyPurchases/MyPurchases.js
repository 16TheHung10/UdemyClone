import Wrapper from "./MyPurchasesStyle";
import CoursesPurchased from "containers/ContentPage/components/InstructorDetail/components/CoursesPurchased/CoursesPurchased";
import { selectPurchasedCourses } from "redux/features/courses/coursesSelector";
import { useSelector, useDispatch } from "react-redux";

function MyPurchases() {
  const myPurchasedCourses = useSelector(selectPurchasedCourses);

  return (
    <Wrapper>
      <CoursesPurchased data={myPurchasedCourses} />
    </Wrapper>
  );
}

export default MyPurchases;
