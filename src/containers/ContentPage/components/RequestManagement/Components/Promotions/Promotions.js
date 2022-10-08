import Wrapper from "./PromotionsStyle";
import { ReactComponent as PromoteLogo } from "assets/svg/promotion.svg";

function Promotions() {
  return (
    <Wrapper>
      <PromoteLogo width="200" height="200" />
      <h4>Baby promotion plan is activated!</h4>
      <p>
        By activating promotion plans you can improve course views and sales.
      </p>
      <button className="changeBtn">Change New Plan</button>
    </Wrapper>
  );
}

export default Promotions;
