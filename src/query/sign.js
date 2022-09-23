import { useMutation, useQuery, useQueryClient } from "react-query";
import { authInstance } from "../service/instance";

export const signIn = (data) => {
  return authInstance.post("login-by-phone", data);
};

export const requestSignUp = (phoneNumber) => {
  return authInstance.get("signup/by-phone/" + phoneNumber);
};

export const signUp = (data) => {
  return authInstance.post("signup", data);
};

export const requestOTP = (phoneNumber) => {
  return authInstance.get("forget-password/by-phone/" + phoneNumber);
};

export const resetPassword = (data) => {
  return authInstance.post("change-password/by-phone", data);
};

export const validate = () => {
  return authInstance.get("validate");
};

const getUserProfile = (id) => {
  return authInstance.get("user-profile/" + id);
};

export const useGetProfile = (id) => {
  return useQuery(["user-info", id], () => getUserProfile(id), {
    enabled: !!id,
  });
};

const updateUserProfile = (data) => {
  return authInstance.post("update/user-profile", data);
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  return useMutation(updateUserProfile, {
    onSuccess: () => queryClient.invalidateQueries("user-info"),
  });
};


const updateUserPassword = (data) => {
  return authInstance.post("update-password", data);
};

export const useUpdateUserPassword = () => {
  // const queryClient = useQueryClient();
  return useMutation(updateUserPassword, {
    // onSuccess: () => queryClient.invalidateQueries("user-info"),
  });
};