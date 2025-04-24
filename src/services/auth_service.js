import httpRequest, { handlerRequest } from "../utils/http_request";

export const registerService = async (data) => {
  const [error, result] = await handlerRequest(
    httpRequest.post("auth/register", data)
  );
  return [error, result];
};

export const loginService = async (data) => {
  const [error, result] = await handlerRequest(
    httpRequest.post("auth/login", data)
  );
  return [error, result];
};

export const logoutService = async () => {
  const [error, result] = await handlerRequest(httpRequest.post("auth/logout"));
  return [error, result];
};
