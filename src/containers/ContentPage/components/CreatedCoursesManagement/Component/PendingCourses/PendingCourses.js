import React, { useEffect, useState } from "react";
// ANT design
import { sideBarAction } from "redux/features/sidebar/sidebarSlice";
import { Table, Modal, message, Tooltip, Image, Tag, Button } from "antd";
import ViewCourse from "containers/ContentPage/components/ViewCourse/ViewCourse";
import {
  CheckCircleOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import {
  getAllCreatedCourses,
  putCreatedCourse,
} from "apis/features/Courses/Courses";
import { Link } from "react-router-dom";
// style component
import Wrapper from "./PendingCoursesStyled";
import { getAllSubscriberForUser } from "apis/features/Subscription/Subscription"
import { postNotification } from "apis/features/Notification/Notification";
import { ApproveButton, RejectButton } from 'Theme/GlobalStyles';

function PendingCourses() {
  const [isLoading, setIsLoading] = useState(false);
  const [authorReceivedNotification, setAuthorReceivedNotification] = useState({ id: "", name: "" })
  const [createCourses, setCreatedCourses] = useState([]);
  console.log(createCourses);
  // Handle date time
  const convertDateTime = (data) => {
    const myStringDate = `${new Date(data)}`;

    return myStringDate.slice(0, myStringDate.search("GMT"));
  };
  const getDataCreatedCourses = async () => {
    setIsLoading(true);
    const response = await getAllCreatedCourses();
    setCreatedCourses(response?.data?.data?.result);
    setIsLoading(false);
  };

  const sendNotification = async ({ id, name }, status) => {
    const response = await getAllSubscriberForUser(id)
    const listIdOfAllSubscriber = response?.data?.data?.map((item) => item?.subscriber?.id)
    // noti cho chủ nhân khoá học
    // postNotification({
    //   userIds: [id],
    //   type: 0,
    //   content: `your created courses have been ${status}`,
    // });
    // noti cho những người subscriber
    if (status === "approved") {
      postNotification({
        userIds: [...listIdOfAllSubscriber],
        type: 0,
        content: `Instructor ${name} have released a new course`,
      });
    }
  }

  useEffect(() => {
    getDataCreatedCourses();
  }, []);

  // table
  const columns = [
    {
      title: (
        <div className="text-center">
          <span>No</span>
        </div>
      ),
      dataIndex: "itemNo",
      key: "itemNo",
      width: "5%",
      render: (text) => (
        <div className="text-center">
          <span>{text}</span>
        </div>
      ),
      // render: (text) => <a>{text}</a>,
    },
    {
      dataIndex: "thumbnail",
      key: "thumbnail",
      width: "5%",
      render: (text) => (
        <div className="text-center">
          <Image width={64} height={64} src={text} />
        </div>
      ),
    },
    {
      title: (
        <div className="text-center">
          <span>Course title</span>
        </div>
      ),
      dataIndex: "courseTitle",
      key: "courseTitle",
      width: "10%",
      render: (text, record) => (
        <Link to={`/courses/${record.key}`}>
          <div className="text-center">
            <p className="long-content ">{text}</p>
          </div>
        </Link>
      ),
    },
    {
      title: (
        <div className="text-center">
          <span>Category</span>
        </div>
      ),
      dataIndex: "category",
      key: "category",
      width: "10%",
      render: (text) => (
        <div className="text-center">
          <span className="long-content">{text}</span>
        </div>
      ),
    },
    {
      title: (
        <div className="text-center">
          <span>Author</span>
        </div>
      ),
      dataIndex: "author",
      key: "author",
      width: "10%",
      render: (text) => (
        <div className="text-center">
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: (
        <div className="text-center">
          <span>Course status</span>
        </div>
      ),
      dataIndex: "courseStatus",
      key: "courseStatus",
      width: "5%",
      render: (text) => (
        <div className="text-center">
          {text === 0 && <Tag color="#108ee9">Pending</Tag>}
          {text === 1 && <Tag color="#87d068">Approved</Tag>}
          {text === 2 && <Tag color="#f50">Reject</Tag>}
        </div>
      ),
    },
    {
      title: (
        <div className="text-center">
          <span>Publish Date</span>
        </div>
      ),
      dataIndex: "publishDate",
      key: "publishDate",
      width: "8%",
      render: (text) => (
        <div className="text-center">
          <span className="long-content">{convertDateTime(text)}</span>
        </div>
      ),
    },
    {
      title: (
        <div className="text-center">
          <span>Action</span>
        </div>
      ),
      dataIndex: "action",
      key: "action",
      fixed: "right",
      width: "10%",
      render: (_, record) => (
        <div className="actionContent text-center">
          {/* <a>Invite {record.key}</a> */}
          <div>
            <Tooltip title="Approve course">
              <CheckOutlined
                onClick={(e) => {
                  setIsModalVisible(true);
                  setTypeModal("approve");
                  setDataReport({
                    courseId: record.key,
                    status: 1,
                  });
                  setAuthorReceivedNotification({ id: record.authorId, name: record.author })
                }}
                className="iconAction"
              />
            </Tooltip>

            <Tooltip title="Reject course">
              <CloseOutlined
                onClick={(e) => {
                  setIsModalVisible(true);
                  setTypeModal("reject");
                  setDataReport({
                    courseId: record.key,
                    status: 2,
                  });
                  setAuthorReceivedNotification({ id: record.authorId, name: record.author })
                }}
                className="iconAction"
              />
            </Tooltip>
            <Button type="primary" onClick={() => showModal(createCourses[record.itemNo - 1])}>
              View Detail
            </Button>
          </div>
        </div >
      ),
    },
  ];

  const data = createCourses?.map((item, index) => {
    return {
      key: item?.id,
      itemNo: index + 1,
      thumbnail: item?.imageUrl,
      courseTitle: item?.title,
      author: item?.user?.fullName,
      authorId: item?.user?.id,
      courseStatus: item?.status,
      publishDate: item?.createdAt,
      category: item?.categories.map((item) => item?.name).join(", "),
    };
  });

  // handle modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [dataReport, setDataReport] = useState({
    courseId: "",
    status: "",
  });

  const handleOk = async () => {
    let response;
    switch (typeModal) {
      case "reject":
        response = await putCreatedCourse(dataReport);
        if (response?.data?.isSuccess) {
          message.success("Reject successfully");
          sendNotification(authorReceivedNotification, "rejected")
          getDataCreatedCourses();
          setIsModalVisible(false);
          setIsModalVisible2(false);
        } else {
          message.error("Reject fail");
          setIsModalVisible(false);
          setIsModalVisible2(false);
        }
        break;
      case "approve":
        response = await putCreatedCourse(dataReport);
        if (response?.data?.isSuccess) {
          message.success("approve successfully");
          sendNotification(authorReceivedNotification, "approved")
          getDataCreatedCourses();
          setIsModalVisible(false);
          setIsModalVisible2(false);
        } else {
          message.error("approve fail");
          setIsModalVisible(false);
          setIsModalVisible2(false);
        }
        break;
      default:
        break;
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // ---End handle modal---


  const showModal = (data) => {
    setIsModalVisible2(true);
    if (!!data) {
      setModalData(data);
    }
  };

  const handleModalOk = () => {
    setIsModalVisible2(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible2(false);
  };



  const convertData = (data) => {
    const courseItem = {};

    let basic = {
      title: data?.title,
      shortDescription: data?.shortDescription,
      description: data?.description,
      objective: data?.objective,
      requirements: data?.requirements,
      levelIds: data?.levels?.reduce((a, b) => {
        return [...a, b.id];
      }, []),
      audioLanguageIds: data?.audioLanguages?.reduce((a, b) => {
        return [...a, b.id];
      }, []),
      closeCaptionIds: data?.closeCaptions?.reduce((a, b) => {
        return [...a, b.id];
      }, []),
      categoryIds: data?.categories?.reduce((a, b) => {
        return [...a, b.id];
      }, []),
    };
    let price = {
      price: data?.price,
      salePrice: data?.salePrice,
      isFree: data?.isFree,
      isRequiredEnroll: data?.isRequiredEnroll,
    };
    const sectionsArray = data?.sections;
    sectionsArray?.forEach((section) => {
      section.lectures?.forEach((lecture) => {
        lecture.type = "Lecture";
        lecture.key = lecture.title;
        lecture.attachments.forEach((attachment) => {
          delete attachment.lectureId;
          delete attachment.assignmentId;
        });
      });
      section.quizzes?.forEach((quiz) => {
        quiz.type = "Quiz";
        quiz.key = quiz.title;
        quiz.questions?.forEach((question) => {
          question.key = question.title;
          delete question.quizId;
          question.options.forEach((option) => {
            delete option.questionId;
          });
        });
      });
      section.assignments?.forEach((assignment) => {
        assignment.type = "Assignment";
        assignment.key = assignment.title;
        assignment.attachments.forEach((attachment) => {
          delete attachment.lectureId;
          delete attachment.assignmentId;
        });
      });
      const tempArray = section?.lectures?.concat(
        section.quizzes,
        section.assignments
      );
      tempArray?.sort((a, b) => a.ordinalNumber > b.ordinalNumber);
      delete section.lectures;
      delete section.quizzes;
      delete section.assignments;
      section.contents = tempArray;
    });
    courseItem.id = data?.id;
    courseItem.sections = sectionsArray;
    courseItem.basic = basic;
    courseItem.price = price;
    courseItem.media = {
      previewVideoType: data?.previewVideoType,
      previewVideoUrl: data?.previewVideoUrl,
      previewVideoId: data?.previewVideoId,
      imageUrl: data?.imageUrl,
      previewVideoName: data?.previewVideoName,
    };
    if (data?.previewVideoType === "HTML5(MP4)") {
      courseItem.media.localVideoUrl = data?.previewVideoUrl;
    }
    return courseItem;

  };

  console.log(modalData)
  return (
    <Wrapper>
      {/* Area 2 */}
      <Table

        columns={columns}
        dataSource={data}
        loading={isLoading}
        scroll={{
          x: 1400,
        }}
      />
      {/* Modal */}
      <Modal
        title="Confirm action"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button className="btn-secondary btn-outlined" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button className="btn-red" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        {typeModal === "approve" && <p>Are you sure to approve this course?</p>}
        {typeModal === "reject" && <p>Are you sure to reject this course?</p>}
      </Modal>
      <Modal
        title="Course Detail"
        visible={isModalVisible2}
        onOk={handleModalOk}
        style={{ top: 10 }}
        onCancel={handleModalCancel}
        width={"100%"}
        footer={[
          <Tooltip title="Approve course">
            <ApproveButton onClick={(e) => {
              setIsModalVisible(true);
              setTypeModal("approve");
              setDataReport({
                courseId: modalData.id,
                status: 1,
              });
              setAuthorReceivedNotification({ id: modalData.user.authorId, name: modalData.user.author })
            }} type="primary">Approve</ApproveButton>


          </Tooltip>,

          <Tooltip title="Reject course">
            <RejectButton style={{ margin: "0 20px", }}
              onClick={(e) => {
                setIsModalVisible(true);
                setTypeModal("reject");
                setDataReport({
                  courseId: modalData.id,
                  status: 2,
                });
                setAuthorReceivedNotification({ id: modalData.user.authorId, name: modalData.user.author })
              }} type="primary">Reject</RejectButton>

          </Tooltip>
        ]}
      >
        <ViewCourse courseItem={convertData(modalData)} />
      </Modal>
    </Wrapper>
  );
}

export default PendingCourses;
