import Avatar from "components/Avatar/Avatar";
import { useNavigate } from "react-router-dom";
import CardSubscriptionsWrapper from "./CardSubscriptionsStyle";
import { subscriptionAction } from "redux/features/subscription/subscriptionSlice";
import { useDispatch, useSelector } from "react-redux";

function CardSubscriptions({ subscriberId, imgLink, name, description }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <CardSubscriptionsWrapper>
      <div
        className="card-container"
        onClick={() => {
          navigate(`/profile/${subscriberId}`);
          dispatch(
            subscriptionAction.changeURL(window.location.pathname)
          );
        }}
      >
        <Avatar
          style={{ width: "100px", height: "100px" }}
          imgLink={imgLink}
          fullName={name}
        />
        <h3>{name}</h3>
        <span>{description}</span>
      </div>
    </CardSubscriptionsWrapper>
  );
}

export default CardSubscriptions;
