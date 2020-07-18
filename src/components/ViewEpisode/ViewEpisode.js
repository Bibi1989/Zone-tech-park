import React, { useEffect, useState } from "react";
import { DisplayMovie, Flex, GenreStyle, Image, Div } from "../Seasons/style";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import { removeHtmlTag } from "../utils/removeHtmlTag";
import axios from "axios";

const ViewEpisode = () => {
  const url = useLocation().search.slice(5);
  let https = useLocation().search.slice(5, 9) + "s";
  let host = url.slice(4);
  let urls = `${https}${host}`;
  const [singleEpisode, setSingleEpisode] = useState({});
  const fetchEpisode = async () => {
    const res = await axios.get(urls);
    setSingleEpisode(res.data);
  };
  useEffect(() => {
    fetchEpisode();

    // eslint-disable-next-line
  }, []);
  console.log({ host, urls });
  return (
    <Container>
      <Div>
        <H1>{singleEpisode && singleEpisode.name ? singleEpisode.name : ""}</H1>
        <h1>&#124;</h1>{" "}
        <H1>
          Season{" "}
          {singleEpisode && singleEpisode.season ? singleEpisode.season : ""}
        </H1>
        <h1>&#124;</h1>{" "}
        <H1>
          Episode{" "}
          {singleEpisode && singleEpisode.number ? singleEpisode.number : ""}
        </H1>
      </Div>
      <DisplayMovie>
        <Flex>
          <Image height='600px'>
            <img
              src={
                singleEpisode && singleEpisode.image
                  ? singleEpisode.image.original
                  : "https://lh6.googleusercontent.com/proxy/hIgFSMyx4VsuoQh8h-ZfI3IiK9uFSLZ7pG67H_1RwEBDEPiWX-odcJ0PkWriAPeqwKyC6n-12UTrNmQF2ul9DAjwKMljG3zSCCTDoTVDPexFHV9l_JD5WMbmpnUJqWLqYA=s0-d"
              }
              alt='No Poster'
            />
          </Image>
        </Flex>
        <Flex>
          <h1>
            {singleEpisode && singleEpisode.name ? singleEpisode.name : ""}
          </h1>
          <div>
            {singleEpisode && singleEpisode.summary
              ? removeHtmlTag(singleEpisode.summary)
              : "No description"}
          </div>
          <GenreStyle direction='column'>
            <p>
              Air Date:{" "}
              {singleEpisode && singleEpisode.airdate
                ? singleEpisode.airdate
                : "Unknown"}
            </p>
            <p>
              Air Time:{" "}
              {singleEpisode && singleEpisode.airtime
                ? singleEpisode.airtime
                : "Unknown"}
            </p>
          </GenreStyle>
        </Flex>
      </DisplayMovie>
    </Container>
  );
};

export default ViewEpisode;

const Container = styled.div`
  min-height: 94vh;
  width: 100%;
  padding: 2% 0%;
`;
const H1 = styled.h1`
  text-align: center;
`;
