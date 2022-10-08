import ResponsePage from "components/ResponsePage/ResponsePage";
import CommonPage from "containers/CommonPage/CommonPage";
import CheckoutStatus from "containers/CommonPage/components/Checkout/CheckoutStatus";
import ForgotPassPage from "containers/CommonPage/components/ForgotPassPage/ForgotPassPage";
import ResetPasswordPage from "containers/CommonPage/components/ResetPasswordPage/ResetPasswordPage";
import SignInPage from "containers/CommonPage/components/SignInPage/SignInPage";
import SignUpPage from "containers/CommonPage/components/SignUpPage/SignUpPage";
import VerificationEmailPage from "containers/CommonPage/components/VerificationEmailPage/VerificationEmailPage";
import AdminDashboard from "containers/ContentPage/components/AdminDashboard/AdminDashboard";
import Analytics from "containers/ContentPage/components/Analytics/Analytics";
import BrowserInstructor from "containers/ContentPage/components/BrowserInstructor/BrowserInstructor";
import Categories from "containers/ContentPage/components/Categories/Categories";
import CertificationCenter from "containers/ContentPage/components/CertificationCenter/CertificationCenter";
import Checkout from "containers/ContentPage/components/Checkout/Checkout";
import CourseDetail from "containers/ContentPage/components/CourseDetail/CourseDetail";
import CourseManagement from "containers/ContentPage/components/CourseManagement/CourseManagement";
import CourseManagementAdmin from "containers/ContentPage/components/CourseManagementAdmin/CoursesManagementAdmin";
import Courses from "containers/ContentPage/components/Courses/Courses";
import CreateCourse from "containers/ContentPage/components/CreateCourse/CreateCourse";
import CreatedCoursesManagement from "containers/ContentPage/components/CreatedCoursesManagement/CreatedCoursesManagement.js";
import About from "containers/ContentPage/components/CursusMain/About/About";
import Blog from "containers/ContentPage/components/CursusMain/Blog/Blog";
import Careers from "containers/ContentPage/components/CursusMain/Careers/Careers";
import Company from "containers/ContentPage/components/CursusMain/Company/Company";
import DownloadedCoursesView from "containers/ContentPage/components/DownloadedCoursesView/DownloadedCoursesView";
import EditCourse from "containers/ContentPage/components/EditCourse/EditCourse";
import ExplorePage from "containers/ContentPage/components/ExplorePage/ExplorePage";
import HelpPage from "containers/ContentPage/components/HelpPage/HelpPage.js";
import HomePage from "containers/ContentPage/components/HomePage/HomePage";
import InstructorCourses from "containers/ContentPage/components/InstructorCourses/InstructorCourses.js";
import InstructorDetail from "containers/ContentPage/components/InstructorDetail/InstructorDetail";
import InstructorManagement from "containers/ContentPage/components/InstructorManagement/InstructorManagement";
import Instructors from "containers/ContentPage/components/Instructors/Instructors";
import InstructorsDashboard from "containers/ContentPage/components/InstructorsDashboard/InstructorsDashboard";
import InvoicePage from "containers/ContentPage/components/InvoicePage/InvoicePage.js";
import NotificationPage from "containers/ContentPage/components/NotificationPage/NotificationPage";
import PaidMembership from "containers/ContentPage/components/PaidMembership/PaidMembership";
import Profile from "containers/ContentPage/components/Profile/Profile";
import PurchasedCourses from "containers/ContentPage/components/PurchasedCourses/PurchasedCourses";
import ReportManagement from "containers/ContentPage/components/ReportManagement/ReportManagement.js";
import ReportPage from "containers/ContentPage/components/ReportPage/ReportPage.js";
import ResultPage from "containers/ContentPage/components/ResultPage/ResultPage";
import ReviewsPage from "containers/ContentPage/components/ReviewsPage/ReviewsPage";
import RoleRequestManagement from "containers/ContentPage/components/RoleRequestManagement/RoleRequestManagement";
import SendFeedbackPage from "containers/ContentPage/components/SendFeedbackPage/SendFeedbackPage.js";
import AccountSetting from "containers/ContentPage/components/Setting/components/AccountSetting/AccountSetting";
import ChangePassword from "containers/ContentPage/components/Setting/components/ChangePassword/ChangePassword";
import Setting from "containers/ContentPage/components/Setting/Setting";
import ShoppingCart from "containers/ContentPage/components/ShoppingCart/ShoppingCart";
import StudentDashboard from "containers/ContentPage/components/StudentDashboard/StudentDashboard";
import StudentManagement from "containers/ContentPage/components/StudentManagement/StudentManagement";
import WishList from "containers/ContentPage/components/WishList/WishList";
import { configPrivateRoute, configPublicRoute } from "utils/RouterUtils";
import StatementPage from "containers/ContentPage/components/StatementPage/StatementPage";

