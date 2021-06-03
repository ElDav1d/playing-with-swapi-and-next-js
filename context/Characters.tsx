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

const CharactersContext =
  createContext<
    | {
        charactersContextState: State;
        charactersContextDispatch: Dispatch;
      }
    | undefined
  >(undefined);

const CharactersContextProvider = ({ children }: ContextProviderProps) => {
  const [charactersContextState, charactersContextDispatch] =
    useReducer<CombinedReducer>(mainReducer, initialState);
  const value = { charactersContextState, charactersContextDispatch };

  return (
    <CharactersContext.Provider value={value}>
      {children}
    </CharactersContext.Provider>
  );
};

const useCharactersContext = () => {
  const context = useContext(CharactersContext);
  if (context === undefined) {
    throw new Error(
      "useCharactersContext must be used with a CharactersContextProvider"
    );
  }
  return context;
};

export { CharactersContextProvider, useCharactersContext };
