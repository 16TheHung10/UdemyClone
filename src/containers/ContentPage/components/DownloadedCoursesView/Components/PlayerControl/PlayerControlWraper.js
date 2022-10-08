import styled from "styled-components";
export const PlayerControlWraper = styled.div`
&:hover{
   .bottom-control{
     transform:translateY(0%)
   }
   .top-control{
    transform:translateY(0%);
     
   }
}
  &&& {
    .ant-slider {
      width: 100%;
    }
    .ant-slider-rail {
      background: black;
    }
    .ant-slider-track {
      background: red;
    }
    .ant-slider-handle {
      background: black;
      border: 5px solid white;
    }
    .popover-change-speed {
    }
  }
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 0, 0);
  justify-content: space-between;
  z-index: 1;
  height: 100%;
  .opacity-1{
    opacity:1;
    filter:blur(1rem);
  }
  .opacity-0{
    opacity:0;
  }
  .scale-icon{
          transform: scale(1.5);
  }
  .hideTopControl{
    transform:translateY(-400%) !important;
  }
  .hideBottomControl{
    transform:translateY(400%) !important;
  }
  .top-control {
    position: relative;
   z-index: 1;
    height: auto;
    width: 97%;
    backdrop-filter: blur(8px);
    background: #64646426;
    transform:translateY(-400%);
    overflow:hidden;
    transition:all .5s;
    margin-top:1rem;
    border-radius:1rem;
    .title {
      margin:0;
    padding: 0 1rem;
    text-align:center;
    color: white;
    height: 6rem;
    line-height: 6rem;
    margin: 1%;
    border-radius: 1rem;
    font-size:2rem;
    }
    &::after{
      content: "";
   position: absolute;
   background: inherit;
   z-index: -1;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   box-shadow: inset 0 0 2000px rgba(255, 255, 255, .5);
   filter: blur(10px);
   margin: -20px;

    }
  }
  .middle-control {
    padding:2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    flex-grow: 1;
    cursor: pointer;
    &-item {
      transition: all 0.5s;
      width: 100%;
      text-align: center;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .bottom-control {
    backdrop-filter: blur(8px);
    border-radius:1rem;
    background: #6464645e;
    margin-bottom: 1rem;
    padding:2rem 2rem 1rem 2rem;
    width:97%;
    display: flex;
    align-items: center;
    flex-direction: column;
    transform:translateY(400%);
    transition:all .5s;
    &-icon{
      cursor: pointer;
    }
    
    .slider {
      position: relative;
      width: 100%;
      .note-item {
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        background: #d9d9d9;
        height: 50%;
        margin: auto;
        border: none;
        border-radius: 50%;
        height: 1.5rem;
        width: 1.5rem;
        opacity: 0.7;
        cursor: pointer;
        /* z-index: -1; */
      }
    }
    .control-group {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .change-speed {
      }
    }
    &-left {
      display: flex;
      gap: 1rem;
      align-items: center;
      width: 40rem;
      position:relative;
      svg {
        /* width: 5rem; */
      }
      .speed-btn {
        color: white;
        font-weight: 600;
        background: transparent;
        &:hover {
          color: white;
          background:#ed2a26;
          border-color: red;
        }
      }
      .time {
        color: white;
        margin-right:1rem;
      }
      .change-speed-box{
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 150px;
        background-color: rgb(247, 247, 247);
        position: absolute;
        bottom: 100%;
        left: 53%;
        transform: translateX(-10px);
        border-radius:10px;
        background:red;
        &-btn{
          border:none;
          padding:10px 0;
          &:hover{
            background:#ed2a26;
            color:white;
          }
        }
      }   
  }
  &-right{
        display:flex;
        align-items:center;
        gap:2rem;
        .download-btn{
          background:#ed2a26;
          color:white;
          border:none;
          text-transform:uppercase;
        }
      }
  @media screen and (max-width: 576px){
      .top-control {
      .title {
        font-size: 1rem;
      }
    }
  }

`;
