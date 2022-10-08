import styled from "styled-components";
const CarouselWrapper = styled.div`
  &&& {
    .slick-slider {
    }
    .slick-prev,
    .slick-next {
      position: absolute;
      color: black;
      width: 32px;
      background-color: #fff;
      height: 32px;
      border: 1px solid #e5e5e5;
      box-shadow: 0px 2px 2px 0px rgb(0, 0, 0, 0.07);
      transition: 0.2s ease;
    }
    .slick-next {
      left: calc(100% - 7px);
      background: linear-gradient(to left, #fff 50%, #ed2a26 50%) right;
      background-size: 200%;
      &:hover {
        color: #fff;
        background-position: left;
        border-color: #ed2a26;
      }
    }
    .slick-prev {
      left: -24px;
      z-index: 10;
      background: linear-gradient(to right, #fff 50%, #ed2a26 50%);
      background-size: 200%;
      &:hover {
        color: #fff;
        background-position: right;
        border-color: #ed2a26;
      }
    }
    .ant-btn.slick-disabled {
      opacity: 0.7;
      color: #cccccced;
    }

    .slick-track {
      display: flex;
    }
    /* the slides */
    .slick-slide {
      padding: 0 ${(props) => (props.gap ? `${props.gap}px` : "8px")};
      margin: 1px 0;
      height: inherit;
      ${(props) =>
    props.hover &&
    `transition: transform 0.2s;
      &:hover {
        transform: translateY(1px);
      }`};

      & > div {
        height: 100%;
        width: 100%;
      }
    }

    /* the parent */
    .slick-list {
      margin: 0 ${(props) => (props.gap ? `calc(-1*(${props.gap / 2}px))` : "-8px")};
    }
  }
`;

export default CarouselWrapper;
