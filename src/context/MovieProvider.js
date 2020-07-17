import React, { createContext, useReducer } from "react";

import axios from "axios";

export const MovieContext = createContext();

const FETCHALLMOVIES = "FETCHALLMOVIES";
const SEASON = "SEASON";

const initialState = {
  seasons: null,
  episodes: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case FETCHALLMOVIES:
      return {
        ...state,
        seasons: action.payload,
      };
    case SEASON:
      return {
        ...state,
        episodes: action.payload,
      };

    default:
      return state;
  }
};

export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchMovies = async (search) => {
    let query = search ? search : "merlin";
    try {
      const response = await axios.get(
        `https://api.tvmaze.com/singlesearch/shows/?q=${query}&embed=episodes`
      );
      let season = response.data;
      let obj = {};
      let arr = [];
      season = season._embedded.episodes.forEach((v) => {
        if (obj[v.season]) {
          arr.push(v);
          obj[v.season] = arr.filter((a) => a.season === v.season);
        } else {
          obj[v.season] = arr;
        }
      });
      const na = Object.keys(obj);
      const nv = Object.values(obj);
      let nar = [];
      for (let i = 0; i < na.length; i++) {
        nar.push(nv[i]);
      }
      console.log({ nar });
      dispatch({ type: SEASON, payload: nar });
      dispatch({ type: FETCHALLMOVIES, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   fetchMovies();

  //   // eslint-disable-next-line
  // }, []);
  return (
    <MovieContext.Provider
      value={{
        fetchMovies,
        movies: state.seasons,
        episodes: state.episodes,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
