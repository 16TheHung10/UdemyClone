import styled from "styled-components";
export const NoteItemStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  cursor: pointer;
  .header {
    display: flex;
    justify-content: space-between;
    background: #ed2a26;
    color: white;
    padding: 2rem;
    border-radius: 1rem;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    &-title {
      font-weight: 700;
    }
    p {
      margin: 0;
      line-height: 1rem;
    }
  }
  .content {
    border: 1px solid black;
    border-radius: 1rem;
    padding: 2rem;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`;
