type Action = { type: string; payload: string };
type State = string;

export const initialFilterState: State = "";

export const filterKeywordReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "UPDATE_FILTER_KEYWORD":
      return action.payload;
    default:
      return state;
  }
};
