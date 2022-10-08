import styled from "styled-components";

const Wrapper = styled.div`
  &&& {
   
   .headerTable span{
    color: #333;
    font-size: 14px;
    font-weight:600
   }

   .statusContent.active{
     color:red;
     font-weight:600
   }
   .actionContent{
    
   }
   .actionContent .iconAction{
     width:18px;
     height:18px;
     margin:0px 2px
   }

   .actionContent .iconAction:hover{
     color:red;
     cursor: pointer
   }

  }
`;

export default Wrapper;
