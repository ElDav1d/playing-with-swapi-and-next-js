import { createContext, useContext, useReducer } from "react";
import combineReducers from "react-combine-reducers";
import {
  visitedCharactersReducer,
  initialVisitedCharactersState,
} from "../reducers/visitedCharactersReducer";
import {
  filterKeywordReducer,
  initialFilterState,
} from "../reducers/filterKeywordReducer";
import { VisitedPages, VisitedPage } from "../interfaces.js";

type Action = { type: string; payload: VisitedPage | string };
type State = {
  visitedCharacterPages: VisitedPages;
  filterCharactersKeyword: string;
};
type CombinedReducer = (state: State, action: Action) => State;
type Dispatch = (action: Action) => void;
type ContextProviderProps = { children: React.ReactNode };

const [mainReducer, initialState] = combineReducers<CombinedReducer>({
  visitedCharacterPages: [
    visitedCharactersReducer,
    initialVisitedCharactersState,
  ],
  filterCharactersKeyword: [filterKeywordReducer, initialFilterState],
});

const VisitedCharactersContext = createContext<
  | {
      state: State;
      dispatch: Dispatch;
    }
  | undefined
>(undefined);

const VisitedCharactersContextProvider = ({
  children,
}: ContextProviderProps) => {
  const [state, dispatch] = useReducer<CombinedReducer>(
    mainReducer,
    initialState
  );
  const value = { state, dispatch };

  return (
    <VisitedCharactersContext.Provider value={value}>
      {children}
    </VisitedCharactersContext.Provider>
  );
};

const useVisitedCharacters = () => {
  const context = useContext(VisitedCharactersContext);
  if (context === undefined) {
    throw new Error(
      "useVisitedCharacters must be used with a VisitedCharactersContextProvider"
    );
  }
  return context;
};

export { VisitedCharactersContextProvider, useVisitedCharacters };
