import { Button } from "antd";
import styled from "styled-components";
import BannerImg from "assets/images/certification_center_bg.jpg";
//================== Component Container============================
const containerWidth = "50%";
export const ContainerFluid = styled.div`
  width: 100%;
`;
export const Container = styled.div`
  width: ${containerWidth};
  margin: auto;
  @media only screen and (max-width: 575.98px) {
    width: 90%;
  }
`;
//==================End Component Container============================

//==================Component Wraper============================

export const Wrapper = styled.div`
  &&& {
    min-width: 37.5rem !important;
    width: 100%;
    text-align: center;
    .banner {
      background-image: url(${BannerImg});
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      padding: 8rem 0;
      text-align: center;
      color: white;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #4c4848d6;
        z-index: 1;
      }
      &-content {
        position: relative;
        z-index: 10;
      }
      &-title {
        color: white;
        font-size: 6em;
        margin-bottom: 2rem;
        word-break: break-word;
      }
      &-sub-title {
        color: white;
        margin: 0;
        font-size: 2.4rem;
      }
      &-icon-container {
        padding-top: 5.6rem;
        .ant-image:nth-child(2) {
          margin: 0 4rem;
        }
      }
    }
    .section {
      padding: 6.2rem 0;
      &-title {
        text-align: center;
        font-size: 2.4rem;
        display: block;
        margin-bottom: 3.7rem;
      }
    }
    .find-certif {
      &-input {
        padding: 1rem 2rem;
        height: auto;
      }
      &-button {
        background-color: #ed2a26;
        color: white;
        font-weight: 600;
      }
      .ant-form-item-control {
        .ant-form-item-control-input {
          .ant-select-selector {
            padding: 0.6rem 2rem;
            height: auto;
          }
        }
      }
    }
    .our-certif {
      background-color: #f7f7f7;
      .tab-container {
        margin-top: 3.5rem;
      }
      .ant-tabs-tab {
        margin: 0 1rem;
        background-color: white;
        border-radius: 6px;
      }
      .ant-tabs-tab-active {
        background-color: #ed2a26;
        border-radius: 6px;
        .ant-tabs-tab-btn {
          color: white;
        }
      }
    }
    .benefit {
      background-image: url("https://gambolthemes.net/html-items/cursus_main_demo/images/sign.svg");
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-color: black;
      &-title {
        color: white;
      }
      &-img {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 4.3rem auto auto auto;

        &-item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        &-bg {
          width: 15rem;
          background-color: white;
          border-radius: 50%;
          height: 15rem;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 10rem;
          box-shadow: inset 0px 0px 5px 2px rgb(0 0 0 / 10%);
          border: 5px solid #fff;
        }
        &-title {
          color: white;
        }
      }
    }
    .get-what {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: ${containerWidth};
      margin: auto;
      &-paragraph {
        text-align: justify;
      }
      &-subtitle {
        font-size: 2rem;
        margin-bottom: 2rem;
      }
    }
    .text-center {
      text-align: center;
      display: block;
    }
    @media only screen and (max-width: 575.98px) {
      .banner {
        &-title {
          font-size: 4.2rem;
        }
      }
      .benefit {
        &-title {
          font-size: 2.4rem;
        }
        &-img {
          flex-direction: column;

          &-bg {
            margin: 2rem 0 !important;
          }
        }
      }
    }

    @media only screen and (max-width: 767.98px) {
      .banner-icon-container {
        .ant-image {
          width: 8rem !important;
        }
      }
      .benefit {
        &-title {
          font-size: 2.4rem;
        }
        &-img {
          &-bg {
            margin: 0 1rem;
          }
        }
      }
      .get-what {
        width: 90%;
      }
    }
  }
`;
//==================End Component Wraper============================

//==================Component Card============================
export const CertificateCard = styled.button`
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  transition: all 0.2s;
  width: 100%;
  border: none;
  cursor: pointer;
  &:hover {
    transform: translateY(-1rem);
  }
`;
//==================End Component Card============================

//==================Component Button============================

export const SectionButton = styled(Button)`
  margin: auto;
  background: #ed2a26;
  border: none;
  padding: 1.5rem 10rem;
  color: white;
  margin: 8rem auto auto auto;
  height: auto;
  line-height: 1.6rem;
  text-align: center;
  font-weight: 600;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    background-color: #ea5451;
    color: white;
    transform: translateY(-1rem);
  }
  &&& {
    .knownledge-btn {
      width: 100%;
    }
  }
`;
//==================End Component Card============================
