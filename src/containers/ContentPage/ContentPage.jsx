import { Route, Routes } from "react-router-dom";
import { Routes as RoutesList } from "routes";
const ContentPage = () => {
  return (
    <Routes>
      <Route {...RoutesList.HomeContentPage()} path="/" />
      <Route {...RoutesList.CoursesPage()} />
      <Route {...RoutesList.ResultPage()} />
      <Route {...RoutesList.CourseDetailPage()} />

      <Route {...RoutesList.ExplorePage()} />

      <Route {...RoutesList.InstructorsPage()} />
      <Route {...RoutesList.InstructorDetailPage()} />

      <Route {...RoutesList.CommonPage()}>
        <Route {...RoutesList.SignInPage()} />
        <Route {...RoutesList.SignUpPage()} />
        <Route {...RoutesList.ForgotPassPage()} />
        <Route {...RoutesList.ResetPasswordPage()} />
      </Route>

      <Route {...RoutesList.VerificationEmailPage()} />

      <Route {...RoutesList.SettingPage()}>
        <Route {...RoutesList.AccountSetting()} path="" index />
        <Route {...RoutesList.ChangePassword()} />
        <Route {...RoutesList.AccountSetting()} />
        {/* <Route {...RoutesList.Address()} /> */}
      </Route>

      <Route {...RoutesList.ReportPage()} />
      <Route {...RoutesList.SendFeedbackPage()} />
      <Route {...RoutesList.HelpPage()} />

      <Route {...RoutesList.InstructorsDashboard()} />
      <Route {...RoutesList.StudentDashboard()} />

      <Route {...RoutesList.BrowserInstructorPage()} />
      <Route {...RoutesList.AdminDashBoardPage()} />

      <Route path="dashboard">
        <Route {...RoutesList.NotificationPage()} />
        <Route {...RoutesList.InstructorCourses()} />
        <Route {...RoutesList.PurchasedCoursesPage()} />
        <Route {...RoutesList.RequestManagement()} />
        <Route {...RoutesList.ReviewsPage()} />
        <Route {...RoutesList.CreateCoursePage()} />
        <Route {...RoutesList.EditCoursePage()} />
        <Route {...RoutesList.InstructorAnalytics()} />
        <Route {...RoutesList.StatementPage()} />
        <Route {...RoutesList.StatementPageStudent()} />
      </Route>

      <Route path="admin">
        <Route {...RoutesList.CategoriesPage()} />
        <Route {...RoutesList.StudentManagementPage()} />
        <Route {...RoutesList.RequestManagement()} />
        <Route {...RoutesList.InstructorManagementPage()} />
        <Route {...RoutesList.CourseManagementPageAdmin()} />
        <Route {...RoutesList.ReportManagementPage()} />
        <Route {...RoutesList.CreatedCoursesManagement()} />
      </Route>
      {/* Admin */}

      {/* End Duy router Area*/}

      <Route {...RoutesList.PaidMemberShipPage()}>
        <Route {...RoutesList.CheckoutPage()} />
      </Route>

      <Route {...RoutesList.CheckoutStatusPage()}></Route>
      <Route {...RoutesList.CheckoutPage()}></Route>

      <Route {...RoutesList.ShoppingCartPage()} />
      <Route {...RoutesList.WishListPage()} />
      <Route {...RoutesList.InvoicePage()} />

      <Route path="user">
        <Route {...RoutesList.CourseManagementPage()} />
        <Route {...RoutesList.ProfilePage()} />
      </Route>

      <Route {...RoutesList.NotFoundPage()} />
      <Route {...RoutesList.SeverError()} />
      <Route {...RoutesList.ComingSoon()} />
      <Route {...RoutesList.CertificationCenterPage()} />
      <Route path="cursus-main">
        <Route {...RoutesList.CursusMainAboutPage()} />
        <Route {...RoutesList.CursusMainBlogPage()} />
        <Route {...RoutesList.CursusMainCareerPage()} />
        <Route {...RoutesList.CursusMainCompanyPage()} />
      </Route>

      <Route {...RoutesList.DownloadedCourseViewPage()} />
    </Routes>
  );
};

export default ContentPage;
