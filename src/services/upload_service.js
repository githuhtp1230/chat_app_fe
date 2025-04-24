import httpRequest, { handlerRequest } from "../utils/http_request";

export const uploadFiles = async (files) => {
  const formData = new FormData();
  Array.from(files).forEach((file) => {
    formData.append("files", file);
  });
  try {
    const res = await httpRequest.post("upload/files", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const res = await httpRequest.post("upload/file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
