/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import TimeAgo from 'react-timeago';

import { getUserProfileURL, getUserTweetURL } from '../../utils/tweetDisplay';
import { Tweet } from '../../utils/types';

import '../../styles/common/TweetDisplay.scss';

interface TweetProps {
    tweet: Tweet;
}

const TweetDisplay = ({ tweet }: TweetProps): JSX.Element => (
  <div
    className="tweetContainer"
    onClick={() => {
      window.open(getUserTweetURL(tweet))?.focus();
    }}
  >
    <div>
      <a
        href={getUserProfileURL(tweet)}
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
          href={getUserProfileURL(tweet)}
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
        {tweet.tweet.text}
      </div>
    </div>
  </div>
);

export default TweetDisplay;
