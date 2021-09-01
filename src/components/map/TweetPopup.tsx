import React from 'react';
import { Tweet } from 'react-twitter-widgets';

import '../../styles/map/TweetPopup.scss';

interface TweetPopupProps {
    tweetId: string;
}

const TweetPopup = ({ tweetId }: TweetPopupProps): JSX.Element => (
  <div className="popup">
    <Tweet options={{ dnt: true, hide_thread: true }} tweetId={tweetId} />
  </div>
);

export default TweetPopup;
