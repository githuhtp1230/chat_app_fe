import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import SECURITY from "../constants/security";

export const cookieUtils = {
  saveToken: (token, key) => {
    const decoded = jwtDecode(token);
    const expTimestamp = decoded.exp;
    const expireDate = new Date(expTimestamp * 1000);
    Cookies.set(key, token, {
      expires: expireDate,
      secure: true,
      sameSite: "Strict",
    });
  },
  getStorage: (key) => {
    return Cookies.get(key);
  },
  removeStorage: (key) => {
    Cookies.remove(key);
  },
};
