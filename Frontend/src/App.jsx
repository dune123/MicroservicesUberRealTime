import { Routes, Route } from "react-router-dom";
import "./App.css";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignUp from "./pages/CaptainSignUp";
import { UserDataContext } from "./context/userContext";
import { useContext } from "react";
import Home from "./pages/Home";
import UserProtextWrapper from "./pages/UserProtextWrapper";
import UserLogout from "./pages/UserLogout";
import CaptainHome from "./pages/CaptainHome";
import CaptainProtectedWrap from "./pages/CaptainProtectedWrap";

function App() {
  const ans = useContext(UserDataContext);

  console.log(ans);
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserRegister />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignUp />} />
        <Route
          path="/home"
          element={
            <UserProtextWrapper>
              <Home />
            </UserProtextWrapper>
          }
        />
        <Route
          path="/user/logout"
          element={
            <UserProtextWrapper>
              <UserLogout />
            </UserProtextWrapper>
          }
        />

        <Route
          path="/captain-home"
          element={
            <CaptainProtectedWrap>
              <CaptainHome />
            </CaptainProtectedWrap>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
