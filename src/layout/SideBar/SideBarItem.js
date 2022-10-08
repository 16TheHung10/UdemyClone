import {
  AppstoreOutlined,
  BookOutlined,
  CheckCircleOutlined,
  FlagOutlined,
  HeartOutlined,
  HomeOutlined,
  PlusCircleOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  SettingOutlined,
  StarOutlined,
  StockOutlined,
  FileTextOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Button, Typography } from "antd";
import { fakeOnlineIntructor } from "apis/mock/SideBarFakeData";
import { ReactComponent as CategoriesIcon } from "assets/svg/categories.svg";
import { ReactComponent as ClassIcon } from "assets/svg/class.svg";
import { ReactComponent as UserIcon } from "assets/svg/users.svg";
import { dividerItem, getItem } from "layout/LayoutUtils";
import { Link } from "react-router-dom";

//MAIN MENU SECTION
const mainItems = (categories, user) => [
  getItem(
    <Link to="/">
      <span className="ant-menu-item">Home</span>
    </Link>,
    "/",
    <HomeOutlined />
  ),
  getItem(
    <Link to="/result">
      <span className="ant-menu-item">Explore</span>
    </Link>,
    "/result",
    <SearchOutlined />
  ),
  getItem(
    <div>
      <span className="ant-menu-item">Categories</span>
    </div>,
    "Categories",
    <AppstoreOutlined />,
    categories?.map((item) => {
      return getItem(
        <a href={`/result?category=${encodeURIComponent(item.name)}`}>
          <Typography.Text
            style={{ display: "block" }}
            ellipsis={{
              tooltip: item.name,
            }}
            className="ant-menu-item ellipsis"
          >
            {item.name}
          </Typography.Text>
        </a>,
        `/${item.id}`
      );
    })
  ),
  // getItem(
  //   <div>
  //     <span className="ant-menu-item">Test</span>
  //   </div>,
  //   "Test",
  //   <FileDoneOutlined />,
  //   [
  //     getItem("Certification Fill Form", "153"),
  //     getItem("Certification Fill Form", "15333"),
  //     getItem("Test View", "16"),
  //     getItem("Test Result", "17"),
  //     getItem("My Certification", "18"),
  //   ]
  // ),
  user &&
    getItem(
      <Link to="/wishlist">
        <span className="ant-menu-item">Saved Courses</span>
      </Link>,
      "/wishlist",
      <HeartOutlined />
    ),
  user !== null && dividerItem,
  user !== null &&
    getItem(
      <span className="subscription-title">SUBSCRIPTIONS</span>,
      "46",
      null,
      null,
      "group"
    ),
];
//INSTRUCTOR SECTION
// Get Online instructor Array list from API, add into instructorItem
let instructorItems = [];
if (
  fakeOnlineIntructor &&
  fakeOnlineIntructor.length > 1 &&
  fakeOnlineIntructor[0].name
) {
  instructorItems = [
    ...fakeOnlineIntructor.map((list) => {
      return getItem(
        list.name,
        null,
        <Badge dot={list.isOnline} offset={[158, 18]}>
          <Avatar src={list.imgUrl} />
        </Badge>
      );
    }),
  ];
} else {
  instructorItems.push(
    getItem(
      <Button type="text" disabled>
        NO SUBSCRIPTIONS
      </Button>
    )
  );
}

