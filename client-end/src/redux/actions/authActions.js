import httpCommon from "../../http-common";
import {
  SET_ACCESS_TOKEN,
  SET_LOADING_STATUS,
  SET_STUDENT_DATA,
} from "../constants";
import { SET_ERROR } from "../constants";

export const onSignup = (inputData) => {
  let response = {
    status: "",
    message: "",
    data: {},
  };
  return async (dispatch) => {
    try {
      dispatch(setLoadingStatus(true));
      const signupResponse = await httpCommon.post(
        "/students/register",
        inputData
      );

      console.log(signupResponse);
      if (signupResponse.status === 201) {
        response.status = 201;
        response.message = "Register successful";
        response.data = signupResponse.data;
      }

      dispatch({
        type: SET_STUDENT_DATA,
        data: signupResponse.data.data.user,
      });

      dispatch(setAccessToken(signupResponse.data.token));
      dispatch(setLoadingStatus(false));

      return response;
    } catch (err) {
      dispatch(setLoadingStatus(false));

      return;
    }
  };
};

export const onLogin = (inputData) => {
  let response = {
    status: "",
    message: "",
    data: {},
  };
  return async (dispatch) => {
    try {
      dispatch(setLoadingStatus(true));
      const loginResponse = await httpCommon.post("/students/login", inputData);

      if (loginResponse.status === 200) {
        response.status = 200;
        response.message = "Login successful";
        response.data = loginResponse.data;
      }

      dispatch({
        type: SET_STUDENT_DATA,
        data: loginResponse.data.data.user,
      });

      dispatch(setAccessToken(loginResponse.data.token));
      dispatch(setLoadingStatus(false));

      return response;
    } catch (err) {
      dispatch(setLoadingStatus(false));

      return;
    }
  };
};

export const setAccessToken = (token) => {
  return {
    type: SET_ACCESS_TOKEN,
    data: token,
  };
};

export const setLoadingStatus = (status) => {
  return {
    type: SET_LOADING_STATUS,
    data: status,
  };
};
