import { useMutation } from "react-query";
import instance from "../service/instance";

const postAttachments = (attachments) => {
  return instance.postForm(`attachments`, {
    Files: attachments,
  });
};

export const usePostAttachments = () => {
  return useMutation(postAttachments);
};
