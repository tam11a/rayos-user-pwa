export const responseHandler = async (func, acceptOn) => {
  const accept = acceptOn || 200;
  try {
    const res = await func();
    if (
      res.status === accept ||
      (typeof accept === "object" && accept.includes(res.status))
    ) {
      return {
        status: true,
        data: res.data.data,
        msg: res.data.message,
        object: res.data,
      };
    } else {
      if (typeof res.response.data === "object")
        return {
          status: false,
          data: res.response.data.error || res.response.data.message,
          msg: res.response.data.error || res.response.data.message,
        };
      else
        return {
          status: false,
          data: res.response.data || res.response.error,
          msg: res.response.data || res.response.error,
        };
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
          data: err.response.data.error || err.response.data.message,
          msg: err.response.data.error || err.response.data.message,
        };
      else
        return {
          status: false,
          data: err.response.data || err.response.error,
          msg: err.response.data || err.response.error,
        };
    } else {
      return { status: false, data: "Something Went Wrong!!" };
    }
  }
};