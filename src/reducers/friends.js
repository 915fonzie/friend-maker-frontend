export default (state = { clicked_user_data: {} }, action) => {
  switch (action.type) {
    case "CLICKED_USER":
      return {
        ...state,
        clicked_user_data: action.clicked_user_data
      };
    default:
      return state;
  }
};
