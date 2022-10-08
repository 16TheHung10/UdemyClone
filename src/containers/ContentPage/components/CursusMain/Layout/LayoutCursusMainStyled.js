import styled from "styled-components";
import TitleBg from "assets/images/title_bg.jpg";

export const ContainerLayout = styled.div`
  min-width: 47.5rem;
  width: 100%;
  margin: auto;
  @media screen and (max-width: 575.98px) {
    padding: 0 1rem;
  }
  @media screen and (min-width: 576px) {
    max-width: 520px;
  }
  @media screen and (min-width: 767.98px) {
    max-width: 720px;
  }
  @media screen and (min-width: 991.98px) {
    max-width: 960px;
  }
  @media screen and (min-width: 1200px) {
    max-width: 1200px;
  }
`;
export const Wraper = styled.div`
  min-width: 47.5rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .layout-header {
    background: url(${TitleBg}) center bottom repeat-x;
    background-size: contain;
    padding-top: 2rem;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 1;
      background: #ffffffd6;
    }
    &-navbar {
      position: relative;
      z-index: 10;
    }
    &-title {
      margin: 5.5rem 0;
      text-align: center;
    }
  }
  .content {
    width: 100%;
    background: #f7f7f7;

    &-main {
      margin: auto;
    }
  }
`;
