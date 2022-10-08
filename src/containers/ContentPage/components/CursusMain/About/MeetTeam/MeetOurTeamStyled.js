import styled from "styled-components";
export const MeetOurTeamStyled = styled.div`
  .meet-team {
    &-subtitle {
      width: 55%;
      margin: auto;
    }
    &-content {
      margin-top: 5rem;
      &-left {
        display: flex;
        flex-direction: column;
        justify-content: start;
      }
      &-paragraph {
        text-align: justify;
      }
      &-button {
        background: #ed2a26;
        color: white;
        width: 30%;
        height: 4rem;
        border-radius: 4px;

        &:hover {
          background: black;
          border: 1px solid white;
        }
      }
      &-img {
        border-radius: 7px;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px,
          rgba(0, 0, 0, 0.23) 0px 3px 6px;
      }
    }
  }
`;
