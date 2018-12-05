import { SET_LOADING } from "@/viewmodels/actionTypes";

export const setLoading = (loading: boolean) => ({
  loading,
  type: SET_LOADING,
});
