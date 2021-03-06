import { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const DEFAULT_STATE = {
  visitedCharacterPages: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'updateVisitedCharacterPages':
      return { ...state, visitedCharacterPages: action.payload }
    default:
      return DEFAULT_STATE
  }
}

const AppContextWrapper = ({ children }) => {
  return (
    <AppContext.Provider value={useReducer(reducer, DEFAULT_STATE)}>
      {children}
    </AppContext.Provider>
  );
}

const useAppContext = () => {
  const [state, dispatcher] = useContext(AppContext);
  return [state, dispatcher];
}

export { AppContextWrapper, useAppContext }