import { CheckCircleTwoTone } from "@ant-design/icons";
import { Space, Tooltip, Typography, Skeleton } from "antd";
import SocialsGroupAction from "components/SocialsGroupAction/SocialsGroupAction";
import React from "react";
import { Link } from "react-router-dom";
import { pathLink } from "routes";
import { formatSpecialized } from "utils/CommonUtils";
import Avatar from "../Avatar/Avatar";
import InstructorCardWrapper from "./InstructorCardStyled";

function InstructorCard(props) {
  const { buttonLink } = props;
  const {
    id,
    fullName,
    verify,
    specialize,
    facebookLink,
    twitterLink,
    youtubeLink,
    enrollmentNumber,
    studentNumber,
    linkedInLink,
    totalCourse,
    image,
    role,
    courseNumber,
  } = props.data;

  return (
    <InstructorCardWrapper>
      <div>
        <Link
          to={pathLink.instructorDetail(id)}
          style={{ marginBottom: "20px" }}
        >
          <Avatar imgLink={image} fullName={fullName} />
        </Link>
        <Space className="instructor-card_title-wrapper" align="baseline">
          <Link to={pathLink.instructorDetail(id)}>
            <Typography.Text strong>{fullName}</Typography.Text>
          </Link>
          {/* {role === "Instructor" && (
            <Tooltip placement="bottomLeft" title="Verify">
              <CheckCircleTwoTone />
            </Tooltip>
          )} */}
        </Space>
        {role === "Instructor" && (
          <Typography.Text
            ellipsis={{
              tooltip: (
                <span style={{ textTransform: "capitalize" }}>
                  {formatSpecialized(specialize)}
                </span>
              ),
            }}
            style={{ color: "var(--text-color)", textTransform: "capitalize" }}
          >
            {formatSpecialized(specialize)}
          </Typography.Text>
        )}
        {(youtubeLink || twitterLink || facebookLink || linkedInLink) && (
          <SocialsGroupAction
            youtube={youtubeLink}
            twitter={twitterLink}
            facebook={facebookLink}
            linkedin={linkedInLink}
          />
        )}
        {role === "Instructor" && (
          <Space className="instructor-card_footer" size={2}>
            <Typography.Text
              className="instructor-card_totalStudent"
              style={{ color: "var(--text-color)", fontSize: "1.2rem" }}
            >
              {/* Total student */}
              {`${studentNumber} Student`}
            </Typography.Text>
            <Typography.Text
              style={{ color: "var(--text-color)", fontSize: "1.2rem" }}
            >
              {`${courseNumber} Courses`}
            </Typography.Text>
          </Space>
        )}
        {buttonLink && (
          <Link to={pathLink.instructorDetail(id)} className="btn">
            Go To Profile
          </Link>
        )}
      </div>
    </InstructorCardWrapper>
  );
}

export const InstructorCardSekleton = () => {
  return (
    <InstructorCardWrapper>
      <div>
        <Skeleton.Avatar active size={`large`} shape={`circle`} />
        <Skeleton
          paragraph={{
            rows: 2,
          }}
        />
      </div>
    </InstructorCardWrapper>
  );
};

export default InstructorCard;
