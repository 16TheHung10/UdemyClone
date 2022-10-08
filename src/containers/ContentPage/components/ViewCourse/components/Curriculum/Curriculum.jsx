import { Typography } from "antd";
import { BookIcon, ListIcon } from "assets/IconComponent";
import SectionItem from "../SectionItem/SectionItem";

const { Text } = Typography;

export default function Curriculum({ sections }) {
  const renderSections = () => {
    if (sections.length !== 0) {
      return sections.map((item, index) => (
        <SectionItem key={index} data={item} id={index} />
      ));
    }
  };
  return (
    <div className="basic-container">
      <div className="basic-header">
        <div className="flex-item">
          <BookIcon className="icon-size" />
          <Text className="text-header text-size ">Curriculum</Text>
        </div>
      </div>
      <div className="section-create">
        <div className="flex-item">
          <ListIcon className="icon-size" />
          <Text className="text-header text-size ">Curriculum</Text>
        </div>
        <div></div>
      </div>
      <div>{renderSections()}</div>
    </div>
  );
}
