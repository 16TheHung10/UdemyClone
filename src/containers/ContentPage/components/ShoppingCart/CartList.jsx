import { Space } from "antd";
import CartItem from "./CartItem";
import { WrapperCartList } from "./ShoppingCartStyled";

export default function CartList(props) {
  const { data } = props;
  const renderCartItem = () => {
    if (data) {
      return data.map((item, index) => {
        return <CartItem cartItemIndex={index} data={item} key={index} />;
      });
    }
  };
  return (
    <WrapperCartList className="cart-list">
      <Space direction="vertical" size="middle" className="space-flex">
        {renderCartItem()}
      </Space>
    </WrapperCartList>
  );
}
