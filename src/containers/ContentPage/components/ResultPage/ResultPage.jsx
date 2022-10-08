import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Checkbox,
  Col,
  Collapse,
  Divider,
  Input,
  PageHeader,
  Radio,
  Row,
  Select,
  Spin,
  Typography,
} from "antd";
import {
  filterAndSearchCourse,
  getPropertiesFilter,
} from "apis/features/Courses/Courses";
import { menu } from "apis/mock/searchResult";
import CourseCard from "components/CourseCard/CourseCard";
import DotLoading from "components/DotLoading/DotLoading";
import useBreadcrumb from "hooks/useBreadcrumb";
import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation, useSearchParams } from "react-router-dom";
import { routesBreadcrumb } from "routes";
import StringUtils from "utils/StringUtils";
import {
  Wrapper,
  WrapperColRight,
  WrapperFaq,
  WrapperHead,
  WrapperPaid,
} from "./ResultPageStyled";

const { Panel } = Collapse;
const { Option } = Select;

const ResultPage = () => {
  const [courseData, setCourseData] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [propertiesFilter, setPropertiesFilter] = useState("");
  const [searchParams, setSearchParams] = useSearchParams({});
  const [stateSearchParams, setStateSearchParams] = useState({});
  const [isFetchAPI, setIsFetchAPI] = useState(false);
  const breadcrumbItems = useBreadcrumb(routesBreadcrumb);
  const isDidMount = useRef(false);
  const location = useLocation();

  const onChangeCheckboxGroup = (values) => {
    let temp = { ...stateSearchParams, category: values };

    setStateAndSearchParams(temp);
  };

  const onChangeRadioGroup = (e) => {
    let temp = { ...stateSearchParams };

    if (e.target.value === temp[e.target.name]) {
      delete temp[e.target.name];
    } else {
      if (e.target.value !== "") {
        temp[e.target.name] = e.target.value;
      } else {
        delete temp[e.target.name];
      }
    }
    setStateAndSearchParams(temp);
  };

  const setStateAndSearchParams = (temp) => {
    setStateSearchParams(temp);
    let tempSearchParams = { ...temp };
    delete tempSearchParams.pageNumber;
    delete tempSearchParams.pageSize;
    setSearchParams(tempSearchParams);
  };

  const renderPanelFaq = () => {
    return Object.entries(propertiesFilter).map((item, index) => {
      if (item[0] === "category") {
        return (
          <Panel
            // collapsible={item.isDisable ? `disabled` : ``}
            header={
              <Typography.Text className="benefit-text">
                {StringUtils.capitalizeFirstLetter(item[0])}
              </Typography.Text>
            }
            key={`panel${item[0]}`}
          >
            <Checkbox.Group
              onChange={onChangeCheckboxGroup}
              defaultValue={searchParams.getAll(item[0])}
            >
              {item[1]?.map((item1, index1) => (
                <Checkbox
                  key={`collapse${item1?.id}${index1}`}
                  value={item1.name}
                >
                  {`${item1?.name} (${item1?.count})`}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </Panel>
        );
      } else {
        const paramsSearch = searchParams.get(item[0]);
        return (
          <Panel
            // collapsible={item.isDisable ? `disabled` : ``}
            header={
              <Typography.Text className="benefit-text">
                {StringUtils.capitalizeFirstLetter(item[0])}
              </Typography.Text>
            }
            collapsible={"header"}
            key={`panel${item[0]}${index}`}
          >
            <Radio.Group
              name={item[0]}
              onChange={onChangeRadioGroup}
              defaultValue={paramsSearch !== null ? paramsSearch : ""}
            >
              <Radio key={`radio${item[0]}${-1}`} value={""}>
                {`All ${item[0]}`}
              </Radio>
              {item[1]?.map((item1, index1) => (
                <Radio key={`radio${item1?.id}${index1}`} value={item1.name}>
                  {item1.name}
                </Radio>
              ))}
            </Radio.Group>
          </Panel>
        );
      }
    });
  };

  useEffect(() => {
    setIsFetchAPI(true);
    (async () => {
      try {
        const response1 = await getPropertiesFilter();
        setPropertiesFilter(response1.data.data);

        const temp = {};
        Object.keys(response1.data.data).map((item) => {
          if (item === "category") {
            let tempCategories = searchParams.getAll(item);
            if (Array.isArray(tempCategories) && tempCategories.length !== 0) {
              temp[item] = tempCategories;
            }
          } else {
            let tempParams = searchParams.get(item);
            if (tempParams !== null) {
              temp[item] = tempParams;
            }
          }
        });
        const searchStr = searchParams.get("text");
        if (searchStr) {
          temp.text = searchStr;
        }

        const orderByStr = searchParams.get("orderBy");
        if (orderByStr) {
          temp.orderBy = orderByStr;
        }

        setStateSearchParams({
          ...temp,
          pageSize: 10,
          pageNumber: 1,
        });

        const response2 = await filterAndSearchCourse(location.search);
        setCourseData(response2.data.data.result);
        setTotalItems(response2.data.data.totalResult);

        if (response2.data.data.totalResult > 10) {
          setHasMore(true);
        }
        isDidMount.current = true;
        setIsFetchAPI(false);
      } catch (error) {}
    })();

    return () => {
      isDidMount.current = false;
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (isDidMount.current) {
        try {
          setIsFetchAPI(true);
          setStateSearchParams({
            ...stateSearchParams,
            pageNumber: 1,
          });
          const response = await filterAndSearchCourse(location.search);
          if (!response?.data?.isSuccess) {
            alert(response?.data?.message);
          } else {
            setCourseData(response.data.data.result);
            setTotalItems(response.data.data.totalResult);
            if (
              response.data.data.totalResult > response.data.data.result.length
            ) {
              setHasMore(true);
            } else {
              setHasMore(false);
            }
          }
        } catch (error) {
          if (error.response.status === 400) {
            alert(error.response.data.message);
          } else {
            alert(error.message);
          }
        } finally {
          setIsFetchAPI(false);
        }
      }
    })();
  }, [location]);

  const loadMore = async () => {
    try {
      if (stateSearchParams?.pageNumber !== undefined) {
        if (courseData.length < totalItems) {
          const response = await filterAndSearchCourse(
            location.search !== "" && !location.search.includes("pagesize")
              ? location.search +
                  `&pageSize=${stateSearchParams.pageSize}&pageNumber=${
                    stateSearchParams.pageNumber + 1
                  }`
              : `?pageSize=${stateSearchParams.pageSize}&pageNumber=${
                  stateSearchParams.pageNumber + 1
                }`
          );
          setStateSearchParams({
            ...stateSearchParams,
            pageNumber: stateSearchParams.pageNumber + 1,
          });
          if (!response?.data?.isSuccess) {
            alert(response?.data?.message);
          } else {
            setCourseData(courseData.concat(response.data.data.result));
          }
        } else {
          setHasMore(false);
        }
      }
    } catch (error) {
      if (error.response.status === 400) {
        alert(error.response.data.message);
      } else {
        alert(error.message);
      }
    }
  };

  const onHandleEnterInputSearch = (e) => {
    let temp = { ...stateSearchParams };
    if (e.target.value.trim() !== "") {
      temp = {
        ...temp,
        text: e.target.value.trim(),
      };
    } else {
      delete temp.text;
    }

    setStateAndSearchParams(temp);
    e.target.value = "";
  };

  const onChangeSelectSort = (values) => {
    let temp = { ...stateSearchParams };
    if (values === "default") {
      delete temp.orderBy;
    } else {
      temp.orderBy = values;
    }

    setStateAndSearchParams(temp);
  };

  return (
    <Wrapper>
      <WrapperHead>
        <Row justify="center">
          <Col span={24} xl={18}>
            <PageHeader
              className="site-page-header"
              title="Search Result"
              style={{ paddingRight: 0 }}
              breadcrumbRender={() => (
                <Breadcrumb>{breadcrumbItems}</Breadcrumb>
              )}
              extra={[
                <Input.Search
                  className="input-text"
                  key={`inputSearch1`}
                  placeholder="input search text"
                  style={{ width: 200 }}
                  onPressEnter={onHandleEnterInputSearch}
                />,
              ]}
            />
          </Col>
        </Row>
      </WrapperHead>

      <Row justify="center">
        <Col span={24} xl={18}>
          <Row justify="center">
            <Col span={8}>
              <WrapperPaid>
                <WrapperFaq>
                  <div className="d-flex justify-content-between">
                    <Typography.Text>Filters</Typography.Text>
                    <Select
                      bordered={false}
                      placeholder="Sort"
                      className="select-filter"
                      onChange={onChangeSelectSort}
                      defaultValue={
                        searchParams.get("orderBy") === null
                          ? "default"
                          : searchParams.get("orderBy")
                      }
                    >
                      {menu.map((item) => (
                        <Option key={item.key} value={item.value}>
                          {item.row}
                        </Option>
                      ))}
                    </Select>
                  </div>
                  <Divider className="divider-col-left" />
                  <Collapse
                    key={"collapse3"}
                    ghost
                    defaultActiveKey={`panelcategory`}
                    expandIcon={({ isActive }) => {
                      return isActive ? (
                        <MinusOutlined className="icon-paid" />
                      ) : (
                        <PlusOutlined className="icon-paid" />
                      );
                    }}
                    expandIconPosition="end"
                  >
                    {propertiesFilter !== "" && renderPanelFaq()}
                  </Collapse>
                </WrapperFaq>
              </WrapperPaid>
            </Col>

            <Col span={16}>
              <Spin
                tip={`Loading...`}
                size="large"
                className="show"
                spinning={isFetchAPI}
              >
                <WrapperColRight>
                  <Typography.Paragraph className="count-result">
                    {totalItems} Results
                    {stateSearchParams.text !== undefined
                      ? ` for query "${stateSearchParams.text}"`
                      : ""}
                  </Typography.Paragraph>
                  <Row>
                    <InfiniteScroll
                      dataLength={courseData?.length}
                      next={loadMore}
                      scrollableTarget="scrollableDiv"
                      hasMore={hasMore}
                      loader={
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "20px",
                          }}
                        >
                          <DotLoading />
                        </div>
                      }
                    >
                      {courseData !== "" &&
                        courseData?.map((course) => (
                          <Col
                            key={course.id}
                            span={24}
                            style={{ marginBottom: "16px" }}
                          >
                            <CourseCard
                              direction={`row`}
                              hover={true}
                              data={course}
                            />
                          </Col>
                        ))}
                    </InfiniteScroll>
                  </Row>
                </WrapperColRight>
              </Spin>
            </Col>
          </Row>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default ResultPage;
