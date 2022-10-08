import styled from "styled-components";

const CardBrowserInstructorWrapper = styled.div`
  &&& {
    padding:8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 0.5rem;
    width:100%;
    height: 30rem;
    h3 {
      font-size: 16px;
      font-weight: 501;
      font-family: "Roboto", sans-serif;
      color: #333;
      margin-top:6px
    }
    .card-introduction {
      font-size: 13px;
      color: #686f7a;
      text-align:center;
      font-family: "Roboto", sans-serif;
      font-weight: 400;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      width:90%;
      /* margin-top: 6px;
      margin-bottom: 17px;
      ; */
    }
    .number-student-course{
      display: flex;
      justify-content:space-around
    }
  }
`;

export default CardBrowserInstructorWrapper;
