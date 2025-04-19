import httpRequest, { handlerRequest } from "../utils/http_request";

export const fetchProfileService = async () => {
  const [error, result] = await handlerRequest(httpRequest.get("me/profile"));
  return [error, result];
};
