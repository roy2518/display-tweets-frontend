import { Tweet } from 'utils/types';

const TWITTER_BASE_URL = 'http://twitter.com/';

export const getUserProfileURL = (username: string): string => `
    ${TWITTER_BASE_URL}${username}
`;

export const getTweetURL = (tweet: Tweet): string => `
    ${TWITTER_BASE_URL}${tweet.author.username}/status/${tweet.tweet.id}
`;

export const getHashtagURL = (hashtag: string): string => `
    ${TWITTER_BASE_URL}hashtag/${hashtag}?src=hashtag_click
`;
