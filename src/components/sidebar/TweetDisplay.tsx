import React from 'react';

import { Tweet } from '../../utils/types';

import '../../styles/sidebar/TweetDisplay.scss';

interface TweetProps {
    tweet: Tweet;
}

const TweetDisplay = ({ tweet }: TweetProps): JSX.Element => (
  <div className="tweet">
    <img alt="avatar" className="avatar" src={tweet.author.profile_image_url} />
    <div className="tweetContent">
      {tweet.tweet.text}
    </div>
  </div>
);

export default TweetDisplay;
