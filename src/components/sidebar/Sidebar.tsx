import React from 'react';

import TweetDisplay from '../common/TweetDisplay';

import { Tweet } from '../../utils/types';

import '../../styles/sidebar/Sidebar.scss';

interface SidebarProps {
    hashtag: string;
    tweets: Tweet[];
    updateHashtag: (hashtag: string) => void;
}

const Sidebar = ({ hashtag, tweets, updateHashtag }: SidebarProps): JSX.Element => {
  const [hashtagInput, setHashtagInput] = React.useState(hashtag);

  const searchBar = (
    <div>
      <form action="#" onSubmit={() => updateHashtag(hashtagInput)}>
        <input
          className="hashtagInput"
          onChange={(e) => setHashtagInput(e.target.value)}
          placeholder="Search for a hashtag..."
          value={hashtagInput}
        />
      </form>
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
