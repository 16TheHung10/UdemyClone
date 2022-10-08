import styled from "styled-components";

const StudentFeedbackCardWrapper = styled.div`
  &&& {
    width: 100%;
    background-color: #fff;
    padding: 30px;
    height: 100%;
    border: 1px solid #efefef;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    .student-feedback-card_content {
      color: var(--text-color);
      font-size: 1.4rem;
    }
    .student-feedback-card_space {
      margin-top: auto;
    }
    .student-feedback-card_name {
      font-size: 1.8rem;
    }
  }
`;

export default StudentFeedbackCardWrapper;