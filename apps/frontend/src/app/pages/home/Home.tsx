import HomeNavBar from "../../components/home-nav-bar/HomeNavBar";
import HomeContent from "../../components/home-content/HomeContent";

export default function App() {
  function authLogin() {
    alert("login");
  }

  function authSignup() {
    alert("signup");
  }

  return (
    <>
      <HomeNavBar handleLogin={authLogin} handleSignup={authSignup} />
      <HomeContent handleSignup={authSignup} />
    </>
  );
}