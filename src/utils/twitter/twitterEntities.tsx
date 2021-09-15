import { getHashtagURL, getUserProfileURL } from 'utils/twitter/twitterUrls';
import {
  GenericTweetEntity,
  HashtagEntity,
  MentionEntity,
  Tweet,
  URLEntity,
} from 'utils/types';

export const extractEntityContent = (entity: GenericTweetEntity): string => {
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

export const extractEntityURL = (entity: GenericTweetEntity): string => {
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

export const getTweetEntities = (tweet: Tweet): GenericTweetEntity[] => {
  const tweetEntities = tweet.tweet.entities;
  return [
    ...tweetEntities.hashtags?.map((entity): HashtagEntity => ({ ...entity, type: 'hashtag' })) ?? [],
    ...tweetEntities.mentions?.map((entity): MentionEntity => ({ ...entity, type: 'mention' })) ?? [],
    ...tweetEntities.urls?.map((entity): URLEntity => ({ ...entity, type: 'url' })) ?? [],
  ];
};
