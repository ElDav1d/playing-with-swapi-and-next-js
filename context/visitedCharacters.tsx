import { createContext, useContext, useReducer } from "react";
import { VisitedPages } from "../interfaces.js";

type Action = { type: string; payload: VisitedPages };
type Dispatch = (action: Action) => void;
type State = { visitedCharacterPages: VisitedPages };
type ContextProviderProps = { children: React.ReactNode };

const VisitedCharactersContext = createContext<
  | {
      state: State;
      dispatch: Dispatch;
    }
  | undefined
>(undefined);

const visitedCharactersReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "updateVisitedCharacterPages":
      return { ...state, visitedCharacterPages: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const VisitedCharactersContextProvider = ({
  children,
}: ContextProviderProps) => {
  const [state, dispatch] = useReducer(visitedCharactersReducer, {
    visitedCharacterPages: [],
  });
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
