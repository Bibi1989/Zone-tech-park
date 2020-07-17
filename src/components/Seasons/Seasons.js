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
} from "./style";

// store
import { MovieContext } from "../../context/MovieProvider";
import Season from "./Season";

const Seasons = () => {
  let { fetchMovies, movies, episodes, counts } = useContext(MovieContext);
  console.log(counts);
  counts = counts || 6;
  episodes = episodes || [];
  const [query, setQuery] = useState("merlin");
  const [num, setNum] = useState(1);

  // episodes = episodes.filter((episode) => {
  //   return episode.filter((epi) => epi.season === 2);
  // });
  // episodes = episodes.filter((episode) => {
  //   return episode.filter((epi) => epi.season === 2);
  // });
  console.log(episodes);

  useEffect(() => {
    fetchMovies("", num);

    // eslint-disable-next-line
  }, [num]);

  const handleSearch = ({ target: { value } }) => {
    setQuery(value);
  };
  const clickToSearch = (e) => {
    e.preventDefault();

    fetchMovies(query, num);
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
            <img src={movies && movies.image.original} alt='' />
          </Image>
        </Flex>
        <Flex>
          <h1>{movies && movies.name}</h1>
          <div>{movies && movies.summary.slice(0, 300)}</div>
          <GenreStyle>
            <span>Genres: </span>
            {movies &&
              movies.genres.map((genre) => <li key={genre}>{genre}</li>)}
          </GenreStyle>
          <Country>
            <p>Country {movies && movies.network.country.name}</p>
          </Country>
          <Description>
            <p>{movies && movies.premiered.slice(0, 4)}</p>
            <p>
              {counts && counts} Season
              {counts && counts > 1 ? "s" : ""}
            </p>
            <p>Rating {movies && movies.rating.average}</p>
            <p>{movies && movies.language}</p>
          </Description>
          <p>
            Show every{" "}
            {movies &&
              movies.schedule.days.map((d) =>
                movies.schedule.days.length > 1 ? `${d},` : d
              )}{" "}
            at {movies && movies.schedule.time}
          </p>
        </Flex>
      </DisplayMovie>
      <DisplaySeason>
        <H1>Seasons / Episodes</H1>
        <ul>
          {episodes &&
            episodes.map((episode, i) => (
              <li>
                <EpisodeStyle>
                  <H1 align='left' padding='20px 0'>
                    Season {episodes[0][0].season}
                  </H1>
                  <SelectDiv>
                    <Select onChange={(e) => setNum(Number(e.target.value))}>
                      <option>Filter By Season</option>
                      {new Array(counts).fill(null).map((seasonSort, i) => (
                        <option value={i + 1}>{i + 1}</option>
                      ))}
                    </Select>
                    <Select>
                      <option>Sort By Episodes</option>
                      <option>1</option>
                    </Select>
                  </SelectDiv>
                </EpisodeStyle>

                <Season episode={episode} movies={movies} />
              </li>
            ))}
        </ul>
      </DisplaySeason>
    </SeasonStyle>
  );
};

export default Seasons;
