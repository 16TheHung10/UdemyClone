import styled from "styled-components";

const HomePageWrapper = styled.div`
  &&& {
    width: 100%;
    background-color: #f7f7f7;
    .container-right,
    .container-left {
      padding: 20px;
    }
    .container-left {
      padding: 32px;
    }
    .home-page_slider-title {
      margin: 0;
    }
    .home-page_end {
      padding: 20px;
    }
    .home-page_live-stream {
    }
    .home-page_instructors,
    .home-page_statistics,
    .home-page_newest-courses {
      margin-top: 32px;
    }
    .home-page_wrapper {
      width: 100%;
    }
    .home-page_section-header-wrapper {
      display: flex;
      align-items: end;
      justify-content: space-between;
      margin-bottom: 8px;
      .home-page_link {
        color: var(--text-color);
        opacity: 0.5;
        font-weight: bold;
        &:hover {
          opacity: 1;
          color: black;
        }
      }
    }
  }
`;

export default HomePageWrapper;
