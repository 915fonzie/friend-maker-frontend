export default (state = { current_user: {} }, action) => {
  switch (action.type) {
    case "CLICKED_USER":
      return {
        ...state,
        current_user: action.current_user
      };
    default:
      return state;
  }
};
