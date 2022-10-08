import styled from "styled-components";
export const AboutLayout = styled.div`
  width: 100%;
  min-width: 37.5rem;
  .about {
    /* &-our-feature {
      padding: 6.2rem 0;
      background: #f7f7f7;
    }
    
    &-our-global-reach {
      padding: 6.2rem 0;
      background: #f7f7f7;
    }
    &-meet-our-team {
      padding: 6.2rem 0;
      background: white;
    } */
    &-our-story {
      &-left {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .paragraph {
          text-align: justify;
          padding-top: 2.7rem;
        }
      }
    }
    &-our-global-reach {
      &-subtitle {
        padding: 0 30rem;
      }
    }
  }
`;
export const AboutSecsion = styled.div`
  padding: 6.2rem 0;
  background: ${(props) => props.bg || "white"};
  text-align: center;
`;
