import React, { createContext, useReducer } from "react";

import axios from "axios";

export const MovieContext = createContext();

const FETCHALLMOVIES = "FETCHALLMOVIES";
const SEASON = "SEASON";
const SEASON_COUNT = "SEASON_COUNT";
const EPI_COUNT = "EPI_COUNT";
const CLEAR = "CLEAR";

const initialState = {
  seasons: null,
  episodes: null,
  counts: null,
  epi_count: null,
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
    case SEASON_COUNT:
      return {
        ...state,
        counts: action.payload,
      };
    case EPI_COUNT:
      return {
        ...state,
        epi_count: action.payload,
      };
    case CLEAR:
      return {
        ...state,
        seasons: null,
      };

    default:
      return state;
  }
};

export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchMovies = async (search, num) => {
    let query = search ? search : "merlin";
    try {
      const response = await axios.get(
        `https://api.tvmaze.com/singlesearch/shows/?q=${search}&embed=episodes`
      );
      let movies = response.data;
      let season = response.data;

      movies = movies._embedded.episodes.filter(
        (movie) => movie.season === num
      );

      movies = {
        ...response.data,
        episodes: movies,
      };
      console.log(movies);

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
      const seasonkey = Object.keys(obj);
      const seasonvalue = Object.values(obj);
      let new_season = [];
      for (let i = 0; i < seasonkey.length; i++) {
        new_season.push(seasonvalue[i]);
      }
      // console.log(new_season);

      let count = new_season.length;

      new_season = new_season.filter((n, i) => i + 1 === num);

      // console.log({ movies });

      // dispatch({ type: SEASON, payload: new_season });
      dispatch({ type: SEASON_COUNT, payload: count });
      dispatch({ type: FETCHALLMOVIES, payload: movies });
    } catch (error) {
      console.log(error);
    }
  };

  const clearMovie = () => {
    dispatch({ type: CLEAR });
  };

  return (
    <MovieContext.Provider
      value={{
        fetchMovies,
        clearMovie,
        movies: state.seasons,
        episodes: state.episodes,
        counts: state.counts,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
