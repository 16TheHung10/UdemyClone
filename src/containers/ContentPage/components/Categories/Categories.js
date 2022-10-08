// SVG
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
// ANT design
import { Button, Form, Input, message, Modal, Table, Tooltip } from "antd";
// API
import {
  deleteCategory,
  getCategoryById,
  postNewCategory,
  putCategory
} from "apis/features/Category/CategoryAPI";
import { getPropertiesFilter } from "apis/features/Courses/Courses";
import { ReactComponent as CategoriesIcon } from "assets/svg/categories.svg";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
// redux of sidebar
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "redux/features/auth/AuthSelector";
import { sideBarAction } from "redux/features/sidebar/sidebarSlice";
import * as yup from "yup";
// style component
import Wrapper from "./CategoriesStyle";

// Schema yup for new categories
const schemaCreateNew = yup
  .object()
  .shape({
    name: yup.string().required("This felid is required"),
  })
  .required();

// Schema yup for update category
const schemaUpdateCategory = yup
  .object()
  .shape({
    name: yup.string().required("This felid is required"),
  })
  .required();

function Categories(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [errorsSystem, setErrorsSystem] = useState("");
  const userProfile = useSelector(selectUser);
  // Set state of redux side bar
  const getCategories = async () => {
    let response = await getPropertiesFilter();
    setCategories(response.data.data.category);
  };

  const getCategoriesById = async (id) => {
    let response = await getCategoryById(id);
    setCategoryUpdate(response.data.data.name);
  };

  useEffect(() => {
    if (userProfile?.role !== "Admin") {
      navigate("/");
    }
    dispatch(sideBarAction.changeToDashboard());
    // Get data of categories
    getCategories();
  }, []);

  // -----UseForm hook----
  // 1. For create new categories form
  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
    },
    resolver: yupResolver(schemaCreateNew),
  });

  // 2. For update new categories
  const {
    control: control2,
    register: register2,
    handleSubmit: handleSubmit2,
    watch: watch2,
    setValue: setValue2,
    setError: setError2,
    reset: reset2,
    formState: { errors: errors2 },
  } = useForm({
    defaultValues: {
      name: "",
    },
    resolver: yupResolver(schemaUpdateCategory),
  });

  //----End UseForm hook-----

  // ---Mỗi khi put change---
  useEffect(() => {
    const subscription = watch((value, { name, type }) => setErrorsSystem(""));
    const subscription2 = watch2((value, { name, type }) => {
      setErrorsSystem("");
    });
    return () => {
      subscription.unsubscribe();
      subscription2.unsubscribe();
    };
  }, [watch, watch2]);

  // ---End----

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
      title: (
        <div className="text-center">
          <span>Categories</span>
        </div>
      ),
      dataIndex: "categories",
      key: "categories",
      width: "10%",
    },
    {
      title: "Number of courses",
      dataIndex: "numberOfCourses",
      key: "numberOfCourses",
      width: "10%",
      align: "center",
    },
    {
      title: (
        <div className="text-center">
          <span>Action</span>
        </div>
      ),
      dataIndex: "action",
      key: "action",
      width: "10%",
      render: (_, record) => (
        <div className="actionContent text-center">
          {/* <a>Invite {record.key}</a> */}
          <Tooltip title="Edit categories">
            <EditOutlined
              onClick={(e) => {
                setIdUpdate(record.key);
                setIsModalUpdateVisible(true);
                getCategoriesById(record.key);
              }}
              className="iconAction"
            />
          </Tooltip>

          <Tooltip title="Delete categories">
            <DeleteOutlined
              onClick={(e) => {
                setIdDelete(record.key);
                setIsModalDeleteVisible(true);
              }}
              className="iconAction"
            />
          </Tooltip>
        </div>
      ),
    },
  ];
  const data = categories?.map((item, index) => {
    return {
      key: item.id,
      itemNo: index + 1,
      categories: item.name,
      // Chưa có data
      numberOfCourses: item.count,
    };
  });

  // handle create new categories
  const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);

  const handleOkCreate = () => {
    setIsModalCreateVisible(false);
    setErrorsSystem("");
  };

  const handleCancelCreate = () => {
    setIsModalCreateVisible(false);
    setErrorsSystem("");
  };

  const onFinishCreate = async (values) => {
    await postNewCategory(values)
      .then((response) => {
        if (response?.data?.isSuccess) {
          message.success("Create successfully");
          getCategories();
        } else {
          message.error("Create fail");
        }
        setIsModalCreateVisible(false);
        reset();
      })
      .catch((err) => {
        setErrorsSystem(err?.response?.data?.message);
      });
  };

  const onFinishFailedCreate = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // ---End handle create new categories---

  // handle modal delete
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [idDelete, setIdDelete] = useState("");

  const handleOkDelete = async () => {
    let response = await deleteCategory(idDelete);
    if (response?.data?.isSuccess) {
      message.success("Delete successfully");
      getCategories();
    } else {
      message.error("Delete fail");
    }
    setIsModalDeleteVisible(false);
  };

  const handleCancelDelete = () => {
    setIsModalDeleteVisible(false);
  };

  // ---End handle delete---

  // handle courses modal update
  const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
  const [idUpdate, setIdUpdate] = useState("");
  const [categoryUpdate, setCategoryUpdate] = useState("");

  useEffect(() => {
    setValue2("name", categoryUpdate);
  }, [categoryUpdate]);

  const handleOkUpdate = () => {
    setIsModalUpdateVisible(false);
    setErrorsSystem("");
  };

  const handleCancelUpdate = () => {
    setIsModalUpdateVisible(false);
    setErrorsSystem("");
  };

  const onFinishUpdate = async (values) => {
    if (values.name === categoryUpdate) {
      setError2("name", {
        type: "notChange",
        message: "You have not change category",
      });
    } else {
      await putCategory({ ...values, id: idUpdate })
        .then((response) => {
          if (response?.data?.isSuccess) {
            message.success("Update successfully");
            getCategories();
          }
          setIsModalUpdateVisible(false);
        })
        .catch((err) => {
          console.log(err);
          setErrorsSystem(err?.response?.data?.message);
        });
    }
  };

  const onFinishFailedUpdate = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // ---End handle modal update---

  return (
    <Wrapper>
      {/*Area 1  */}
      <div className="title-area">
        <h2>
          <CategoriesIcon style={{ marginRight: 4 }} />
          Categories management
        </h2>
        <Button
          className="btn-red"
          onClick={(e) => setIsModalCreateVisible(true)}
        >
          Create new categories
        </Button>
      </div>
      {/* Area 2 */}
      <div className="table-area">
        <Table columns={columns} dataSource={data} />
      </div>

      {/* Modal create new */}
      <Modal
        title={<h2>Add new categories</h2>}
        visible={isModalCreateVisible}
        onOk={handleOkCreate}
        onCancel={handleCancelCreate}
        footer={[]}
      >
        <h4>Name of categories</h4>
        <Form
          name="basic"
          onFinish={handleSubmit(onFinishCreate)}
          onFinishFailed={onFinishFailedCreate}
          autoComplete="off"
        >
          <Form.Item
            validateStatus={errors.name ? "error" : ""}
            help={errors.name?.message}
          >
            {/* Erros system */}
            <span style={{ color: "red" }}>{errorsSystem}</span>
            {/* Controller */}
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input placeholder="New category" {...field} />
              )}
            />
          </Form.Item>

          <Form.Item>
            <Button
              className="btn-red"
              htmlType="submit"
              style={{ marginRight: 8 }}
            >
              Submit
            </Button>
            <Button
              className="btn-secondary btn-outlined"
              onClick={handleCancelCreate}
              danger
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal delete */}
      <Modal
        title="Delete confirm"
        visible={isModalDeleteVisible}
        onOk={handleOkDelete}
        onCancel={handleCancelDelete}
        footer={[
          <Button
            className="btn-secondary btn-outlined"
            onClick={handleCancelDelete}
          >
            Cancel
          </Button>,
          <Button className="btn-red" onClick={handleOkDelete}>
            OK
          </Button>,
        ]}
      >
        <p>Are you sure to delete?</p>
      </Modal>

      {/* Modal update */}
      <Modal
        title={<h2>Update categories</h2>}
        visible={isModalUpdateVisible}
        onOk={handleOkUpdate}
        onCancel={handleCancelUpdate}
        footer={[]}
      >
        <h4>New name of categories</h4>
        <Form
          name="basic"
          onFinish={handleSubmit2(onFinishUpdate)}
          onFinishFailed={onFinishFailedUpdate}
          autoComplete="off"
        >
          <Form.Item
            validateStatus={errors2.name ? "error" : ""}
            help={errors2.name?.message}
          >
            {/* Erros system */}
            <span style={{ color: "red" }}>{errorsSystem}</span>
            {/* Controller */}
            <Controller
              name="name"
              control={control2}
              render={({ field }) => (
                <Input placeholder="Update category" {...field} />
              )}
            />
          </Form.Item>

          <Form.Item>
            <Button
              className="btn-red"
              htmlType="submit"
              style={{ marginRight: 8 }}
            >
              Submit
            </Button>
            <Button
              className="btn-secondary btn-outlined"
              onClick={handleCancelUpdate}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Wrapper>
  );
}

export default Categories;
