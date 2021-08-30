import React from 'react';
import { Tweet } from 'react-twitter-widgets';

import '../../styles/sidebar/TweetDisplay.scss';

interface TweetProps {
    tweetId: string;
}

const TweetDisplay = ({ tweetId }: TweetProps): JSX.Element => (
  <div className="tweetContainer">
    <Tweet options={{ dnt: true, hide_thread: true }} tweetId={tweetId} />
  </div>
);

export default TweetDisplay;
