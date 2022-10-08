import Wrapper from "./BrowserInstructorStyled";
import { Row, Col, Input, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import CardBrowserInstructor from "./Components/CardBrowserInstructor/CardBrowserInstructor";
import { getInstructorByKeyWord } from "apis/features/Instructor/Instructor";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function BrowserInstructor() {
  const navigate = useNavigate();
  const [Keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [listSearch, setListSearch] = useState([]);

  useEffect(() => {
    let idTimeout = setTimeout(() => {
      (async () => {
        setLoading(true);
        const response = await getInstructorByKeyWord(Keyword);
        setListSearch(response.data.data);
        setLoading(false);
      })();
    }, 500);
    return () => {
      clearTimeout(idTimeout);
    };
  }, [Keyword]);

  console.log(listSearch);

  return (
    <Wrapper>
      <Input
        size="large"
        placeholder="Search Tutors..."
        prefix={<SearchOutlined style={{ fontSize: 22 }} />}
        className="input-search"
        onChange={(e) => setKeyword(e.target.value)}
        value={Keyword}
      />
      <Spin spinning={loading}>
        {listSearch.length === 0 && (
          <p style={{ fontSize: 24, textAlign: "center", marginTop: 16 }}>
            No result match
          </p>
        )}
        <Row className="mg-top">
          {listSearch?.map((instructor) => (
            <Col
              key={instructor.id}
              onClick={(e) => navigate(`/profile/${instructor.id}`)}
              style={{ cursor: "pointer" }}
              className="padding-1  width-full"
              sm={24}
              md={12}
              lg={8}
              xl={6}
            >
              <CardBrowserInstructor {...instructor} />
            </Col>
          ))}
        </Row>
      </Spin>
    </Wrapper>
  );
}
