import Wrapper from "./MyPurchasesStyle";
import MyPurchasedCourseTable from 'containers/ContentPage/components/MyPurchasedCourseTable/MyPurchasedCourseTable'
import {  useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMyPurchasedCourses } from "redux/features/courses/coursesThunk";

function MyPurchases() {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getMyPurchasedCourses());
  },[])

  return (
    <Wrapper>
      <MyPurchasedCourseTable />
    </Wrapper>
  );
}

export default MyPurchases;
