import { Button, Form, Input, Space } from "antd";
import Avatar from "components/Avatar/Avatar";
import React from "react";
import AddCommentWrapper from "./AddCommentStyled";

function AddComment(props) {
  const { imgLink, onAddComment } = props;
  const [form] = Form.useForm();
  const addCommentSubmitHandler = (data) => {
    onAddComment(data);
    form.resetFields();
  };
  return (
    <AddCommentWrapper>
      <Form
        form={form}
        onFinish={addCommentSubmitHandler}
        className="add-comment_form"
      >
        <Space className="add-comment_ant-space" align="baseline">
          <Avatar style={{ width: "44px", height: "44px" }} imgLink={imgLink} />
          <Form.Item name="comment">
            <Input.TextArea
              autoSize={{ minRows: 1, maxRows: 3 }}
              placeholder="Add a public comment"
            ></Input.TextArea>
          </Form.Item>
        </Space>
        <Button
          htmlType="submit"
          type="primary"
          className="add-comment_btn-submit"
        >
          Comment
        </Button>
      </Form>
    </AddCommentWrapper>
  );
}

export default AddComment;
