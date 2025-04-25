import httpRequest, { handlerRequest } from "../utils/http_request";

export const fetchMyContacts = async () => {
  const [error, result] = await handlerRequest(httpRequest.get("me/contacts"));
  return [error, result];
};

export const deleteContactService = async (contactId) => {
  const [error, result] = await handlerRequest(
    httpRequest.delete(`me/contacts/${contactId}`)
  );
  return [error, result];
};

export const addContactService = async (contactEmail) => {
  console.log(contactEmail);
  const [error, result] = await handlerRequest(
    httpRequest.post(`me/contacts`, { contactEmail })
  );
  return [error, result];
};
