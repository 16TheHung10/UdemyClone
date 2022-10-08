import Wrapper from "./HelpPageStyled";
import React, { useState } from "react";
import { Input, Space, Tabs, Row, Col } from "antd";
import {
  SearchOutlined,
  WalletOutlined,
  NotificationOutlined,
  FileDoneOutlined,
  FileProtectOutlined,
  UserOutlined,
  MobileOutlined,
} from "@ant-design/icons";
import { ReactComponent as EditIcon } from "assets/svg/edit-page.svg";
import { ReactComponent as WindowIcon } from "assets/svg/browser-window.svg";
import { ReactComponent as FileCheckIcon } from "assets/svg/file-check-alt.svg";
import { ReactComponent as DestopCloudIcon } from "assets/svg/desktop-cloud.svg";
import { ReactComponent as BookIcon } from "assets/svg/book.svg";
import { ReactComponent as WalletIcon } from "assets/svg/wallet.svg";
import ModalAnswer from "./Component/ModalAnswer/ModalAnswer";
import * as dataAnswer from "./dataAnswer/dataAnswer";
const {
  payments,
  sellingAndPromotion,
  qualityStandards,
  courseBuilding,
  courseManagement,
  trustSafety,
  gettingStarted,
  accountProfile,
  troubleShooting,
  courseTaking,
  purchaseRefunds,
  mobile,
  instructorQuestions1,
  instructorQuestions2,
  instructorQuestions3,
  instructorQuestions4,
  instructorQuestions5,
  instructorQuestions6,
  studentQuestions1,
  studentQuestions2,
  studentQuestions3,
  studentQuestions4,
  studentQuestions5,
  studentQuestions6,
} = dataAnswer;

const { TabPane } = Tabs;

