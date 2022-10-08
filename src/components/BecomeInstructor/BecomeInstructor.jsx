import { Button, Space, Typography } from "antd";
import React, { useState } from "react";
import BecomeInstructorWrapper from "./BecomeInstructorStyled";
import ModalStartTeaching from "components/Modal/ModalStartTeaching/ModalStartTeaching";
import { useNavigate } from "react-router-dom";
import AuthUtils from "utils/AuthUtils";

function BecomeInstructor(props) {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const startTeachingClickHandler = () => {
    if (AuthUtils.isAuthed()) setVisible(true);
    else navigate("/sign-in");
  };
  return (
    <BecomeInstructorWrapper>
      <ModalStartTeaching visible={visible} setVisible={setVisible} />
      <Space direction="vertical" size={18} align="center">
        <Typography.Title level={4}>Become an Instructor</Typography.Title>
        <Typography.Text style={{ color: "var(--text-color)" }}>
          Top instructors from around the world teach millions of students on
          Cursus. We provide the tools and skills to teach what you love.
        </Typography.Text>
        <Button type="primary" danger onClick={startTeachingClickHandler}>
          Start Teaching
        </Button>
      </Space>
    </BecomeInstructorWrapper>
  );
}

export default BecomeInstructor;
