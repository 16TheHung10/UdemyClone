import { Col, Row } from "antd";
import CardSubscriptionsWrapper from "./Components/CardSubscriptions/CardSubscriptions";
import SubscriptionsWrapper from "./SubscriptionsStyled";

function Subscriptions({ listSubscriptions }) {
  return (
    <SubscriptionsWrapper>
      <Row>
        {listSubscriptions.length === 0 && <span>No Subscriptions</span>}
        {listSubscriptions?.map((item) => (
          <Col key={item.id} xs={24} sm={24} md={12} lg={8} xl={6}>
            <CardSubscriptionsWrapper
              subscriberId={item.subscriber.id}
              imgLink={item.subscriber.image}
              name={item.subscriber.fullName}
              description={item.subscriber.introduction}
            />
          </Col>
        ))}
      </Row>
    </SubscriptionsWrapper>
  );
}

export default Subscriptions;
