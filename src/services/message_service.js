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

export const fetchMessagesPageOfChatService = async ({
  chatId,
  size,
  cursor,
}) => {
  const params = new URLSearchParams({ size });

  if (cursor !== null && cursor !== undefined) {
    params.append("cursor", cursor);
  }

  const [error, result] = await handlerRequest(
    httpRequest.get(
      `me/conversations/${chatId}/messages-page?${params.toString()}`
    )
  );

  if (result) {
    console.log(result.data);
  }

  return [error, result];
};

export const sendMessagService = async (chatId, message) => {
  const [error, result] = await handlerRequest(
    httpRequest.post(`conversations/${chatId}/messages`, { content: message })
  );
  return [error, result];
};

export const fetchMessageImagesOfChat = async (chatId) => {
  const [error, result] = await handlerRequest(
    httpRequest.get(`me/conversations/${chatId}/images`)
  );
  return [error, result];
};
