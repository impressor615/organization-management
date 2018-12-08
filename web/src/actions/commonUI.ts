import {
  CLEAR_ERROR,
  SET_LOADING,
} from "@/viewmodels/actionTypes";

export const setLoading = (loading: boolean) => ({
  loading,
  type: SET_LOADING,
});

export const clearError = () => ({
  type: CLEAR_ERROR,
});