export default function HelpPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleModalShow = (titleModal, contentModal) => {
    setTitle(titleModal);
    setContent(contentModal);
    setIsVisible(true);
  };
  const onChangeTab = (key) => {
    console.log(key);
  };

  return (
    <Wrapper>
      {/* Modal */}
      <ModalAnswer
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        title={title}
        content={content}
      />
      {/* End modal */}

      <div className="headerHelpPage">
        <h2>How may we help you?</h2>
      </div>

      <div className="tab-area">
        <Tabs defaultActiveKey="1" size="large" onChange={onChangeTab} centered>
          {/* Tabpane 1 */}
          <TabPane
            className="tab-item"
            tab={<span className="tabHeader">Instructor</span>}
            key="1"
          >
            {/* Tabpane 1 zone 1 */}
            <h3 className="headerContent">Select a topic to search for help</h3>
            <Row>
              <Col
                md={8}
                sm={24}
                xs={24}
                className="help-item"
                onClick={(e) => handleModalShow("Payments", payments)}
              >
                <WalletOutlined style={{ fontSize: 36 }} />
                <h4>Payments</h4>
                <span>
                  Understand the revenue share and how to receive payments.
                </span>
              </Col>
              <Col
                md={8}
                sm={24}
                xs={24}
                className="help-item"
                onClick={(e) =>
                  handleModalShow("Selling And Promotion", sellingAndPromotion)
                }
              >
                <NotificationOutlined style={{ fontSize: 36 }} />
                <h4>Selling & Promotion</h4>
                <span>Learn about the announcement and promotional tools.</span>
              </Col>
              <Col
                md={8}
                sm={24}
                xs={24}
                className="help-item"
                onClick={(e) =>
                  handleModalShow("Quality Standards", qualityStandards)
                }
              >
                <FileDoneOutlined style={{ fontSize: 36 }} />
                <h4>Quality Standards</h4>
                <span>
                  Learn what it takes to create a high quality course.
                </span>
              </Col>
            </Row>

            <Row>
              <Col
                md={8}
                sm={24}
                xs={24}
                className="help-item"
                onClick={(e) =>
                  handleModalShow("Course Building", courseBuilding)
                }
              >
                <EditIcon width={36} height={36} />
                <h4>Course Building</h4>
                <span>Build your course curriculum and landing page.</span>
              </Col>
              <Col
                md={8}
                sm={24}
                xs={24}
                className="help-item"
                onClick={(e) =>
                  handleModalShow("Course Management", courseManagement)
                }
              >
                <WindowIcon width={36} height={36} />
                <h4>Course Management</h4>
                <span>Maintain your course and engage with students.</span>
              </Col>
              <Col
                md={8}
                sm={24}
                xs={24}
                className="help-item"
                onClick={(e) => handleModalShow("Trust & Safety", trustSafety)}
              >
                <FileProtectOutlined style={{ fontSize: 36 }} />
                <h4>Trust & Safety</h4>
                <span>Policy and copyright questions and guidance.</span>
              </Col>
            </Row>

            {/* Tabpane 1 zone 2 */}
            <h3 className="headerContent">Frequently Asked Questions</h3>
            <Row>
              <Col
                md={8}
                sm={24}
                xs={24}
                className="help-item"
                onClick={(e) =>
                  handleModalShow(
                    "Promote Your Course With Coupons and Referral Links",
                    instructorQuestions1
                  )
                }
              >
                <span>Promote Your Course With Coupons and Referral Links</span>
              </Col>
              <Col
                md={8}
                sm={24}
                xs={24}
                className="help-item"
                onClick={(e) =>
                  handleModalShow(
                    "How to Select Your Payout Method And Become a Premium Instructor",
                    instructorQuestions2
                  )
                }
              >
                <span>
                  How to Select Your Payout Method And Become a Premium
                  Instructor
                </span>
              </Col>
              <Col
                md={8}
                sm={24}
                xs={24}
                className="help-item"
                onClick={(e) =>
                  handleModalShow(
                    "Cursus Course Quality Checklist",
                    instructorQuestions3
                  )
                }
              >
                <span>Cursus Course Quality Checklist</span>
              </Col>
            </Row>

            <Row>
              <Col
                md={8}
                sm={24}
                xs={24}
                className="help-item"
                onClick={(e) =>
                  handleModalShow(
                    "Instructor Revenue Share",
                    instructorQuestions4
                  )
                }
              >
                <span>Instructor Revenue Share</span>
              </Col>
              <Col
                md={8}
                sm={24}
                xs={24}
                className="help-item"
                onClick={(e) =>
                  handleModalShow(
                    "Instructor Promotional Agreements and Cursus Deals",
                    instructorQuestions5
                  )
                }
              >
                <span>Instructor Promotional Agreements and Cursus Deals</span>
              </Col>
              <Col
                md={8}
                sm={24}
                xs={24}
                className="help-item"
                onClick={(e) =>
                  handleModalShow(
                    "How to Become an Instructor: FAQ",
                    instructorQuestions6
                  )
                }
              >
                <span>How to Become an Instructor: FAQ</span>
              </Col>
            </Row>
          </TabPane>
          {/* Tabpane 2 */}
          <TabPane
            className="tab-item"
            tab={<span className="tabHeader">Student</span>}
            key="2"
          >
            {/* Tabpane 2 zone 1 */}
            <h3 className="headerContent">Select a topic to search for help</h3>
            <Row>
              <Col
                md={8}
                sm={24}
                xs={24}
                className="help-item"
                onClick={(e) =>
                  handleModalShow("Getting Started", gettingStarted)
                }
              >
                <FileCheckIcon width={36} height={36} />
                <h4>Getting Started</h4>
                <span>Learn how Cursus works and how to start learning.</span>
              </Col>
              <Col
                md={8}
                sm={24}
                xs={24}
                className="help-item"
                onClick={(e) =>
                  handleModalShow("Account Profile", accountProfile)
                }
              >
                <UserOutlined style={{ fontSize: 36 }} />
                <h4>Account/Profile</h4>
                <span>Manage your account settings.</span>
              </Col>
              <Col
                md={8}
                sm={24}
                xs={24}
                className="help-item"
                onClick={(e) =>
                  handleModalShow("Trouble Shooting", troubleShooting)
                }
              >
                <DestopCloudIcon width={36} height={36} />
                <h4>Troubleshooting</h4>
                <span>Experiencing a bug? Check here.</span>
              </Col>
            </Row>
            <Row>
              <Col
                md={8}
                sm={24}
                xs={24}
                className="help-item"
                onClick={(e) => handleModalShow("Course Taking", courseTaking)}
              >
                <BookIcon width={36} height={36} />
                <h4>Course Taking</h4>
                <span>Everything about taking a course on Udemy.</span>
              </Col>
              <Col
                md={8}
                sm={24}
                xs={24}
                className="help-item"
                onClick={(e) =>
                  handleModalShow("Purchase Refunds", purchaseRefunds)
                }
              >
                <WalletIcon width={36} height={36} />
                <h4>Purchase/Refunds</h4>
                <span>
                  Learn about coupons, how to send gifts, and refunds.
                </span>
              </Col>
              <Col
                md={8}
                sm={24}
                xs={24}
                className="help-item"
                onClick={(e) => handleModalShow("Mobile", mobile)}
              >
                <MobileOutlined style={{ fontSize: 36 }} />
                <h4>Mobile</h4>
                <span>On the go? Learn about our mobile app.</span>
              </Col>
            </Row>

            {/* Tabpane 2 zone 2 */}
            <h3 className="headerContent">Frequently Asked Questions</h3>
            <Row>
              <Col
                md={8}
                sm={24}
                xs={24}
                className="help-item"
                onClick={(e) =>
                  handleModalShow("Lifetime Access", studentQuestions1)
                }
              >
                <span>Lifetime Access</span>
              </Col>
              <Col
                md={8}
                sm={24}
                xs={24}
                className="help-item"
                onClick={(e) =>
                  handleModalShow("Cursus FAQ", studentQuestions2)
                }
              >
                <span>Cursus FAQ</span>
              </Col>
              <Col
                md={8}
                sm={24}
                xs={24}
                className="help-item"
                onClick={(e) =>
                  handleModalShow("Downloading Courses", studentQuestions3)
                }
              >
                <span>Downloading Courses</span>
              </Col>
            </Row>

            <Row>
              <Col
                md={8}
                sm={24}
                xs={24}
                className="help-item"
                onClick={(e) =>
                  handleModalShow(
                    "Certificate of Completion",
                    studentQuestions4
                  )
                }
              >
                <span>Certificate of Completion</span>
              </Col>
              <Col
                md={8}
                sm={24}
                xs={24}
                className="help-item"
                onClick={(e) =>
                  handleModalShow("Refund a Course", studentQuestions5)
                }
              >
                <span>Refund a Course</span>
              </Col>
              <Col
                md={8}
                sm={24}
                xs={24}
                className="help-item"
                onClick={(e) =>
                  handleModalShow(
                    "How to Solve Payment Issues",
                    studentQuestions6
                  )
                }
              >
                <span>How to Solve Payment Issues</span>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </div>
    </Wrapper>
  );
}
