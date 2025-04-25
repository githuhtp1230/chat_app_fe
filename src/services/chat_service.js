import httpRequest, { handlerRequest } from "../utils/http_request";

export const fetchChats = async () => {
  const [error, result] = await handlerRequest(
    httpRequest.get("me/conversations")
  );
  return [error, result];
};

export const createChatService = async (chatPartnerId) => {
  const [error, result] = await handlerRequest(
    httpRequest.post("me/conversations", { chatPartnerId })
  );
  return [error, result];
};
