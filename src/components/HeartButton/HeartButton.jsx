import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import React from "react";
import { useSelector } from "react-redux";
import * as wishlistSelector from "redux/features/wishlist/WishlistSelector";

import styled from "styled-components";

const HeartButtonWrapper = styled.div`
  &&& {
    cursor: pointer;
    padding: 10px;
    display: inline-flex;
    border-radius: 100%;
    border: 1px solid
      ${(props) => (props.heartColor === -1 ? "#000000" : "red")};
    .button-heart_icon {
      font-size: 20px;
    }
  }
`;

function HeartButton(props) {
  const wishlist = useSelector(wishlistSelector.selectWishlist);

  const { data } = props;

  const checkExistedInWishlist = React.useMemo(() => {
    return wishlist.findIndex((item) => item.id === data.id);
  }, [wishlist, data]);

  const handleOnClick = () => {
    const type = checkExistedInWishlist === -1 ? "add" : "remove";
    props.onClick(data, type);
  };

  return (
    <HeartButtonWrapper
      style={props.style}
      heartColor={checkExistedInWishlist}
      onClick={handleOnClick}
    >
      {checkExistedInWishlist === -1 ? (
        <HeartOutlined className="button-heart_icon"></HeartOutlined>
      ) : (
        <HeartFilled className="button-heart_icon" style={{ color: "red" }} />
      )}
    </HeartButtonWrapper>
  );
}

export default HeartButton;
