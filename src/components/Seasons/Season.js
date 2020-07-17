import React from "react";

import styled from "styled-components";

import { InnerDiv, InnerDivChild, Image, Content } from "./style";

const Season = ({ episode, movies }) => {
  return (
    <InnerDiv>
      {episode.map((epi) => (
        <InnerDivChild key={epi.id}>
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
  );
};

export default Season;
