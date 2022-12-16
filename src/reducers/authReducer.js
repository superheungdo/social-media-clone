const authReducer = (
  state = {
    authData: null,
    loading: false,
    error: false,
  },
  action
) => {
  switch (action.type) {
    /* LINE */
    case "AUTH_START":
      return { ...state, loading: true, error: false };

    case "AUTH_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, error: false };

    case "AUTH_FAIL":
      return { ...state, loading: false, error: true };

    /* LINE */
    case "LOG_OUT":
      localStorage.clear();

      return {
        authData: null,
        loading: false,
        error: false,
      };

    /* LINE */
    default:
      return state;
  }
};

export default authReducer;
