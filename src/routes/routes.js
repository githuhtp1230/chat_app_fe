import { lazy } from "react";
import PATH from "../constants/path";

const ChatPage = lazy(() => import("../pages/chat/ChatPage"));
const SettingPage = lazy(() => import("../pages/SettingsPage"));

const publicRoutes = [
  {
    path: PATH.SETTING,
    component: SettingPage,
  },
];

const privateRoutes = [
  {
    path: PATH.LOGIN,
    component: ChatPage,
  },
];

export { publicRoutes, privateRoutes };
