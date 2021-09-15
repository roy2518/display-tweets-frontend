import React from 'react';

import 'styles/common/TweetText.scss';

import { getHashtagURL, getUserProfileURL } from 'utils/twitterUrls';
import {
  GenericTweetEntity,
  HashtagEntity,
  MentionEntity,
  Tweet,
  URLEntity,
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
  const tweetEntities = tweet.tweet.entities;
  const entities: GenericTweetEntity[] = [
    ...tweetEntities.hashtags?.map((entity): HashtagEntity => ({ ...entity, type: 'hashtag' })) ?? [],
    ...tweetEntities.mentions?.map((entity): MentionEntity => ({ ...entity, type: 'mention' })) ?? [],
    ...tweetEntities.urls?.map((entity): URLEntity => ({ ...entity, type: 'url' })) ?? [],
  ];

  const extractEntityContent = (entity: GenericTweetEntity): string => {
    switch (entity.type) {
      case 'hashtag':
        return `#${entity.tag}`;
      case 'mention':
        return `@${entity.username}`;
      case 'url':
        return entity.url;
      default:
        return '';
    }
  };

  const extractEntityURL = (entity: GenericTweetEntity): string => {
    switch (entity.type) {
      case 'hashtag':
        return getHashtagURL(entity.tag);
      case 'mention':
        return getUserProfileURL(entity.username);
      case 'url':
        return entity.url;
      default:
        return '';
    }
  };

  const { text } = tweet.tweet;

  const entityMap: EntityMap = {};
  entities.forEach((entity) => {
    const content = extractEntityContent(entity);
    let currIndex = text.indexOf(content);
    while (currIndex !== -1) {
      if (!entityMap[currIndex]
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

  entityIndices.forEach((entityIndex, index) => {
    const entity = entityMap[entityIndex];
    const entityContent = extractEntityContent(entity);
    if (currIndex < entityIndex) {
      // eslint-disable-next-line react/no-array-index-key
      result.push(<span key={`Text ${index} ${currIndex}`}>{text.substring(currIndex, entityIndex)}</span>);
    }
    result.push((
      <a
        className="entityLink"
        href={extractEntityURL(entity)}
        // eslint-disable-next-line react/no-array-index-key
        key={`Entity ${index} ${entityIndex}`}
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
