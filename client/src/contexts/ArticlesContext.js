import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  userArticles: [],
};

const ACTIONS = {
  SET_USER_ARTICLES: "set-user-articles",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_USER_ARTICLES:
      return {
        ...state,
        userArticles: action.payload,
      };
    default:
      return state;
  }
}

const ArticlesContext = createContext();

export function useArticles() {
  return useContext(ArticlesContext);
}

export function ArticlesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function setUserArticles(articles) {
    dispatch({ type: ACTIONS.SET_USER_ARTICLES, payload: articles });
  }

  const value = {
    setUserArticles,
    userArticles: state.userArticles,
  };

  return (
    <ArticlesContext.Provider value={value}>
      {children}
    </ArticlesContext.Provider>
  );
}
