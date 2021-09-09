import React from 'react';

import TweetDisplay from '../common/TweetDisplay';

import { Tweet } from '../../utils/types';

import '../../styles/sidebar/Sidebar.scss';

interface SidebarProps {
    tweets: Tweet[];
}

const Sidebar = ({ tweets }: SidebarProps): JSX.Element => {
  const displayTweets = tweets.map(
    (tweet) => <TweetDisplay key={tweet.tweet.id} tweet={tweet} />,
  );

  return <div className="sidebar">{displayTweets}</div>;
};

export default Sidebar;
