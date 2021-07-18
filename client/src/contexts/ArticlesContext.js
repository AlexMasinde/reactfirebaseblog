import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  userArticles: [],
  latestArticles: [],
  activeCategory: "",
};

const ACTIONS = {
  SET_USER_ARTICLES: "set-user-articles",
  SET_LATEST_ARTICLES: "set-latest-articles",
  SET_ACTIVE_CATEGORY: "set-active-category",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_USER_ARTICLES:
      return {
        ...state,
        userArticles: action.payload,
      };
    case ACTIONS.SET_LATEST_ARTICLES:
      return {
        ...state,
        latestArticles: action.payload,
      };
    case ACTIONS.SET_ACTIVE_CATEGORY:
      return {
        ...state,
        activeCategory: action.payload,
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

  function setLatestArticles(articles) {
    dispatch({ type: ACTIONS.SET_LATEST_ARTICLES, payload: articles });
  }

  function setActiveCategory(category) {
    dispatch({ type: ACTIONS.SET_ACTIVE_CATEGORY, payload: category });
  }

  const value = {
    setUserArticles,
    setLatestArticles,
    setActiveCategory,
    activeCategory: state.activeCategory,
    userArticles: state.userArticles,
    latestArticles: state.latestArticles,
  };

  return (
    <ArticlesContext.Provider value={value}>
      {children}
    </ArticlesContext.Provider>
  );
}
