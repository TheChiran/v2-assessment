import httpCommon from "../../http-common";
import { SET_LOADING_STATUS, SET_STUDENT_DATA } from "../constants";

export const onAdmissionCompletion = (inputData, token) => {
  let response = {
    status: "",
    message: "",
    data: {},
  };
  return async (dispatch) => {
    try {
      console.log(inputData);
      console.log(token);
      dispatch(setLoadingStatus(true));

      const admissionResponse = await httpCommon.post(
        "/admissions/confirm",
        inputData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(admissionResponse);
      if (admissionResponse.status === 200) {
        response.status = 200;
        response.message = "Admission completed";
        response.data = admissionResponse.data.data.doc;
      }

      dispatch({
        type: SET_STUDENT_DATA,
        data: admissionResponse.data.data.doc,
      });

      dispatch(setLoadingStatus(false));

      return response;
    } catch (err) {
      dispatch(setLoadingStatus(false));

      return;
    }
  };
};

export const setLoadingStatus = (status) => {
  return {
    type: SET_LOADING_STATUS,
    data: status,
  };
};