export const commonRoute = [
  "sign-in",
  "sign-up",
  "forgot-pass",
  "reset-pass",
  "verification",
  "*",
  "server-error",
  "coming-soon",
];

export const Routes = {
  //common page
  CommonPage: (props) =>
    configPublicRoute("", false, <CommonPage {...props} />),
  SignInPage: (props) =>
    configPublicRoute("sign-in", false, <SignInPage {...props} />),
  SignUpPage: (props) =>
    configPublicRoute("sign-up", false, <SignUpPage {...props} />),
  ForgotPassPage: (props) =>
    configPublicRoute("forgot-pass", false, <ForgotPassPage {...props} />),
  ResetPasswordPage: (props) =>
    configPublicRoute("reset-pass", false, <ResetPasswordPage {...props} />),
  VerificationEmailPage: (props) =>
    configPublicRoute(
      "verification",
      false,
      <VerificationEmailPage {...props} />
    ),

  NotFoundPage: (props) =>
    configPublicRoute(
      "*",
      false,
      <ResponsePage
        {...props}
        title="404"
        subTitle="The page you were looking for could not be found."
        textButton="Go to Homepage"
      />
    ),

  SeverError: (props) =>
    configPublicRoute(
      "server-error",
      false,
      <ResponsePage
        {...props}
        title="500"
        subTitle="Internal Server Error"
        description={`The server has been deserted for a while.
        Please be patient or try again later.
        `}
        textButton="Go to Homepage"
      />
    ),
  ComingSoon: (props) =>
    configPublicRoute(
      "coming-soon",
      false,
      <ResponsePage
        {...props}
        title="Coming Soon"
        description={`This feature is on development progressing.
        Please be patient or try again later.
        `}
        textButton="Go to Homepage"
      />
    ),
  //create course
  CreateCoursePage: (props) =>
    configPrivateRoute("create-course", false, <CreateCourse {...props} />),
  //edit course
  EditCoursePage: (props) =>
    configPrivateRoute("edit-course/:id", false, <EditCourse {...props} />),
  //explore page
  ExplorePage: (props) =>
    configPublicRoute("explore", false, <ExplorePage {...props} />),
  //explore page
  BrowserInstructorPage: (props) =>
    configPublicRoute(
      "browse-Instructors",
      false,
      <BrowserInstructor {...props} />
    ),

  //setting page
  SettingPage: (props) =>
    configPrivateRoute("setting", false, <Setting {...props} />),
  AccountSetting: (props) =>
    configPrivateRoute("account", false, <AccountSetting {...props} />),
  ChangePassword: (props) =>
    configPrivateRoute("change-password", false, <ChangePassword {...props} />),
  // Address: (props) =>
  //   configPrivateRoute("address", false, <Address {...props} />),

  //courses page
  CoursesPage: (props) =>
    configPublicRoute("list-courses/:type", false, <Courses {...props} />),
  CourseDetailPage: (props) =>
    configPublicRoute("courses/:id", false, <CourseDetail {...props} />),

  //instructors page
  InstructorsPage: (props) =>
    configPublicRoute("instructors", false, <Instructors {...props} />),
  InstructorDetailPage: (props) =>
    configPublicRoute("profile/:id", false, <InstructorDetail {...props} />),

  //user page
  ProfilePage: (props) =>
    configPrivateRoute("profile", false, <Profile {...props} />),
  ResultPage: (props) =>
    configPublicRoute("result", false, <ResultPage {...props} />),
  CourseManagementPage: (props) =>
    configPrivateRoute(
      "course-management",
      false,
      <CourseManagement {...props} />
    ),

  //home page
  HomeContentPage: (props) =>
    configPublicRoute("", true, <HomePage {...props} />),

  // Report page
  ReportPage: (props) =>
    configPrivateRoute("report-history", false, <ReportPage {...props} />),
  ReportManagementPage: (props) =>
    configPrivateRoute(
      "report-management",
      false,
      <ReportManagement {...props} />
    ),
  // Help page
  HelpPage: (props) =>
    configPublicRoute("help", false, <HelpPage {...props} />),
  // Send Feedback page
  SendFeedbackPage: (props) =>
    configPrivateRoute("feedback", false, <SendFeedbackPage {...props} />),
  // Send Feedback page
  NotificationPage: (props) =>
    configPrivateRoute("notifications", false, <NotificationPage {...props} />),
  // InstructorCourses Page
  InstructorCourses: (props) =>
    configPrivateRoute(
      "instructor_courses",
      false,
      <InstructorCourses {...props} />
    ),
  // reviews Page
  ReviewsPage: (props) =>
    configPublicRoute("reviews-page", false, <ReviewsPage {...props} />),

  //paid membership
  PaidMemberShipPage: (props) =>
    configPrivateRoute("paid-membership", false, <PaidMembership {...props} />),
  //instructor Dashboard
  InstructorsDashboard: (props) =>
    configPrivateRoute(
      "instructors-dashboard",
      false,
      <InstructorsDashboard {...props} />
    ),
  //instructor analytics
  InstructorAnalytics: (props) =>
    configPrivateRoute("instructor-analytics", false, <Analytics {...props} />),

  //student Dashboard
  StudentDashboard: (props) =>
    configPrivateRoute(
      "student-dashboard",
      false,
      <StudentDashboard {...props} />
    ),
  StatementPage: (props) =>
    configPrivateRoute(
      "instructor-statements",
      false,
      <StatementPage {...props} />
    ),
  StatementPageStudent: (props) =>
    configPrivateRoute(
      "student-statements",
      false,
      <StatementPage {...props} />
    ),
  //Checkout Page
  CheckoutStatusPage: (props) =>
    configPrivateRoute("checkout/*", false, <CheckoutStatus {...props} />),
  CheckoutPage: (props) =>
    configPrivateRoute("checkout", false, <Checkout {...props} />),
  InvoicePage: (props) =>
    configPublicRoute("invoice", false, <InvoicePage {...props} />),

  ShoppingCartPage: (props) =>
    configPublicRoute("shopping-cart", false, <ShoppingCart {...props} />),
  WishListPage: (props) =>
    configPrivateRoute("wishlist", false, <WishList {...props} />),

  //Certification center
  CertificationCenterPage: (props) =>
    configPrivateRoute(
      "certification-center",
      false,
      <CertificationCenter {...props} />
    ),
  CursusMainAboutPage: (props) =>
    configPublicRoute("about", false, <About {...props} />),
  CursusMainBlogPage: (props) =>
    configPublicRoute("blog", false, <Blog {...props} />),
  CursusMainCompanyPage: (props) =>
    configPublicRoute("company", false, <Company {...props} />),
  CursusMainCareerPage: (props) =>
    configPublicRoute("careers", false, <Careers {...props} />),

  //Student purchased courses
  PurchasedCoursesPage: (props) =>
    configPrivateRoute(
      "student-courses",
      false,
      <PurchasedCourses {...props} />
    ),
  DownloadedCourseViewPage: (props) =>
    configPrivateRoute(
      "download-course-view/:id/",
      false,
      <DownloadedCoursesView {...props} />
    ),
  //system admin pages
  RequestManagement: (props) =>
    configPrivateRoute(
      "request-management",
      false,
      <RoleRequestManagement {...props} />
    ),
  //Course Management
  CourseManagementPageAdmin: (props) =>
    configPrivateRoute(
      "manage-courses",
      false,
      <CourseManagementAdmin {...props} />
    ),
  //Created Course Management
  CreatedCoursesManagement: (props) =>
    configPrivateRoute(
      "requested-courses-management",
      false,
      <CreatedCoursesManagement {...props} />
    ),
  //User Management
  StudentManagementPage: (props) =>
    configPrivateRoute(
      "manage-users/student",
      false,
      <StudentManagement {...props} />
    ),
  InstructorManagementPage: (props) =>
    configPrivateRoute(
      "manage-users/instructor",
      false,
      <InstructorManagement {...props} />
    ),
  // Admin dashboard
  AdminDashBoardPage: (props) =>
    configPrivateRoute("admin-dashboard", false, <AdminDashboard {...props} />),
  // Admin dashboard Categories
  CategoriesPage: (props) =>
    configPrivateRoute("categories", false, <Categories {...props} />),
};

