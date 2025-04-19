import httpRequest, { handlerRequest } from "../utils/http_request";

export const fetchMessagesOfChat = async (chatId) => {
  const [error, result] = await handlerRequest(
    httpRequest.get(`me/conversations/${chatId}/messages`)
  );
  return [error, result];
};
