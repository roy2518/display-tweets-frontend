import React from 'react';

import TweetDisplay from './TweetDisplay';

import { Tweet } from '../../utils/types';

import '../../styles/sidebar/Sidebar.scss';

interface SidebarProps {
    tweets: Tweet[];
}

const Sidebar = ({ tweets }: SidebarProps): JSX.Element => {
  const displayTweets = tweets.map(
    (tweet) => <TweetDisplay key={tweet.tweet.id} tweetId={tweet.tweet.id} />,
  );

  return <div className="sidebar">{displayTweets}</div>;
};

export default Sidebar;
