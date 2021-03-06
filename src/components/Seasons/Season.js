import React from "react";

import { InnerDiv, InnerDivChild, Image, Content } from "./style";
import { Link } from "react-router-dom";

const Season = ({ episode, movies, removeHtmlTag }) => {
  return (
    <InnerDiv>
      <Link to={`/episode?url=${episode._links.self.href}`} className='link'>
        <InnerDivChild key={episode.id}>
          <Image height='200px'>
            <img
              src={
                episode.image !== null
                  ? episode.image.medium
                  : movies.image
                  ? movies.image.medium
                  : "https://lh6.googleusercontent.com/proxy/hIgFSMyx4VsuoQh8h-ZfI3IiK9uFSLZ7pG67H_1RwEBDEPiWX-odcJ0PkWriAPeqwKyC6n-12UTrNmQF2ul9DAjwKMljG3zSCCTDoTVDPexFHV9l_JD5WMbmpnUJqWLqYA=s0-d"
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
            <p>
              Showing on{" "}
              {episode.airdate && episode.airdate ? episode.airdate : ""} at{" "}
              {episode.airtime && episode.airtime ? (
                episode.airtime
              ) : (
                <a
                  className='official'
                  href={
                    movies && movies.officialSite
                      ? movies.officialSite
                      : "no link"
                  }
                >
                  Visit website to know time
                </a>
              )}
            </p>
          </Content>
        </InnerDivChild>
      </Link>
    </InnerDiv>
  );
};

export default Season;