//SETTING SECTION
export const settingItems = [
  getItem(
    <Link to="/browse-Instructors">
      <span className="ant-menu-item">Browse Instructors</span>
    </Link>,
    "/browse-Instructors",
    <PlusCircleOutlined />
  ),
  getItem(
    <Link to="/setting">
      <span className="ant-menu-item">Setting</span>
    </Link>,
    "/setting",
    <SettingOutlined />
  ),
  getItem(
    <Link to="/help">
      <span className="ant-menu-item">Help</span>
    </Link>,
    "/help",
    <QuestionCircleOutlined />
  ),
  getItem(
    <Link to="/report-history">
      <span className="ant-menu-item">Report History</span>
    </Link>,
    "/report-history",
    <FlagOutlined />
  ),
  // getItem(
  //   <Link to="/feedback">
  //     <span className="ant-menu-item">Send Feedback</span>
  //   </Link>,
  //   "/feedback",
  //   <MessageOutlined />
  // ),
  dividerItem,

  // getItem(
  //   <div className="common-url">
  //     <Link to="#">
  //       <span>About</span>
  //     </Link>
  //     <Link to="#">
  //       <span>Press</span>
  //     </Link>
  //     <Link to="#">
  //       <span>Contact Us</span>
  //     </Link>

  //     <Link to="#">
  //       <span>Advertise</span>
  //     </Link>
  //     <Link to="#">
  //       <span>Developers</span>
  //     </Link>
  //     <Link to="#">
  //       <span>Copyright</span>
  //     </Link>
  //     <Link to="#">
  //       <span>Privacy</span>
  //     </Link>
  //     <Link to="#">
  //       <span>Terms</span>
  //     </Link>
  //   </div>
  // ),
  getItem(
    <span className="copyright">
      © 2022 <span className="copyright-brand">Cursus</span>. All Rights
      Reserved.
    </span>,
    "47",
    null,
    null,
    "group"
  ),
];
//Concat Items toghether
export const generalUserItems = (categories, userProfile) => {
  return mainItems(categories, userProfile);
  // .concat(user && instructorItems)
  // .concat(settingItems);
};

// Instructor item
export const instructorUserItem = [
  getItem(
    <Link to="/instructors-dashboard">
      <span className="ant-menu-item">Dashboard</span>
    </Link>,
    "/instructors-dashboard",
    <AppstoreOutlined />
  ),
  getItem(
    <Link to="/dashboard/instructor_courses">
      <span className="ant-menu-item">Courses</span>
    </Link>,
    "/dashboard/instructor_courses",
    <BookOutlined />
  ),
  getItem(
    <Link to="/dashboard/instructor-analytics">
      <span className="ant-menu-item">Analytics</span>
    </Link>,
    "/dashboard/instructor-analytics",
    <StockOutlined />
  ),
  // getItem(
  //   <Link to="/dashboard/messages">
  //     <span className="ant-menu-item">Messages</span>
  //   </Link>,
  //   "/dashboard/messages",
  //   <MessageOutlined />
  // ),
  getItem(
    <Link to="/dashboard/notifications">
      <span className="ant-menu-item">Notifications</span>
    </Link>,
    "/dashboard/notifications",
    <BellOutlined />
  ),
  // getItem(
  //   <Link to="/dashboard/certificates">
  //     <span className="ant-menu-item">My Certificates</span>
  //   </Link>,
  //   "/dashboard/certificates",
  //   <AwardIcon width={16} height={16} />
  // ),
  getItem(
    <Link to="/dashboard/reviews-page">
      <span className="ant-menu-item">Reviews</span>
    </Link>,
    "/dashboard/reviews-page",
    <StarOutlined />
  ),
  // getItem(
  //   <Link to="/dashboard/instructor-earning">
  //     <span className="ant-menu-item">Earning</span>
  //   </Link>,
  //   "/dashboard/instructor-earning",
  //   <DollarCircleOutlined />
  // ),
  // getItem(
  //   <Link to="/dashboard/instructor-payout">
  //     <span className="ant-menu-item">Payout</span>
  //   </Link>,
  //   "/dashboard/instructor-payout",
  //   <WalletOutlined />
  // ),
  // getItem(
  //   <Link to="/dashboard/instructor-statements">
  //     <span className="ant-menu-item">Statements</span>
  //   </Link>,
  //   "/dashboard/instructor-statements",
  //   <FileTextOutlined />
  // ),
  // getItem(
  //   <Link to="/dashboard/instructor-verification">
  //     <span className="ant-menu-item">Verification</span>
  //   </Link>,
  //   "/dashboard/instructor-verification",
  //   <CheckCircleOutlined />
  // ),
  getItem(
    <Link to="/setting">
      <span className="ant-menu-item">Setting</span>
    </Link>,
    "/setting",
    <SettingOutlined />
  ),
  // getItem(
  //   <Link to="/feedback ">
  //     <span className="ant-menu-item">Send Feedback</span>
  //   </Link>,
  //   "/feedback",
  //   <FeedbackIcon width={16} height={16} />
  // ),
];

// student item

