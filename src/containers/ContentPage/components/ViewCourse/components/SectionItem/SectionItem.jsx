import { Typography } from "antd";
import { Bar } from "assets/IconComponent";
import ContentList from "../ContentList/ContentList";
const { Text } = Typography;
export default function SectionItem({ data, id }) {
  return (
    <div className="section-item">
      <div className="section-header">
        <div className="display-flex width-full justify-content-between">
          <div className="display-flex align-item-center">
            <Bar className="icon-size-mini" />
            <Text className="text-bold">{data.title}</Text>
          </div>
        </div>
      </div>
      <div className="section-content">
        <ContentList id={id} contents={data.contents} />
      </div>
      <div className="section-footer"></div>
    </div>
  );
}
