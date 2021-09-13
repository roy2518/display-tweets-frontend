import React from 'react';

import InfiniteScroll from './InfiniteScroll';
import TweetDisplay from '../common/TweetDisplay';

import SearchIcon from '../../assets/search.svg';
import '../../styles/sidebar/Sidebar.scss';

import { Tweet } from '../../utils/types';

interface SidebarProps {
    hashtag: string;
    loadMoreTweets: () => void;
    tweets: Tweet[];
    updateHashtag: (hashtag: string) => void;
}

const Sidebar = ({
  hashtag,
  loadMoreTweets,
  tweets,
  updateHashtag,
}: SidebarProps): JSX.Element => {
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

  const displayTweets = (
    <InfiniteScroll
      loadMore={loadMoreTweets}
    >
      {tweets.map(
        (tweet) => <TweetDisplay key={tweet.tweet.id} tweet={tweet} />,
      )}
    </InfiniteScroll>
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