export const studentUserItem = [
  getItem(
    <Link to="/student-dashboard">
      <span className="ant-menu-item">Dashboard</span>
    </Link>,
    "/student-dashboard",
    <AppstoreOutlined />
  ),
  getItem(
    <Link to="/dashboard/student-courses">
      <span className="ant-menu-item">Purchased Courses</span>
    </Link>,
    "/dashboard/student-courses",
    <BookOutlined />
  ),
  // getItem(
  //   <Link to="/messages">
  //     <span className="ant-menu-item">Messages</span>
  //   </Link>,
  //   "/messages",
  //   <MessageOutlined />
  // ),
  getItem(
    <Link to="/dashboard/notifications">
      <span className="ant-menu-item">Notifications</span>
    </Link>,
    "/dashboard/notifications",
    <BellOutlined />
  ),
  // getItem(
  //   <Link to="/certificates">
  //     <span className="ant-menu-item">My Certificates</span>
  //   </Link>,
  //   "/certificates",
  //   <AwardIcon width={16} height={16} />
  // ),
  getItem(
    <Link to="/dashboard/reviews-page">
      <span className="ant-menu-item">Reviews</span>
    </Link>,
    "/dashboard/reviews-page",
    <StarOutlined />
  ),
  // getItem(
  //   <Link to="/student-credits">
  //     <span className="ant-menu-item">Credits</span>
  //   </Link>,
  //   "/student-credits",
  //   <WalletOutlined />
  // ),
  // getItem(
  //   <Link to="/dashboard/student-statements">
  //     <span className="ant-menu-item">Statements</span>
  //   </Link>,
  //   "/dashboard/student-statements",
  //   <FileTextOutlined />
  // ),
  getItem(
    <Link to="/setting">
      <span className="ant-menu-item">Setting</span>
    </Link>,
    "/setting",
    <SettingOutlined />
  ),
  // getItem(
  //   <Link to="/feedback ">
  //     <span className="ant-menu-item">Send Feedback</span>
  //   </Link>,
  //   "/feedback",
  //   <FeedbackIcon width={16} height={16} />
  // ),
];

// Admin item

export const adminItem = [
  getItem(
    <Link to="/admin-dashboard">
      <span className="ant-menu-item">Admin Dashboard</span>
    </Link>,
    "/admin-dashboard",
    <AppstoreOutlined />
  ),
  getItem(
    <Link to="/admin/request-management">
      <span className="ant-menu-item">Request Management</span>
    </Link>,
    "/admin/request-management",
    <PlusCircleOutlined />
  ),
  getItem(
    <Link to="/admin/categories">
      <span className="ant-menu-item">Categories</span>
    </Link>,
    "/admin/categories",
    <CategoriesIcon width={16} height={16} />
  ),
  getItem(
    <Typography.Text strong className="ant-menu-item">
      Users Management
    </Typography.Text>,
    "/admin/manage-users",
    <UserIcon width={16} height={16} />,
    [
      getItem(
        <Link to="/admin/manage-users/instructor">
          <span className="ant-menu-item">Instructor</span>
        </Link>,
        "/admin/manage-users/instructor"
      ),
      getItem(
        <Link to="/admin/manage-users/student">
          <span className="ant-menu-item">Student</span>
        </Link>,
        "/admin/manage-users/student"
      ),
    ]
  ),
  getItem(
    <Link to="/admin/report-management">
      <span className="ant-menu-item">Report Management</span>
    </Link>,
    "/admin/report-management",
    <FlagOutlined />
  ),
  getItem(
    <Link to="/admin/manage-courses">
      <span className="ant-menu-item">Courses Management</span>
    </Link>,
    "/admin/manage-courses",
    <ClassIcon width={16} height={16} />
  ),
  getItem(
    <Link to="/admin/requested-courses-management">
      <span className="ant-menu-item">Requested Courses</span>
    </Link>,
    "/admin/requested-courses-management",
    <CheckCircleOutlined width={16} height={16} />
  ),
  getItem(
    <Link to="/dashboard/notifications">
      <span className="ant-menu-item">Notifications</span>
    </Link>,
    "/dashboard/notifications",
    <BellOutlined />
  ),
  getItem(
    <Link to="/setting">
      <span className="ant-menu-item">Setting</span>
    </Link>,
    "/setting",
    <SettingOutlined />
  ),
];
