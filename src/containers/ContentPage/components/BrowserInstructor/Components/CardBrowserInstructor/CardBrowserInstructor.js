import CardBrowserInstructorWrapper from "./CardBrowserInstructorStyle";
import Avatar from "components/Avatar/Avatar";
import SocialsGroupAction from "components/SocialsGroupAction/SocialsGroupAction";
import { Tooltip } from "antd";

function CardBrowserInstructor({
  image,
  fullName,
  introduction,
  facebookLink,
  twitterLink,
  youtubeLink,
  linkedInLink,
  studentNumber,
  courseNumber,

  totalCourse,
}) {
  return (
    <CardBrowserInstructorWrapper>
      <Avatar
        style={{ width: "100px", height: "100px" }}
        imgLink={image}
        fullName={fullName}
      />
      <h3>{fullName}</h3>
      <Tooltip placement="topLeft" title={introduction}>
        <span className="card-introduction">{introduction}</span>
      </Tooltip>
      {(youtubeLink || twitterLink || facebookLink || linkedInLink) && (
        <SocialsGroupAction
          youtube={youtubeLink}
          twitter={twitterLink}
          facebook={facebookLink}
          linkedin={linkedInLink}
        />
      )}
      <div className="number-student-course">
        <span style={{ marginRight: 8 }}>
          {`${studentNumber} student`}
        </span>
        <span>{`${courseNumber} course`}</span>
      </div>
    </CardBrowserInstructorWrapper>
  );
}

export default CardBrowserInstructor;
