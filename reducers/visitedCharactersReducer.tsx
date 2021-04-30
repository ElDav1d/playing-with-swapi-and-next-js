import { VisitedPage, VisitedPages } from "../interfaces.js";

type Action = { type: string; payload: VisitedPage };
type State = VisitedPages;

export const initialVisitedCharactersState: VisitedPages = [];

export const visitedCharactersReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "DELETE_VISITED_CHARACTER":
      const newState = [...state];
      newState.pop();
      return newState;
    case "ADD_VISITED_CHARACTER":
      return [action.payload, ...state];
    default:
      return state;
  }
};
