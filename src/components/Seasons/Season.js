import React from "react";

import { InnerDiv, InnerDivChild, Image, Content } from "./style";

const Season = ({ episode, movies, removeHtmlTag }) => {
  return (
    <InnerDiv>
      <InnerDivChild key={episode.id}>
        <Image height='200px'>
          <img
            src={
              episode.image !== null
                ? episode.image.medium
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
              {episode.name.length > 24
                ? `${episode.name.slice(0, 24)}...`
                : episode.name}
            </span>
            <span>Episode {episode.number}</span>
          </h3>
          <p>
            {episode.summary && removeHtmlTag(episode.summary.slice(0, 40))}
          </p>
        </Content>
      </InnerDivChild>
    </InnerDiv>
  );
};

export default Season;
