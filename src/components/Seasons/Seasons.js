import React, { useContext, useEffect, useState } from "react";

import {
  SeasonStyle,
  H1,
  SearchDiv,
  Form,
  Input,
  Button,
  DisplayMovie,
  DisplaySeason,
  Flex,
  GenreStyle,
  Country,
  Description,
  Image,
  SelectDiv,
  Select,
  Loader,
} from "./style";

// store
import { MovieContext } from "../../context/MovieProvider";
import Season from "./Season";
import { removeHtmlTag } from "../utils/removeHtmlTag";

const Seasons = () => {
  let { fetchMovies, movies, counts, epi_count, loading, error } = useContext(
    MovieContext
  );
  const [query, setQuery] = useState("merlin");
  const [num, setNum] = useState(1);
  const [epic, setEpic] = useState();

  const filteringObj = {
    num,
    epic,
  };
  // const showError = () => {
  //   return
  // };

  useEffect(() => {
    fetchMovies(query, filteringObj);

    // eslint-disable-next-line
  }, [num]);

  const handleSearch = ({ target: { value } }) => {
    setQuery(value);
  };
  const clickToSearch = (e) => {
    e.preventDefault();
    setNum(1);
    setEpic();
    fetchMovies(query, filteringObj);
  };

  return (
    <SeasonStyle>
      <SearchDiv>
        <H1 padding='0 0 40px 0'>Your Movie App</H1>
        <Form>
          <Input
            type='search'
            placeholder='Search with Movie name'
            onChange={handleSearch}
          />
          <Button onClick={clickToSearch}>Search Movie</Button>
        </Form>
      </SearchDiv>

      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <DisplayMovie>
          <Flex>
            <Image>
              <img
                src={
                  movies && movies.image
                    ? movies.image.original
                    : "https://lh6.googleusercontent.com/proxy/hIgFSMyx4VsuoQh8h-ZfI3IiK9uFSLZ7pG67H_1RwEBDEPiWX-odcJ0PkWriAPeqwKyC6n-12UTrNmQF2ul9DAjwKMljG3zSCCTDoTVDPexFHV9l_JD5WMbmpnUJqWLqYA=s0-d"
                }
                alt='No Poster'
              />
            </Image>
          </Flex>
          <Flex>
            <h1>{movies && movies.name ? movies.name : ""}</h1>
            <div>
              {movies && movies.summary
                ? removeHtmlTag(movies.summary.slice(0, 300))
                : "No description"}
            </div>
            <GenreStyle>
              <span>Genres: </span>
              {movies && movies.genres
                ? movies.genres.map((genre) => <li key={genre}>{genre}</li>)
                : "Film"}
            </GenreStyle>
            <Country>
              <p>
                Country{" "}
                {movies && movies.network !== null
                  ? movies.network.country.name
                  : "Other"}
              </p>
            </Country>
            <Description>
              <p>
                {movies && movies.premiered
                  ? movies.premiered.slice(0, 4)
                  : "unknown"}
              </p>
              <p>
                {counts && counts} Season
                {counts && counts > 1 ? "s" : ""}
              </p>
              <p>Rating {movies && movies.rating.average}</p>
              <p>{movies && movies.language}</p>
            </Description>
            <p>
              Show every{" "}
              {movies && movies.schedule
                ? movies.schedule.days.map((d) =>
                    movies.schedule.days.length > 1 ? `${d},` : d
                  )
                : "Unknown"}{" "}
              at{" "}
              {movies && movies.schedule.time ? (
                movies.schedule.time
              ) : (
                <a
                  className='official'
                  href={
                    movies && movies.officialSite
                      ? movies.officialSite
                      : "no link"
                  }
                >
                  Visit their official website for time
                </a>
              )}
            </p>
            <a
              className='official'
              href={
                movies && movies.officialSite ? movies.officialSite : "no link"
              }
            >
              <i class='fas fa-link'></i> Click to Visit there official site
            </a>
          </Flex>
        </DisplayMovie>
      )}
      <DisplaySeason>
        <H1>Seasons / Episodes</H1>
        <SelectDiv>
          <H1>
            {movies && movies.name ? movies.name : ""} Season{" "}
            {/* <span>&#124;</span>{" "} */}
            {movies && movies.episodes[0] ? movies.episodes[0].season : 0}{" "}
            <span>&#124;</span>{" "}
            {movies && movies.episodes ? movies.episodes.length : 0} Episodes
          </H1>
          <Select
            onChange={(e) => {
              setNum(Number(e.target.value));
              setEpic();
            }}
          >
            <option>Filter By Season</option>
            {new Array(counts).fill(null).map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </Select>
          <Select
            onChange={(e) => {
              setEpic(Number(e.target.value));
            }}
          >
            <option>Filter By Episodes</option>
            {new Array(epi_count).fill(null).map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </Select>
        </SelectDiv>
        <ul>
          {movies &&
            movies.episodes.slice(epic - 1, epic).map((episode, i) => (
              <li key={episode.id}>
                <Season
                  episode={episode}
                  movies={movies}
                  removeHtmlTag={removeHtmlTag}
                />
              </li>
            ))}
        </ul>
      </DisplaySeason>
    </SeasonStyle>
  );
};

export default Seasons;
