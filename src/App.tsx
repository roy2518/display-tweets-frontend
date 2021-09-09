import React from 'react';

import Map from './components/map/Map';
import Sidebar from './components/sidebar/Sidebar';

import getLocationDetails from './api/geocoding';
import searchTweets from './api/twitter';

import { LocationsMap, Tweet } from './utils/types';

import './App.scss';

const DEFAULT_HASHTAG = 'CatsOfTwitter';

function App(): JSX.Element {
  const [hashtag, setHashtag] = React.useState(DEFAULT_HASHTAG);
  const [tweets, setTweets] = React.useState<Tweet[]>([]);
  const [pageToken, setPageToken] = React.useState<string | undefined>(undefined);

  const [locationDetails, setLocationDetails] = React.useState<LocationsMap>({});

  // Load tweets and locations data
  React.useEffect(() => {
    (async () => {
      const tweetsJson = await searchTweets(hashtag, pageToken);
      setTweets(tweetsJson.data.tweets);
      setPageToken(tweetsJson.next_token);

      const locationsJson = await getLocationDetails(
        tweetsJson.data.tweets.map((tweet) => tweet.author.location ?? '')
          .filter((locationName) => locationName),
      );
      setLocationDetails(locationsJson.data);
    })();
  }, [hashtag]);

  return (
    <div>
      <Map tweetLocations={locationDetails} tweets={tweets} />
      <Sidebar hashtag={hashtag} tweets={tweets} updateHashtag={setHashtag} />
    </div>
  );
}

export default App;
