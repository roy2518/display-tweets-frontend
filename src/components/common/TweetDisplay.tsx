import React from 'react';
import TimeAgo from 'react-timeago';

import { Tweet } from '../../utils/types';

import '../../styles/common/TweetDisplay.scss';

interface TweetProps {
    tweet: Tweet;
}

const TweetDisplay = ({ tweet }: TweetProps): JSX.Element => (
  <div className="tweetContainer">
    <div>
      <img alt="User Avatar" className="userAvatar" src={tweet.author.profile_image_url} />
    </div>
    <div className="tweetBody">
      <div className="tweetHeader">
        <a href={`http://twitter.com/${tweet.author.username}`} target="_blank" rel="noreferrer">
          <span>{tweet.author.name}</span>
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
