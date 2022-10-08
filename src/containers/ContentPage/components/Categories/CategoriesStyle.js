import styled from "styled-components";

const Wrapper = styled.div`
  &&& {
    padding: 40px 16px;
    min-height:50vh;
    /* Area 1 */
    .title-area h2 {
      padding-right: 15px;
      padding-left: 15px;
      font-size: 20px;
      font-weight: 501;
      font-family: roboto, sans-serif;
      color: #333;
      display:flex;
      align-items:center
    }

    /* Area 2 */
    .table-area{
      margin-top:20px;
    }

    .actionContent .iconAction{
     width:22px;
     height:22px;
     margin:0px 3px
   }

   .actionContent .iconAction:hover{
     color:red;
     cursor: pointer
   }
    
    
  }
`;

export default Wrapper;
