import styled from "styled-components";

const Wrapper = styled.div`
  &&& {
    padding: 4rem 0.8rem;
    /* Area 1 */
    .title-area h2 {
      padding-right: 1.5rem;
      padding-left: 1.5rem;
      font-size: 2rem;
      font-weight: 501;
      font-family: roboto, sans-serif;
      color: #333;
      
    }

    /* Area 2 */
    .info-area {
      min-width: 36rem;
      display: flex;
      align-content: center;
      justify-content: space-between;
      padding: 0.8rem;
      background: #fff;
      border-width: 0.8rem;
      border-style: solid;
      border-color: #f0f2f5;
    }

    .info-area h5 {
      font-size: 1.6rem;
      color: #333;
      font-family: roboto, sans-serif;
      font-weight: 501;
    }

    .info-area h2 {
      font-size: 2.4rem;
      color: #333;
      font-family: roboto, sans-serif;
      font-weight: 501;
    }

    .info-area span {
      font-size: 1.2rem;
      font-weight: 500;
      font-family: roboto, sans-serif;
      color: #fff;
      padding: 0.5rem 1rem;
      border-radius: 0.3rem;
    }

    /* Area 3 */
    .news-area {
      padding-right: 2.5rem;
      padding-left: 2.5rem;
      padding-bottom: 2rem;
    }

    .news-area h4 {
      font-size: 1.8rem;
      font-weight: 501;
      font-family: roboto, sans-serif;
      color: #333;
      margin-bottom: 2.4rem;
    }

    .news-area .slider-area {
      padding: 1rem;
      background: #fff;
      width: 100%;
    }

    .new-edututs {
      padding: 0 1rem 2rem;
    }

    .new-edututs a {
      font-size: 1.4rem;
      font-family: roboto, sans-serif;
      font-weight: 400;
      color: #333;
      padding: 1.5rem 1rem;
    }
    .sub-title-subscribers {
      font-size: 1.4rem;
      font-weight: 400;
      font-family: "Roboto", sans-serif;
      color: #686f7a;
    }
    .news-subscribers > p {
      font-size: 2.4rem;
      font-weight: 501;
      font-family: "Roboto", sans-serif;
      color: #333;
    }
  }
`;

export default Wrapper;
