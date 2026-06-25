import { useDispatch,  } from "react-redux";
import { login, register, getme } from "../service/auth.api";
import { setuser, setisLoading, setisError } from "../auth.slice";

export const useauth = () => {
  const dispatch = useDispatch();

  async function registeruser({ username, email, password }) {
    try {
      dispatch(setisLoading(true));
      const data = await register({ username, email, password });
    } catch (error) {
      dispatch(setisError(error.response));
    } finally {
      dispatch(setisLoading(false));
    }
  }
  async function loginuser({ email, password }) {
    try {
      dispatch(setisLoading(true));
      const data = await login({ email, password });
      dispatch(setuser(data.user));
    } catch (error) {
      dispatch(setisError(error.response.data.message));
    } finally {
      dispatch(setisLoading(false));
    }
  }
  async function getmeuser() {
    try {
      dispatch(setisLoading(true));
      const data = await getme();
      dispatch(setuser(data.user));
    } catch (error) {
      dispatch(setisError(error.response.data.message));
    } finally {
      dispatch(setisLoading(false));
    }
  }

  return {
    registeruser,
    loginuser,
    getmeuser,
  };
};
