import { Button } from "antd";
import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
    overflow: hidden; 
  }
  .spin-loading
  {
    max-height: none!important;
  }
  .ant-select-dropdown
  {
    width: fit-content!important;
  }
  .input-text
  {
      padding: 8px 16px;
      box-shadow: none;
      border-radius: 3px;
      &:visited,
      &:active,
      &:hover,
      &:focus {
        outline: #333;
        border-color: #333;
        border-right-width: 1px;
        z-index: 1;
        & .explore_input-icon {
          color: #333;
        }
      }
    }
  .dropdown-scroll
  {
    overflow-y: scroll;
    scrollbar-color: #d2d2d2;
    scrollbar-width: thin;
    overflow: -moz-scrollbars-vertical;
    &::-webkit-scrollbar {
      width: 15px;
    }
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      border: 5px solid transparent;
      border-radius: 100px;
      background-color: #d2d2d2;
      background-clip: content-box;
    }
  }
  .categories-dropdown
  {
    max-height: 400px;
    box-shadow: 0 2px 3px 0 rgb(34 36 38 / 15%)!important;
    li
      {
        margin: 0px!important;
        &:hover
        {
          background-color: #F2F2F2;
          a
          {
            color: var(--red-color);
          }
        }
      }
  }
  .btn-red {
  padding: 0.8rem 1.5rem;
  height: auto;
  font-weight: 600;
  width: auto;
  color: white;
  background: var(--red-color);
  border-color:var(--red-color) ;
  border-radius: 0.5rem;
  &:hover {
    background: black;
    border-color: black;
    color: white;
    cursor: pointer;
  }
  &:focus {
    border-color: white;
    color:white;
    background: var(--red-color);
  }
 }

 .btn-secondary.ant-btn.ant-btn-default.btn-outlined
 {
   height: 40px;
   border-radius: 5px;
   &:hover
   {
    color: #000000d9!important;
    a
    {
      color: #000000d9!important;
    }
   }
 }
  .btn-cancel{
    color: #91699c;
    background: #f3f3f3;
    padding: 0.8rem 1.5rem;
    height: auto;
    font-weight: 600;
    width: auto;
    border-radius: 0.5rem;
    &:hover {
      background: black;
      border-color: black;
      color: white;
  }
  &:focus {
    background: black;
    border-color: black;
    color: white;
  }
}
  
  .modal-in-section{
    top:2rem;
    .ant-modal-title{
      font-weight: 600;
    }
    .ant-form-item-label{
      font-weight: 600;
    }
  }
  .text-gray{
    color:var(--text-color);
  }
  .text-bold{
    font-weight: 600;
  }
  .error-message{
    color:var(--red-color);
    font-weight: 100;
  }
  .flex-wrap
  {
    flex-wrap: wrap;
  }
  .height-100
  {
    height: 100%;
  }
  .width-100
  {
    width: 100%;
  }
  .display-flex{
    display:flex;
  }
  .justify-content-between{
    justify-content:space-between;
  }
  .flex-column{
    flex-direction: column;
  }
  .align-item-center{
    align-items: center;
  }
  .align-item-end{
    align-items: flex-end;
  }
  .width-full{
    width: 100%;
  }
  .mg-left{
  margin-left: 1rem;}
  .mg-right{
  margin-right: 1rem;}
  .mg-top{
  margin-top: 1rem;}
  .mg-bot{
  margin-bottom: 1rem;}
  .mg-y{
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .padding-all{
    padding: 2rem;
  }
  .padding-1{
    padding: 1rem;
  }
  .padding-right{
    padding-right: 1rem;
  }
  .padding-left{
    padding-left: 1rem;
  }
  .padding-y{
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  .padding-x{
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .padding-x-2{
    padding-left: 2rem;
    padding-right: 2rem;
  }
  .mg-x{
    margin-left: 1rem;
    margin-right: 1rem;
  }
  .text-center
  {
    text-align: center;
  }
  .cursor-pointer
  {
    cursor: pointer;
  }
  .color-primary
  {
    color: var(--red-color);
  }
  .text-white{
    color: white;
  }
  .d-flex
  {
    display: flex;
  }
  .justify-content-center
  {
    justify-content: center;
  }
  .justify-content-end
  {
    justify-content: flex-end;
  }
  .flex-direction-column
  {
    flex-direction: column;
  }
  .ant-alert
  {
    margin-bottom: 10px;
  }
  .beauty-scroll-bar {
    scrollbar-color: #d2d2d2;
        scrollbar-width: thin;
        overflow: -moz-scrollbars-vertical;
        &::-webkit-scrollbar {
          width: 20px;
        }
        &::-webkit-scrollbar-track {
          background-color: transparent;
        }
        &::-webkit-scrollbar-thumb {
          border: 5px solid transparent;
          border-radius: 100px;
          background-color: #d2d2d2;
          background-clip: content-box;
        }
      }
    
`;

export const MainLayoutWrapper = styled.div`
  &&& {
    display: flex;
    flex-direction: column;
    .middle-content {
      min-width: 37.5rem;
      display: flex;
      height: ${(props) =>
    props.checkAuthPath ? "calc(100vh - 5.8rem)" : "100vh"};
      background-color: #f0f2f5;
      .main-content {
        flex-grow: 1;
        /* height: auto; */
        height: ${(props) =>
    props.pathName.match("/download-course-view")
      ? "100vh"
      : (props.checkAuthPath ? "calc(100vh - 5.8rem)" : "100vh")};
        overflow-y: scroll;
        scrollbar-color: #d2d2d2;
        scrollbar-width: thin;
        overflow: -moz-scrollbars-vertical;
        &::-webkit-scrollbar {
          width: 20px;
        }
        /* &:hover {
          &::-webkit-scrollbar {
            display: none;
          }
        } */

        &::-webkit-scrollbar-track {
          background-color: transparent;
        }
        &::-webkit-scrollbar-thumb {
          border: 5px solid transparent;
          border-radius: 100px;
          background-color: #d2d2d2;
          background-clip: content-box;
        }
        .content-page {
          min-height: calc(100vh - 5.8rem);
        }
      }
    }
  }
`;

export const RedButtonDetailPage = styled(Button)`
  &&& {
    background-color: #ed2a26;
    border: 1px solid #ed2a26;
    &:hover {
      background-color: #c72127;
      border: 1px solid #c72127;
    }
  }
`;

export const WhiteButtonUnsubscribed = styled(Button)`
  &&& {
    background-color: #fff;
    border: 1px solid #ed2a26;
    color: #ed2a26;
    &:hover {
      opacity: 0.7;
    }
  }
`;

export const WhiteButtonDetailPage = styled(Button)`
  &&& {
    color: #fff;
    border: 1px solid #fff;
    &:hover {
      background: #c72127;
      border: 1px solid #c72127;
    }
  }
`;

export const CustomizeButton = styled(({ primary, ...props }) => (
  <Button {...props} />
))`
  color: #fff;
  background-color: ${(props) => props.buttonSettingColor};
  border: 1px solid ${(props) => props.buttonSettingColor};
  &:visited,
  &:active,
  &:focus,
  &:hover {
    opacity: 0.8;
    background-color: ${(props) => props.buttonSettingColor};
    border: 1px solid ${(props) => props.buttonSettingColor};
  }
`;

export const ApproveButton = styled(Button)`
  color: #fff;
  background-color: #87d068;
  border: 1px solid #87d068;
  &:visited,
  &:active,
  &:focus,
  &:hover {
    opacity: 0.8;
    background-color: #87d068;
    border: 1px solid #87d068;
  }
`;

export const RejectButton = styled(Button)`
  color: #fff;
  background-color: #f50;
  border: 1px solid #f50;
  &:visited,
  &:active,
  &:focus,
  &:hover {
    opacity: 0.8;
    background-color: #f50;
    border: 1px solid #f50;
  }
`;
