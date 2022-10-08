import styled from "styled-components";

const SocialsGroupActionWrapper = styled.div`
  &&& {
    .socials-group-action_wrap {
      margin: 16px 0;
      .socials-group-action_icon {
        cursor: pointer;
        z-index: 10;
        width: 36px;
        height: 36px;
        font-size: 4rem;
        display: flex;
        padding: 5px;
        fill: #fff;
        border-radius: 3px;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
        &:hover {
          transform: scale(1.1);
        }
      }
      .socials-group-action_facebook-icon {
        background-color: #3b5998;
      }
      .socials-group-action_twitter-icon {
        background-color: #1da1f2;
      }
      .socials-group-action_linkedin-icon {
        background-color: #8d6cab;
      }
      .socials-group-action_youtube-icon {
        background-color: #ff0000;
      }
    }
  }
`;

export default SocialsGroupActionWrapper;
