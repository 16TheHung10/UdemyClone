import styled from "styled-components";
export const Wrapper = styled.div`
  min-width:55rem;
  
  &&& {
    .middle-content .main-content{
      height:100% !important;
    }
    .ant-layout-sider {
      flex: 0 0 30% !important;
      max-width: 60rem !important ;
      min-width:37.5rem !important;
      background:#f7f7f7;
      padding: 2rem;
      height:100vh;
      overflow-x:scroll;
      width: 100% !important;
      position: sticky;
      top: 4rem;
    }
    .ant-layout-footer{
      padding:2rem 0;
    }
    .ant-layout-header{
        background: #efefef;
        box-shadow: 0 0 10px 0 #ab9999;
        padding:0;
    }
    .ant-slider{
      margin:10px 0;
      flex-grow:1;
    }
    .ant-btn{
      margin-top:0;
      
    }
    .ant-input-search-button{
      background:#ed2a26;
      color:white !important;
      font-weight:500;
    }
    .ant-segmented-item-selected{
      background:#ed2a26;
      color:white;
    }
    .footer{
    }
    .ant-row {
      flex-flow: row nowrap;
    }
  }
  .download {
    flex-wrap:wrap !important;
    &-header{
        display:flex;
        align-items:center;
        position:fixed;
        width:100%;
        z-index:30;
        .sidebar-button{
            width:100%;
            display:flex;
            align-items:center;
            justify-content:center;
            .goback{
                width:100%;
            }
            .menu{
                display:none;
                width:50%;
            }
        }
        &-btn{
            width:50%;
        }
    }
    &-sidebar{

      transition: all 0.5s;
      background: transparent;
      overflow: hidden;
      padding: 0 1rem;
      position:sticky;
      top:5rem;
      width:26%;
      height:100%;
      &-content{
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        padding:1rem;
        background:white;
        border-radius: 1rem;

      }
    }
    .player-content{
      width:75%;

    }
    &-lesson {
      &-title {
        color: black;
        padding: 1.5rem 0;
        background:white;
        text-align:center;
      }
      &-content {
        .lesson {
          &-item{
            width:100%;
            height: 5rem;
            margin-bottom: 1rem;
            transition:all 0.5s;
            text-align:start;
            &:hover{
              transform:scale(1.05);
            }
          }
          &-title {
              padding:1rem 0;
          }
          &-group {
              display:flex;
              flex-direction:column;
              align-items:start;
            .lesson-item{
              .lecture-title{
                overflow:hidden;
                text-overflow: ellipsis; ;
                white-space:nowrap;
              }
            }
            .active{
              background:#ed2a26;
              color:white;
            }
            a {
              color: black;
              padding:1rem 2rem;
              margin-bottom:1rem;
              width:100%;
              &:hover{
                  color:black;
              }
            }
            .link-icon{
                margin-right:1rem;l

            }
          }
        }
      }
    }
    
    &-content{
        overflow: hidden;
        padding-top: 56.25%; /* 16:9 Aspect Ratio */
        width:100%;
        max-height:88rem;
        min-height:30rem;
        height:auto;
        margin:auto;
        display:flex;
        flex-direction:column;
        margin-top:0;
        justify-content:center;
        position:relative;
        z-index:1;
        &-title{
            margin-bottom:2.1rem !important;
        }
        .react-player{
          position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            width: 100%;
            height: 100%;
            border: none;
        }
        .video-group{
          display: flex;
          flex-direction: column;
          position:relative;
          flex-grow:1;
          &:hover .control{
            opacity:1;
            transition:all 1s;
          }
        }
        &-video{
            flex-grow:1;
            height: 100%;
            
        }
        &-control-video{
          position: absolute;
          bottom: 0%;
          width: 100%;
          right: -1px;
          .control{
            display:flex;
            flex-direction:column-reverse;
            &-bottom{
              width:100%;
              display:flex;
              padding-right:1rem;
              align-items:center;
              justify-content:space-between;
              background:#f10707bf;
              border-radius:3px;
              padding:4px 1rem;
              .left{
                gap:1rem;
                width:40rem;
                display: flex;
                justify-content: space-between;
                align-items:center;
              }
              .right{
                display:flex;
                align-items:center;
              }

            }
            &-top{
              position:relative;
              flex-grow:1;
                .note-item{
                  position: absolute;
                  height: 50% !important;
                  top: 50%;
                  transform: translate(-50%,-50%) !important;
                  background: #606060;
                  height:100%;
                  cursor: pointer;
                  border:none;
                  opacity:0.6;
                  border-radius:3px;
                  z-index:-1;
              }
            }
          }
        }
    }
  }
  .take-note{
    margin-bottom:2rem;
  }
  .transform-back{
      transform:translateX(0%) !important;
  }
  .control-hover{
    opacity:0;
  }
  @media screen and (max-width: 576px){
    .footer{
      padding:2.4rem 1rem;
    }
  }
  @media screen and (max-width: 768px){
    
  }
  @media screen and (max-width: 992px){
    
  }
  @media screen and (max-width : 1199.98px){
      &&&{
        .ant-layout-sider {
            
    }
      }
      .download{
          &-sidebar{
            position: fixed;
            width: 100% !important;
            z-index: 100;
            top: 4rem;
            transform: translateX(-110%);
            margin: 0;
            border-radius: 0;
            background:white;
          }
          &-header{
            .sidebar-button{
              width:100%;
            .goback{
                width:100%;
            }
            .menu{
                display:inline-block;
                width:100%;
            }
        }
          }
      }
      
      .player-content{
        width:100% !important;
      }
  }


`;
