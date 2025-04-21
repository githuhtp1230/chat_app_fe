import httpRequest, { handlerRequest } from "../utils/http_request";

export const fetchMessagesOfChat = async (chatId) => {
  const [error, result] = await handlerRequest(
    httpRequest.get(`me/conversations/${chatId}/messages`)
  );
  return [error, result];
};

export const sendMessage = async (chatId, message) => {
  const [error, result] = await handlerRequest(
    httpRequest.post(`conversations/${chatId}/messages`, { content: message })
  );
  return [error, result];
};
