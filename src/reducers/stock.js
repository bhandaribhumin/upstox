const stock = (state = [], action) => {
  switch (action.type) {
    case "ADD_STOCK":
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false,
        },
      ];
    case "GET_STOCK":
      return state.map((stock) => stock);
    default:
      return state;
  }
};

export default stock;
