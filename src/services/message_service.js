import httpRequest, { handlerRequest } from "../utils/http_request";

export const fetchMessagesOfChat = async (chatId) => {
  const [error, result] = await handlerRequest(
    httpRequest.get(`me/conversations/${chatId}/messages`)
  );
  if (result) {
    result = result.data.reverse();
  }
  return [error, result];
};

export const fetchMessagesPageOfChat = async (chatId, size, page) => {
  let [error, result] = await handlerRequest(
    httpRequest.get(
      `me/conversations/${chatId}/messages-page?size=${size}&page=${page}`
    )
  );
  if (result) {
    console.log(result.data.content.reverse());
  }
  return [error, result];
};

export const sendMessage = async (chatId, message) => {
  const [error, result] = await handlerRequest(
    httpRequest.post(`conversations/${chatId}/messages`, { content: message })
  );
  return [error, result];
};
