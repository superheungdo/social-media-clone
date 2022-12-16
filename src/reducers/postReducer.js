const postReducer = (
  state = {
    posts: [],
    uploading: false,
    error: false,
  },
  action
) => {
  switch (action.type) {
    /* LINE - PostShare */
    case "UPLOAD_START":
      return { ...state, error: false, uploading: true };

    case "UPLOAD_SUCCESS":
      return {
        ...state,
        posts: [action.data, ...state.posts],
        error: false,
        uploading: false,
      };

    case "UPLOAD_FAIL":
      return { ...state, error: true, uploading: false };

    /* LINE - Default */
    default:
      return state;
  }
};

export default postReducer;
