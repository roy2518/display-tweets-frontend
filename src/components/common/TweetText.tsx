import React from 'react';

import 'styles/common/TweetText.scss';

import { extractEntityContent, extractEntityURL, getTweetEntities } from 'utils/twitter/twitterEntities';
import {
  GenericTweetEntity,
  Tweet,
} from 'utils/types';

interface TweetTextProps {
  tweet: Tweet;
}

interface EntityMap {
  [index: number]: GenericTweetEntity;
}

/**
 * Take a tweet's source text and embed it with necessary hyperlinks.
 */
const TweetText = ({ tweet }: TweetTextProps): JSX.Element => {
  const { text } = tweet.tweet;
  const entities = getTweetEntities(tweet);

  // Map of index (in the text) to Entity
  const entityMap: EntityMap = {};
  entities.forEach((entity) => {
    const content = extractEntityContent(entity);
    let currIndex = text.indexOf(content);
    while (currIndex !== -1) {
      if (!entityMap[currIndex]
        // Some entities are prefixes of others,
        // so use the entity with greatest length
        || content.length > extractEntityContent(entityMap[currIndex]).length) {
        entityMap[currIndex] = entity;
      }
      currIndex = text.indexOf(content, currIndex + 1);
    }
  });

  const entityIndices = Object.keys(entityMap).map((index) => parseInt(index, 10));
  entityIndices.sort((a, b) => a - b);

  const result: JSX.Element[] = [];
  let currIndex = 0;

  entityIndices.forEach((entityIndex) => {
    const entity = entityMap[entityIndex];
    const entityContent = extractEntityContent(entity);
    if (currIndex < entityIndex) {
      result.push(<span key={`Text ${currIndex}`}>{text.substring(currIndex, entityIndex)}</span>);
    }
    result.push((
      <a
        className="entityLink"
        href={extractEntityURL(entity)}
        key={`Entity ${entityIndex}`}
        onClick={(e) => { e.stopPropagation(); }}
        target="_blank"
        rel="noreferrer"
      >
        {text.substr(entityIndex, entityContent.length)}
      </a>
    ));
    currIndex = entityIndex + entityContent.length;
  });
  result.push(<span key="Remaining text">{text.substr(currIndex)}</span>);
  return <div>{result}</div>;
};

export default TweetText;
