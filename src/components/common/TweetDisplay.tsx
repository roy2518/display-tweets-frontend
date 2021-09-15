/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import TimeAgo from 'react-timeago';

import TweetText from 'components/common/TweetText';

import 'styles/common/TweetDisplay.scss';

import { getUserProfileURL, getTweetURL } from 'utils/twitterUrls';
import { Tweet } from 'utils/types';

interface TweetProps {
    tweet: Tweet;
}

const TweetDisplay = ({ tweet }: TweetProps): JSX.Element => (
  <div
    className="tweetContainer"
    onClick={() => {
      window.open(getTweetURL(tweet))?.focus();
    }}
  >
    <div>
      <a
        href={getUserProfileURL(tweet.author.username)}
        onClick={(e) => { e.stopPropagation(); }}
        target="_blank"
        rel="noreferrer"
      >
        <img alt="User Avatar" className="userAvatar" src={tweet.author.profile_image_url} />
      </a>
    </div>
    <div className="tweetBody">
      <div className="tweetHeader">
        <a
          href={getUserProfileURL(tweet.author.username)}
          onClick={(e) => { e.stopPropagation(); }}
          target="_blank"
          rel="noreferrer"
        >
          <span className="authorName">{tweet.author.name}</span>
        </a>
        <div className="dotSeparator">
          ·
        </div>
        <span className="timestamp">
          <TimeAgo date={tweet.tweet.created_at} />
        </span>
      </div>
      <div className="tweetText">
        <TweetText tweet={tweet} />
      </div>
    </div>
  </div>
);

export default TweetDisplay;
