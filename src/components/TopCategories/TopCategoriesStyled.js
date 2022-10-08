import styled from 'styled-components';

const TopCategoriesWrapper = styled.div`
&&& {
  background-color: #fff;
  border-radius: 3px;
  width: 100%;
  border: 1px solid #efefef;
  .top-categories_header {
    padding: 15px 20px;
    border-bottom: 1px solid #efefef;
  }
  .ant-typography {
    margin: 0;
  }
  .ant-space {
    width: 100%;
  }
  .top-categories_item {
    padding: 10px 20px;
    color: var(--text-color);
    width: 100%;
    .top-categories_icon {
        margin-right: 8px;
        display: inline-block;
    }
    .ant-typography {
      color: var(--text-color);
    }
    &:hover {
      color: black;
    }
    &:hover .ant-typography {
      color: black;
    }
  }
}
`;

export default TopCategoriesWrapper;