import React from 'react';

import getLocationDetails from 'api/geocoding';
import searchTweets from 'api/twitter';

import Map from 'components/map/Map';
import Sidebar from 'components/sidebar/Sidebar';

import { LocationsMap, Tweet } from 'utils/types';

import 'App.scss';

const DEFAULT_HASHTAG = 'CatsOfTwitter';

function App(): JSX.Element {
  const [hashtag, setHashtag] = React.useState(DEFAULT_HASHTAG);
  const [tweets, setTweets] = React.useState<Tweet[]>([]);
  const [pageToken, setPageToken] = React.useState<string | undefined>(undefined);

  const [locationDetails, setLocationDetails] = React.useState<LocationsMap>({});

  // Callback used to load a 'page' of tweet and location data
  const loadTweets = React.useCallback(async () => {
    const tweetsJson = await searchTweets(hashtag, pageToken);
    setTweets([...tweets, ...tweetsJson.data.tweets]);
    setPageToken(tweetsJson.next_token);

    const locationsJson = await getLocationDetails(
      tweetsJson.data.tweets.map((tweet) => tweet.author.location ?? '')
        .filter((locationName) => locationName),
    );
    setLocationDetails({ ...locationDetails, ...locationsJson.data });
  }, [hashtag, locationDetails, pageToken, tweets]);

  // Load tweets on mount and whenever hashtag updates
  React.useEffect(() => {
    (async () => {
      await loadTweets();
    })();
  }, [hashtag]);

  return (
    <div>
      <Map tweetLocations={locationDetails} tweets={tweets} />
      <Sidebar
        hashtag={hashtag}
        loadMoreTweets={loadTweets}
        tweets={tweets}
        updateHashtag={setHashtag}
      />
    </div>
  );
}

export default App;
