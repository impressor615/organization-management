import {
  HIDE_MESSAGE,
  SET_LOADING,
  SHOW_MESSAGE,
} from "@/viewmodels/actionTypes";

export const setLoading = (loading: boolean) => ({
  loading,
  type: SET_LOADING,
});

export const showMessage = (data: { type: string; message: string; }) => ({
  payload: data,
  type: SHOW_MESSAGE,
});

export const hideMessage = () => ({
  type: HIDE_MESSAGE,
});
