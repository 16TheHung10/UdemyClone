import { DownOutlined, MoreOutlined } from "@ant-design/icons";
import { Space } from "antd";
import * as wishlistApis from "apis/features/Favourite/Favourite";
import { useDispatch, useSelector } from "react-redux";
import * as authSelector from "redux/features/auth/AuthSelector";
import * as wishlistSelector from "redux/features/wishlist/WishlistSelector";
import { wishlistAction } from "redux/features/wishlist/WishlistSlice";
import MoreDropdownWrapper from "./MoreDropdownStyled";

const MoreDropdown = (props) => {
  const authUser = useSelector(authSelector.selectUser);
  const wishlist = useSelector(wishlistSelector.selectWishlist);
  const { menu, position, text, isDisableOnClickItem } = props;
  const dispatch = useDispatch();

  const handleOnClickItem = (key, data, type) => {
    if (!isDisableOnClickItem) {
      switch (key) {
        case 1:
          if (!!authUser) {
            (async () => {
              if (type === "add") {
                let previousWishlist = wishlist;
                try {
                  dispatch(wishlistAction.addNewItemWishlist(data));
                  await wishlistApis.addFavorite({
                    userId: authUser.id,
                    courseId: data.id,
                  });
                } catch (e) {
                  dispatch(
                    wishlistAction.addPreviousWishlist(previousWishlist)
                  );
                  throw new Error("Failed to add wishlist");
                }
              } else {
                let previousWishlist = wishlist;
                try {
                  dispatch(wishlistAction.deleteItemWishlist(data.id));
                  await wishlistApis.removeFavorite(data.id);
                } catch (e) {
                  dispatch(
                    wishlistAction.addPreviousWishlist(previousWishlist)
                  );
                  throw new Error("Failed to remove wishlist");
                }
              }
            })();
          } else window.location = "/sign-in";
          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          break;

        default:
          break;
      }
    }
  };
  return (
    <MoreDropdownWrapper position={position}>
      {text ? (
        <>
          <Space>
            {text}
            <DownOutlined />
          </Space>
        </>
      ) : (
        <MoreOutlined className="more-dropdown_icon" />
      )}
      <ul className="more-dropdown-menu">
        {menu.map((item) => (
          <li
            key={item.key}
            onClick={() => handleOnClickItem(item.key, props?.data, item.type)}
            className="more-dropdown-menu_item"
          >
            {item.row}
          </li>
        ))}
      </ul>
    </MoreDropdownWrapper>
  );
};

export default MoreDropdown;
