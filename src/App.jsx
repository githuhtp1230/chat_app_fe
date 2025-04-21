import React, { useEffect, useState } from "react";
import Navbar from "./components/NavBar";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ChatPage from "./pages/chat/ChatPage";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import SettingPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import PATH from "./constants/path";
import PrivateRoute from "./routes/PrivateRoute";
import { ToastContainer, Bounce } from "react-toastify";
import { cookieUtils } from "./utils/cookie_util";
import SECURITY from "./constants/security";
import { useDispatch } from "react-redux";
import { getMyInfo } from "./redux/reducers/profile_reducer";
import ChatDetail from "./pages/chat/ChatDetail";
import { ThreeDot } from "react-loading-indicators";
import NotFoundPage from "./pages/NotFoundPage";
import Modal from "./components/modals/Modal";
import CurrentProfile from "./components/profile/CurrentProfile";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = new Promise((resolve) => setTimeout(resolve, 300));
    if (cookieUtils.getStorage(SECURITY.KEY_ACCESS_TOKEN)) {
      const fetchUser = dispatch(getMyInfo())
        .unwrap()
        .catch(() => {
          navigate(PATH.LOGIN);
        });
      Promise.all([delay, fetchUser]).finally(() => setIsLoading(false));
    } else {
      delay.then(() => {
        setIsLoading(false);
      });
    }
  }, []);
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-main text-white">
        <ThreeDot color="#fff" size="small" text="" textColor="" />
        <p className="mt-3 ml-2">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex bg-main h-screen">
        <Navbar />
        <Routes location={state?.backgroundLocation || location}>
          <Route path={PATH.REGISTER} element={<RegisterPage />} />
          <Route path={PATH.LOGIN} element={<LoginPage />} />
          <Route path={PATH.SETTING} element={<SettingPage />} />
          <Route element={<PrivateRoute />}>
            <Route path={PATH.CHAT} element={<ChatPage />} />
            <Route
              path={`${PATH.CHAT}/:conversationId`}
              element={<ChatPage />}
            />
          </Route>
        </Routes>
        {state?.backgroundLocation && (
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route
                path={PATH.MODALS.PROFILE}
                element={
                  <Modal
                    title={"Current Profile"}
                    children={<CurrentProfile />}
                  />
                }
              ></Route>
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        )}
      </div>

      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  );
};

export default App;
