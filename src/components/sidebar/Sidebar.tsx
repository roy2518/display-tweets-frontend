import React from 'react';

import TweetDisplay from '../common/TweetDisplay';

import { Tweet } from '../../utils/types';

import SearchIcon from '../../assets/search.svg';
import '../../styles/sidebar/Sidebar.scss';

interface SidebarProps {
    hashtag: string;
    tweets: Tweet[];
    updateHashtag: (hashtag: string) => void;
}

const Sidebar = ({ hashtag, tweets, updateHashtag }: SidebarProps): JSX.Element => {
  const [hashtagInput, setHashtagInput] = React.useState(hashtag);

  const searchBar = (
    <div className="searchBar">
      <img alt="Search Icon" src={SearchIcon} />
      <input
        className="hashtagInput"
        onChange={(e) => setHashtagInput(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            updateHashtag(hashtagInput);
          }
        }}
        placeholder="Search for a hashtag..."
        value={hashtagInput}
      />
    </div>
  );

  const displayTweets = tweets.map(
    (tweet) => <TweetDisplay key={tweet.tweet.id} tweet={tweet} />,
  );

  return (
    <div className="sidebar">
      {searchBar}
      <div className="searchedHashtag">
        #
        {hashtag}
      </div>
      {displayTweets}
    </div>
  );
};

export default Sidebar;
