import React from "react";
import { useQueryClient } from "react-query";
import SignIn from "../../components/Sign/SignIn";
import { useValidate } from "../../query/sign";
import { updateInstance } from "../../service/instance";
import { responseHandler } from "../../utilities/response-handler";

export const authContext = React.createContext();

const Index = ({ children }) => {
  const queryClient = useQueryClient();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(!open);
    setOpenCreate(false);
  };

  const [openCreate, setOpenCreate] = React.useState(false);
  const handleOpenCreate = () => {
    setOpenCreate(!openCreate);
    setOpen(false);
  };

  const [openForgetPassword, setOpenForgetPassword] = React.useState(false);
  const handleOpenForgetPassword = () => {
    setOpenForgetPassword(!openForgetPassword);
    setOpen(false);
  };

  const [openOTP, setOpenOTP] = React.useState(false);
  const handleOpenOTP = () => {
    setOpenOTP(!openOTP);
    setOpenCreate(false);
  };

  const [token, handleToken] = React.useState(localStorage.getItem("tkn"));
  const [user, setUser] = React.useState({});

  const [userId, setUserId] = React.useState();
  // const { data } = useGetProfile(userId);

  // React.useEffect(() => {
  //   if (!data) return;
  //   setUser({
  //     ...user,
  //     ...data.data.value,
  //   });
  // }, [data]);

  const setToken = (tkn) => {
    handleToken(tkn);
    localStorage.setItem("tkn", tkn);
  };

  const logout = () => {
    sessionStorage.removeItem("orderList");
    sessionStorage.removeItem("pnd_checkout");
    localStorage.removeItem("tkn");
    handleToken();
    setUser({});
    setUserId();
  };

  const {
    data: validationData,
    isLoading: validationLoading,
    isRefetching: validationRefetching,
    isError: validationError,
  } = useValidate(!!token);

  React.useEffect(() => {
    updateInstance();
    queryClient.invalidateQueries("user-validate");
  }, [token]);

  React.useEffect(() => {
    if (validationLoading || !token) return;
    if (validationError) logout();
    setUserId(validationData?.data?.data?._id);
    setUser(validationData?.data?.data);
  }, [validationLoading, validationRefetching, validationError]);

  return (
    <authContext.Provider
      value={{
        open,
        handleOpen,
        openCreate,
        handleOpenCreate,
        openForgetPassword,
        handleOpenForgetPassword,
        openOTP,
        handleOpenOTP,
        token,
        setToken,
        isLoading: validationLoading,
        userInfo: user,
        isVerified: !!token,
        userId: !!token ? userId : undefined,
        logout,
      }}
    >
      <SignIn />
      {children}
    </authContext.Provider>
  );
};

export default Index;
