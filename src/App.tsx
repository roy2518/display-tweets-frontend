import React from 'react';

import Map from './components/map/Map';

import './App.scss';
import { LocationsMap, Tweet } from './util/types';
import searchTweets from './api/twitter';
import getLocationDetails from './api/geocoding';

function App(): JSX.Element {
  const [hashtag] = React.useState('CatsOfTwitter');
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
        tweetsJson.data.tweets.map((tweet) => tweet.author.location),
      );
      setLocationDetails(locationsJson.data);
    })();
  }, [hashtag]);

  return (
    <div>
      <Map tweetLocations={locationDetails} tweets={tweets} />
    </div>
  );
}

export default App;
