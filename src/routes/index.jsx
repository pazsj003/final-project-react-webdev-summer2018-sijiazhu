import Components from "../User/Components.jsx";
import LandingPage from "../Home/LandingPage.jsx";
import ProfilePage from "../User/ProfilePage.jsx";
import LoginPage from "../User/LoginPage.jsx";

var indexRoutes = [
  { path: "/landing-page", name: "LandingPage", component: LandingPage },
  { path: "/profile-page", name: "ProfilePage", component: ProfilePage },
  { path: "/login-page", name: "LoginPage", component: LoginPage },
  { path: "/", name: "Components", component: Components }
];

export default indexRoutes;
