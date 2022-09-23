export const responseHandler = async (func, acceptOn) => {
  const accept = acceptOn || 200;
  try {
    const res = await func();
    if (
      res.status === accept ||
      (typeof accept === "object" && accept.includes(res.status))
    ) {
      return { status: true, data: res.data, msg: res.data.msg };
    } else {
      if (typeof res.response.data === "object")
        return {
          status: false,
          data: res.response.data[Object.keys(res.response.data)[0]],
        };
      else return { status: false, data: res.response.data };
    }
  } catch (err) {
    if (
      err.response &&
      err.response.status >= 400 &&
      err.response.status < 500
    ) {
      if (typeof err.response.data === "object")
        return {
          status: false,
          data: err.response.data[Object.keys(err.response.data)[0]],
        };
      else return { status: false, data: err.response.data };
    } else {
      return { status: false, data: "Something Went Wrong!!" };
    }
  }
};
