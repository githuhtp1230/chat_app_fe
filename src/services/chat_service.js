import httpRequest, { handlerRequest } from "../utils/http_request";

export const fetchChats = async () => {
  const [error, result] = await handlerRequest(
    httpRequest.get("me/conversations")
  );
  return [error, result];
};