export const routesVisibleNavbar = [
  "/",
  "report-history",
  "instructor-analytics",
  "feedback",
  "paid-membership/checkout",
  "student-courses",
  "list-courses/:type",
  "courses/:id",
  "instructors",
  "profile/:id",
  "instructor_courses",
  "reviews-page",
  "setting/*",
  "edit-course/:id",
  "help",
  "create-course",
  "instructors-dashboard",
  "student-dashboard",
  "notifications",
  "explore",
  "dashboard/*",
  "admin/*",
  "browse-Instructors",
  "admin-dashboard",
  "categories",
  "manage-users/instructor",
  "manage-users/student",
  "manage-courses",
  "report-management",
  "requested-courses-management",
  "student-statements",
];

export const routesVisibleFooter = [
  "/",
  "paid-membership",
  "report-history",
  "feedback",
  "certification-center",
  "cursus-main/about",
  "cursus-main/blog",
  "cursus-main/company",
  "cursus-main/careers",
  "student-courses",
  "list-courses/:type",
  "courses/:id",
  "instructors",
  "profile/:id",
  "instructor_courses",
  "reviews-page",
  "setting/*",
  "help",
  "edit-course/:id",
  "create-course",
  "instructors-dashboard",
  "student-dashboard",
  "notifications",
  "explore",
  "result",
  "shopping-cart",
  "checkout",
  "dashboard/*",
  "admin/*",
  "wishlist",
  "browse-Instructors",
  "admin-dashboard",
  "checkout/*",
  "categories",
  "manage-users/instructor",
  "manage-users/student",
  "manage-courses",
  "instructor-analytics",
  "report-management",
  "requested-courses-management",
  "student-statements",
];

