import { useQuery } from "react-query";
import instance from "../service/instance";

export const postAttachments = (attachments) => {
  return instance.postForm(`attachments`, {
    Files: attachments,
  });
};
