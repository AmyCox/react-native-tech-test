import { createContext, useReducer, useContext, Dispatch } from "react";
import { Beer } from "../types/types";

interface AppState {
  // global state properties
  selectedBeer: Beer | null;
}

// define your action types
type Action = { type: "setBeer"; payload: Beer } | { type: "clearBeer" };

// Define intial State
const initialState: AppState = {
  selectedBeer: null,
};

// create context
const AppContext = createContext<{
  state: AppState;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

// create a reducer function
const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "setBeer":
      return { ...state, selectedBeer: action.payload };
    case "clearBeer":
      return { ...state, selectedBeer: null };
    default:
      return state;
  }
};

// create a context provider

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  console.log("app provider state", state);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
