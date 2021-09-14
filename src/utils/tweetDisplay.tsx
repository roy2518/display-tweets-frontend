import { Tweet } from './types';

const TWITTER_BASE_URL = 'http://twitter.com/';

export const getUserProfileURL = (tweet: Tweet): string => `
    ${TWITTER_BASE_URL}${tweet.author.username}
`;

export const getUserTweetURL = (tweet: Tweet): string => `
    ${TWITTER_BASE_URL}${tweet.author.username}/status/${tweet.tweet.id}
`;
