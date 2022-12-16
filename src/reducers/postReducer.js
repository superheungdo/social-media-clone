const postReducer = (
  state = {
    posts: [],
    loading: false,
    error: false,
    uploading: false,
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

    /* LINE - Posts */
    case "RETREIVING_START":
      return { ...state, loading: true, error: false };

    case "RETREIVING_SUCCESS":
      return { ...state, posts: action.data, loading: false, error: false };

    case "RETREIVING_FAIL":
      return { ...state, loading: false, error: true };

    /* LINE - Default */
    default:
      return state;
  }
};

export default postReducer;
