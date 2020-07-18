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
  EpisodeStyle,
  SelectDiv,
  Select,
  InnerDiv,
  InnerDivChild,
  Content,
} from "./style";

// store
import { MovieContext } from "../../context/MovieProvider";
import Season from "./Season";

const Seasons = () => {
  let { fetchMovies, movies, episodes, counts, clearMovie } = useContext(
    MovieContext
  );
  const [query, setQuery] = useState("merlin");
  const [num, setNum] = useState(1);

  useEffect(() => {
    fetchMovies(query, num);

    // eslint-disable-next-line
  }, [num]);

  const handleSearch = ({ target: { value } }) => {
    setQuery(value);
  };
  const clickToSearch = (e) => {
    e.preventDefault();
    fetchMovies(query, num);
  };

  const removeHtmlTag = (text) => {
    let texts = text.replace(/(<([^>]+)>)/gi, "");
    return texts;
  };

  return (
    <SeasonStyle>
      <H1 padding='0 0 40px 0'>Your Movie App</H1>
      <SearchDiv>
        <Form>
          <Input
            type='search'
            placeholder='Search with Movie name'
            onChange={handleSearch}
          />
          <Button onClick={clickToSearch}>Search Movie</Button>
        </Form>
      </SearchDiv>

      <DisplayMovie>
        <Flex>
          <Image>
            <img
              src={movies && movies.image ? movies.image.original : ""}
              alt='No Poster'
            />
          </Image>
        </Flex>
        <Flex>
          <h1>{movies && movies.name}</h1>
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
            at {movies && movies.schedule.time}
          </p>
        </Flex>
      </DisplayMovie>
      <DisplaySeason>
        <H1>Seasons / Episodes</H1>
        <SelectDiv>
          <H1>Season {movies && movies.episodes[0].season}</H1>
          <Select
            onChange={(e) => {
              setNum(Number(e.target.value));
            }}
          >
            <option>Filter By Season</option>
            {new Array(counts).fill(null).map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </Select>
        </SelectDiv>
        <ul>
          {movies &&
            movies.episodes.map((episode, i) => (
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
