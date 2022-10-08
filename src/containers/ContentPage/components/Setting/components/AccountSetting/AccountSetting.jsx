import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Image,
  Input,
  message,
  Modal,
  Row,
  Space,
  Spin,
  Typography,
} from "antd";
import { uploadFile } from "apis/features/CreateCourse/CreateCourseAPI";
import { updateUserProfile } from "apis/features/userApi";
import { ReactComponent as FacebookIcon } from "assets/svg/facebook.svg";
import { ReactComponent as LinkedinIcon } from "assets/svg/linkedin2.svg";
import { ReactComponent as TwitterIcon } from "assets/svg/twitter.svg";
import { ReactComponent as YoutubeIcon } from "assets/svg/youtube.svg";
import moment from "moment";
import { default as React } from "react";
import AvatarEditor from "react-avatar-editor";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "redux/features/auth/AuthSelector";
import { AuthAction } from "redux/features/auth/AuthSlices";
import { RedButtonDetailPage } from "Theme/GlobalStyles";
import * as yup from "yup";
import AccountSettingWrapper from "./AccountSettingStyled";

function AccountSetting(props) {
  const { type, data } = props;
  const editorRef = React.useRef(null);
  const uploadFileRef = React.useRef(null);
  const [visibleEditAvatar, setVisibleEditAvatar] = React.useState(false);
  const [scaleAvatar, setScaleAvatar] = React.useState(1);
  const [uploadAvatar, setUploadAvatar] = React.useState(null);
  const [uploadAvatarLoading, setUploadAvatarLoading] = React.useState(false);
  const [updateProfileLoading, setUpdateProfileLoading] = React.useState(false);
  const userProfile = useSelector(selectUser);
  const dispatch = useDispatch();
  const copyUserProfile = { ...userProfile };
  delete copyUserProfile.image;
  const [media, setMedia] = React.useState(
    type !== "Student" && type !== "Instructor"
      ? userProfile?.image
      : data.image
  );
  console.log(userProfile);
  const navigate = useNavigate();
  const defaultValues =
    type !== "Student" && type !== "Instructor"
      ? {
          ...copyUserProfile,
          introduction: userProfile?.introduction || "",
          cursus: "https://cursus.pw/example",
        }
      : {
          ...data,
          introduction: data.introduction || "",
          cursus: "https://cursus.pw/example",
        };
  const schema = yup
    .object()
    .shape({
      firstName: yup
        .string()
        .required("First name is required")
        .matches(
          /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
          "Full name has not contains special characters and number"
        ),
      lastName: yup
        .string()
        .required("Last name is required")
        .matches(
          /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
          "Last name has not contains special characters and number"
        ),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const submitFormHandler = async (data) => {
    setUpdateProfileLoading(true);
    const result = {
      ...userProfile,
      ...data,
      image: media,
      fullName: `${data.firstName} ${data.lastName}`,
    };
    delete result.cursus;
    const response = await updateUserProfile(result);
    dispatch(AuthAction.updateUser(result));
    setUpdateProfileLoading(false);
    if (response.statusText === "OK") {
      console.log(response);
      message.success("Your profile has been updated successfully!");
      navigate("/setting");
    } else message.error("Something went wrong...");
  };

  const handleScaleAvatarChange = (scaleValueEvent) => {
    const scaleValue = parseFloat(scaleValueEvent.target.value);
    setScaleAvatar(scaleValue);
  };

  const handleUploadAvatar = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "image");
    const res = await uploadFile(formData);
    setMedia(res.data.url);
    setUploadAvatarLoading(false);
  };

  const handleAvatarEditorOk = async () => {
    setUploadAvatarLoading(true);
    if (editorRef) {
      const img = editorRef.current.getImageScaledToCanvas();
      img.toBlob(async (blob) => {
        if (blob) {
          // convert Blob to File
          let file = new File([blob], uploadAvatar.name, {
            type: uploadAvatar.type,
            lastModified: new Date().getTime(),
          });
          await handleUploadAvatar(file);
        }
      });
    }
    handleAvatarEditorClose();
  };

  function handleAvatarEditorClose() {
    if (!uploadAvatarLoading) {
      setUploadAvatar(null);
      setScaleAvatar(1);
      setVisibleEditAvatar(false);
    }
  }

  const handleEditAvatarClick = () => {
    if (type !== "Student" && type !== "Instructor") setVisibleEditAvatar(true);
  };

  return (
    <AccountSettingWrapper type={type}>
      {type !== "Student" && type !== "Instructor" && (
        <Modal
          title="Update Avatar"
          visible={visibleEditAvatar}
          destroyOnClose={true}
          onCancel={handleAvatarEditorClose}
          footer={
            uploadAvatar
              ? [
                  <Button key="cancel" onClick={handleAvatarEditorClose}>
                    Cancel
                  </Button>,
                  <Button
                    key="save"
                    type="primary"
                    loading={uploadAvatarLoading}
                    onClick={handleAvatarEditorOk}
                  >
                    Save Changes
                  </Button>,
                ]
              : false
          }
        >
          <div
            className="avatar-editor"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Button
              icon={<UploadOutlined />}
              onClick={() => uploadFileRef.current.click()}
            >
              Click to Upload Avatar
            </Button>
            <input
              style={{ display: "none" }}
              ref={uploadFileRef}
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={(fileChanges) => {
                const file = fileChanges.target.files[0];
                const { type } = file;
                if (
                  type.endsWith("jpg") ||
                  type.endsWith("jpeg") ||
                  type.endsWith("png")
                )
                  setUploadAvatar(file);
              }}
            />
            {uploadAvatar && (
              <>
                <AvatarEditor
                  style={{ margin: "16px 0" }}
                  ref={editorRef}
                  image={uploadAvatar}
                  width={250}
                  height={250}
                  border={50}
                  color={[0, 0, 0, 0.7]} // RGBA
                  scale={scaleAvatar}
                  rotate={0}
                />
                <input
                  style={{ width: "50%" }}
                  type="range"
                  value={scaleAvatar || 1}
                  min="1"
                  step="0.1"
                  max="10"
                  onChange={handleScaleAvatarChange}
                />
              </>
            )}
          </div>
        </Modal>
      )}
      <Row>
        <Col
          span={24}
          xl={type !== "Student" && type !== "Instructor" ? 16 : 24}
        >
          {type !== "Student" && type !== "Instructor"}
          <Form
            name="account-setting-form"
            className="account-setting_form"
            onFinish={handleSubmit(submitFormHandler)}
          >
            {type !== "Student" && type !== "Instructor" && (
              <Form.Item>
                <Space direction="vertical">
                  <Typography.Title level={5} style={{ margin: 0 }}>
                    Basic Profile
                  </Typography.Title>
                  <Typography.Text style={{ color: "var(--text-color)" }}>
                    Add information about yourself
                  </Typography.Text>
                </Space>
              </Form.Item>
            )}

            <Space
              direction="vertical"
              size={32}
              className="account-setting_profile-wrap"
            >
              <div className="thumbnail-area">
                <div className="file-container">
                  <div className="display-flex flex-column align-item-center account-setting_avatar">
                    {uploadAvatarLoading ? (
                      <Spin></Spin>
                    ) : (
                      <div
                        onClick={handleEditAvatarClick}
                        className="account-setting_avatar-wrapper"
                      >
                        <Image
                          src={media}
                          preview={false}
                          width={"150px"}
                          height={"150px"}
                        />

                        {type !== "Student" && type !== "Instructor" && (
                          <EditOutlined className="account-setting_avatar_edit-icon" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {type === "Student" && type === "Instructor" && (
                <Controller
                  name="userName"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <>
                      <Input
                        disabled={
                          type !== "Student" && type !== "Instructor"
                            ? false
                            : true
                        }
                        className="account-setting_input"
                        placeholder="First Name"
                        {...field}
                      />
                      <Typography.Text className="account-setting_note">
                        Username.
                      </Typography.Text>
                    </>
                  )}
                />
              )}
              <Space style={{ width: "100%" }} align="start">
                <Controller
                  name="firstName"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <>
                      <Input
                        disabled={
                          type !== "Student" && type !== "Instructor"
                            ? false
                            : true
                        }
                        className="account-setting_input"
                        placeholder="First Name"
                        {...field}
                      />
                      <Typography.Text className="account-setting_note">
                        First name.
                      </Typography.Text>
                      {errors.firstName && (
                        <span style={{ color: "red", display: "block" }}>
                          {errors.firstName.message}
                        </span>
                      )}
                    </>
                  )}
                />
                <Controller
                  name="lastName"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <>
                      <Input
                        disabled={
                          type !== "Student" && type !== "Instructor"
                            ? false
                            : true
                        }
                        className="account-setting_input"
                        placeholder="Last Name"
                        {...field}
                      />
                      <Typography.Text className="account-setting_note">
                        Last name.
                      </Typography.Text>
                      {errors.lastName && (
                        <span style={{ color: "red", display: "block" }}>
                          {errors.lastName.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </Space>
              <Controller
                name="birthday"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <>
                    <Space style={{ width: "100%" }}>
                      <DatePicker
                        disabled={
                          type !== "Student" && type !== "Instructor"
                            ? false
                            : true
                        }
                        style={{ display: "flex", width: "50%" }}
                        format="DD/MM/YYYY"
                        allowClear={false}
                        className="account-setting_input"
                        placeholder="Date of birth"
                        disabledDate={(current) => {
                          return current?._d > new Date();
                        }}
                        defaultValue={moment(
                          new Date(userProfile.birthday)
                            .toLocaleDateString()
                            .replaceAll("/", "-")
                        )}
                        onChange={(value) => {
                          let dateToMilliseconds = moment(value).valueOf();
                          let UTC7 = 420;
                          let tzoffset = UTC7 * 60000; //offset in milliseconds
                          let localISOTime = new Date(
                            dateToMilliseconds + tzoffset
                          ).toISOString();
                          field.onChange(localISOTime);
                        }}
                      />
                    </Space>
                    <Typography.Text className="account-setting_note">
                      Date of birth.
                    </Typography.Text>
                    {errors.firstName && <span style={{ color: "red" }}></span>}
                  </>
                )}
              />

              <Controller
                name="introduction"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      disabled={
                        type !== "Student" && type !== "Instructor"
                          ? false
                          : true
                      }
                      className="account-setting_input"
                      placeholder="Headline"
                      maxLength={64}
                      suffix={
                        <div className="account-setting_headline-count">
                          {64 - field.value.length}
                        </div>
                      }
                      {...field}
                    />
                    {type !== "Student" && type !== "Instructor" ? (
                      <Typography.Text className="account-setting_note">
                        Add a professional headline like, "Engineer at Cursus"
                        or "Architect."
                      </Typography.Text>
                    ) : (
                      <Typography.Text className="account-setting_note">
                        Introduction.
                      </Typography.Text>
                    )}
                  </>
                )}
              />

              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <>
                    <ReactQuill
                      readOnly={
                        type !== "Student" && type !== "Instructor"
                          ? false
                          : true
                      }
                      className="account-setting_rich-text"
                      placeholder="Write a little description about you..."
                      {...field}
                    />

                    {type !== "Student" && type !== "Instructor" ? (
                      <Typography.Text className="account-setting_note">
                        Links and coupon codes are not permitted in this
                        section.
                      </Typography.Text>
                    ) : (
                      <Typography.Text className="account-setting_note">
                        Description.
                      </Typography.Text>
                    )}
                  </>
                )}
              />
            </Space>

            <Divider />
            <Form.Item>
              <Typography.Title level={5} style={{ margin: 0 }}>
                Profile Links
              </Typography.Title>
            </Form.Item>
            <Space
              className="account-setting_socials-wrap"
              direction="vertical"
              size={24}
            >
              <Controller
                name="cursus"
                control={control}
                render={({ field }) => (
                  <>
                    <Space className="account-setting_form-ant-space" size={0}>
                      <div className="account-setting_form-ant-space-icon">
                        <img
                          alt="cursus icon"
                          style={{ width: "100%" }}
                          src="/logo.png"
                        />
                      </div>
                      <Input
                        disabled
                        className="account-setting_input account-setting_input-socials"
                        placeholder="Cursus Profile"
                        {...field}
                      />
                    </Space>

                    {type !== "Student" && type !== "Instructor" ? (
                      <Typography.Text className="account-setting_note">
                        Your cursus profile.
                      </Typography.Text>
                    ) : (
                      <Typography.Text className="account-setting_note">
                        Cursus profile.
                      </Typography.Text>
                    )}
                  </>
                )}
              />
              <Controller
                name="facebookLink"
                control={control}
                render={({ field }) => (
                  <>
                    <Space
                      className="account-setting_form-ant-space account-setting_form-facebook"
                      size={0}
                    >
                      <FacebookIcon className="account-setting_form-icon account-setting_form-icon-facebook" />
                      <Input
                        disabled={
                          type !== "Student" && type !== "Instructor"
                            ? false
                            : true
                        }
                        className="account-setting_input account-setting_input-socials"
                        placeholder="Facebook Profile"
                        {...field}
                      />
                    </Space>

                    {type !== "Student" && type !== "Instructor" ? (
                      <Typography.Text className="account-setting_note">
                        Add your Facebook profile link. (e.g.
                        https://facebook.com/johndoe)
                      </Typography.Text>
                    ) : (
                      <Typography.Text className="account-setting_note">
                        Facebook profile.
                      </Typography.Text>
                    )}
                  </>
                )}
              />
              <Controller
                name="twitterLink"
                control={control}
                render={({ field }) => (
                  <>
                    <Space
                      className="account-setting_form-ant-space account-setting_form-twitter"
                      size={0}
                    >
                      <TwitterIcon className="account-setting_form-icon account-setting_form-icon-twitter" />
                      <Input
                        disabled={
                          type !== "Student" && type !== "Instructor"
                            ? false
                            : true
                        }
                        className="account-setting_input account-setting_input-socials"
                        placeholder="Twitter Profile"
                        {...field}
                      />
                    </Space>

                    {type !== "Student" && type !== "Instructor" ? (
                      <Typography.Text className="account-setting_note">
                        Add your Twitter profile link. (e.g.
                        https://twitter.com/johndoe)
                      </Typography.Text>
                    ) : (
                      <Typography.Text className="account-setting_note">
                        Twitter profile.
                      </Typography.Text>
                    )}
                  </>
                )}
              />
              <Controller
                name="linkedInLink"
                control={control}
                render={({ field }) => (
                  <>
                    <Space
                      className="account-setting_form-ant-space account-setting_form-linkedin"
                      size={0}
                    >
                      <LinkedinIcon className="account-setting_form-icon account-setting_form-icon-linkedin" />
                      <Input
                        disabled={
                          type !== "Student" && type !== "Instructor"
                            ? false
                            : true
                        }
                        className="account-setting_input account-setting_input-socials"
                        placeholder="LinkedIn Profile"
                        {...field}
                      />
                    </Space>

                    {type !== "Student" && type !== "Instructor" ? (
                      <Typography.Text className="account-setting_note">
                        Add your LinkedIn profile link. (e.g.
                        https://linkedIn.com/johndoe)
                      </Typography.Text>
                    ) : (
                      <Typography.Text className="account-setting_note">
                        LinkedIn profile.
                      </Typography.Text>
                    )}
                  </>
                )}
              />
              <Controller
                name="youtubeLink"
                control={control}
                render={({ field }) => (
                  <>
                    <Space
                      className="account-setting_form-ant-space account-setting_form-youtube"
                      size={0}
                    >
                      <YoutubeIcon className="account-setting_form-icon account-setting_form-icon-youtube" />
                      <Input
                        disabled={
                          type !== "Student" && type !== "Instructor"
                            ? false
                            : true
                        }
                        className="account-setting_input account-setting_input-socials"
                        placeholder="Youtube Profile"
                        {...field}
                      />
                    </Space>

                    {type !== "Student" && type !== "Instructor" ? (
                      <Typography.Text className="account-setting_note">
                        Add your Youtube profile link. (e.g.
                        https://youtube.com/johndoe)
                      </Typography.Text>
                    ) : (
                      <Typography.Text className="account-setting_note">
                        Youtube profile.
                      </Typography.Text>
                    )}
                  </>
                )}
              />
              {type !== "Student" && type !== "Instructor" && (
                <RedButtonDetailPage
                  htmlType="submit"
                  loading={updateProfileLoading}
                  className="account-setting_btn-submit"
                >
                  Save Changes
                </RedButtonDetailPage>
              )}
            </Space>
          </Form>
        </Col>
      </Row>
    </AccountSettingWrapper>
  );
}

export default AccountSetting;
