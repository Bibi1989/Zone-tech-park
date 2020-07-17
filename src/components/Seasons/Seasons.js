import React, { useContext, useEffect, useState } from "react";

import styled from "styled-components";

// store
import { MovieContext } from "../../context/MovieProvider";

const Seasons = () => {
  let { fetchMovies, movies, episodes } = useContext(MovieContext);
  console.log(movies);
  const [query, setQuery] = useState("merlin");
  const [state, setState] = useState();
  useEffect(() => {
    fetchMovies("");

    // eslint-disable-next-line
  }, []);

  const handleSearch = ({ target: { value } }) => {
    setQuery(value);
  };
  const clickToSearch = (e) => {
    e.preventDefault();

    fetchMovies(query);
  };

  return (
    <Season>
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
              {episodes && episodes.length} Season
              {episodes && episodes.length > 1 ? "s" : ""}
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
                <h1>Season {i + 1}</h1>
                <InnerDiv>
                  {episode.map((epi) => (
                    <InnerDivChild>
                      <Image height='200px'>
                        <img
                          src={
                            epi.image !== null
                              ? epi.image.medium
                              : movies.image
                              ? movies.image.medium
                              : "No image"
                          }
                          alt='No movie poster'
                        />
                      </Image>
                      <Content>
                        <h3>
                          <span>
                            {epi.name.length > 24
                              ? `${epi.name.slice(0, 24)}...`
                              : epi.name}
                          </span>
                          <span>Episode {epi.number}</span>
                        </h3>
                        <p>
                          {epi.summary.length > 30
                            ? `${epi.summary.slice(3, 30)}...`
                            : epi.summary}
                        </p>
                      </Content>
                    </InnerDivChild>
                  ))}
                </InnerDiv>
              </li>
            ))}
        </ul>
      </DisplaySeason>
    </Season>
  );
};

export default Seasons;

const Season = styled.div`
  padding: 1% 10%;
`;
const SearchDiv = styled.div`
  width: 100%;
`;
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  border: 2px solid orangered;
  outline: none;
  border-radius: 4px;
  padding: 1em;
`;
const Button = styled.button`
  background: orangered;
  color: white;
  font-size: 1.1em;
  width: 30%;
  padding: 1em;
  margin: auto;
  margin-top: 1em;
  border: none;
  outline: none;
  border-radius: 4px;
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: 0.5s ease-in-out;

  &:hover {
    box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.1);
    opacity: 0.8;
  }
`;

const DisplayMovie = styled.div`
  margin-top: 3em;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2em;

  ul {
  }
`;
const H1 = styled.h1`
  padding: ${({ padding }) => (padding ? padding : "50px 0 25px 0")};
  text-align: center;
`;
const Flex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
const Image = styled.div`
  max-height: ${({ height }) => (height ? height : "500px")};
  overflow: hidden;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

const GenreStyle = styled.div`
  display: flex;
  list-style: none;

  li {
    padding-right: 6px;
  }
`;
const Country = styled.div``;

const DisplaySeason = styled.div`
  ul {
    list-style: none;
    padding: 0;

    h1 {
      padding: 20px 0;
    }

    li {
      display: block;
      width: 100%;
    }
  }
`;
const InnerDiv = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2em;
  margin-bottom: 20px;
`;
const InnerDivChild = styled.div`
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.3);
`;

const Content = styled.div`
  padding: 10px;
  h3 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1em;
  }
`;
const Description = styled.div`
  display: flex;
  padding: 8px 0;
  p:last-child {
    border: 0;
  }
  p:first-child {
    padding-left: 0;
  }
  p {
    padding: 0 10px;
    border-right: 1px solid #aaaaaa;
  }
`;