export const routesVisibleNavbarMini = [
  "paid-membership",
  "certification-center",
  "cursus-main/about",
  "cursus-main/blog",
  "cursus-main/company",
  "cursus-main/careers",
  "result",
  "shopping-cart",
  "checkout",
  "wishlist",
  "checkout/*",
];

export const routesVisibleSidebar = [
  "/",
  "report-history",
  "feedback",
  "paid-membership/checkout",
  "student-courses",
  "list-courses/:type",
  "courses/:id",
  "instructors",
  "profile/:id",
  "instructor_courses",
  "reviews-page",
  "setting/*",
  "help",
  "create-course",
  "edit-course/:id",
  "instructors-dashboard",
  "student-dashboard",
  "notifications",
  "explore",
  "dashboard/*",
  "admin/*",
  "browse-Instructors",
  "admin-dashboard",
  "categories",
  "manage-users/instructor",
  "manage-users/student",
  "manage-courses",
  "instructor-analytics",
  "report-management",
  "requested-courses-management",
  "student-statements",
];

export const routesPaidMembership = [
  {
    path: "index",
    breadcrumbName: "Home",
  },
  {
    path: "first",
    breadcrumbName: "Paid Memberships",
  },
];
export const NavbarCursusMainRoute = [
  {
    name: "About",
    path: "/cursus-main/about",
  },
  {
    name: "Blog",
    path: "/cursus-main/blog",
  },
  {
    name: "Company",
    path: "/cursus-main/company",
  },
  {
    name: "Careers",
    path: "/cursus-main/careers",
  },
  {
    name: "Press",
    path: "/cursus-main/press",
  },
];
export const routesBreadcrumb = {
  "/paid-membership": "Paid Membership",
  "/checkout": "Checkout",
  "/shopping-cart": "Shopping Cart",
  "/wishlist": "Wish List",
  "/result": "Search Result",
};
export const pathLink = {
  allCourses: "courses",
  allInstructors: "instructors",
  courseDetail: (courseId) => `courses/${courseId}`,
  instructorDetail: (instructorId) => `profile/${instructorId}`,
};
