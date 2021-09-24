import React from 'react';

import SearchIcon from 'assets/search.svg';

import InfiniteScroll from 'components/sidebar/InfiniteScroll';
import LoadingIndicator from 'components/common/LoadingIndicator';
import TweetDisplay from 'components/common/TweetDisplay';

import 'styles/sidebar/Sidebar.scss';

import { Tweet } from 'utils/types';

interface SidebarProps {
    error: string | undefined;
    hashtag: string;
    isLoading: boolean;
    loadMoreTweets: () => Promise<void>;
    tweets: Tweet[];
    updateHashtag: (hashtag: string) => void;
}

const Sidebar = ({
  error,
  hashtag,
  isLoading,
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

  const displayTweets = isLoading
    ? (
      <LoadingIndicator
        isLoading={isLoading}
      />
    )
    : (
      <InfiniteScroll
        error={error}
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
