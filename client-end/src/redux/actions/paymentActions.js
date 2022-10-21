import httpCommon from "../../http-common";
import { SET_LOADING_STATUS, SET_STUDENT_DATA } from "../constants";
import { SET_ERROR } from "../constants";

export const onPayment = (inputData, token) => {
  let response = {
    status: "",
    message: "",
    data: {},
  };
  return async (dispatch) => {
    try {
      dispatch(setLoginStatus(true));

      const paymentResponse = await httpCommon.post(
        "/payments/pay-semester-fee",
        inputData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (paymentResponse.status === 200) {
        response.status = 200;
        response.message = "Payment completed";
        response.data = paymentResponse.data.data.updatedStudent;
      }

      dispatch({
        type: SET_STUDENT_DATA,
        data: paymentResponse.data.data.updatedStudent,
      });

      dispatch(setLoginStatus(false));

      return response;
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err,
      });

      return;
    }
  };
};

export const setLoginStatus = (status) => {
  return {
    type: SET_LOADING_STATUS,
    data: status,
  };
};
