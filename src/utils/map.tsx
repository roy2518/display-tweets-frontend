import {
  LocationDetails,
  LocationsMap,
  MapboxFeature,
  Tweet,
} from 'utils/types';

// Create a Mapbox feature from a Tweet. Used by Mapbox to display the Tweet.
const convertTweetToMapboxFeature = (tweet: Tweet, locationDetails: LocationDetails)
: MapboxFeature => ({
  geometry: {
    type: 'Point',
    coordinates: [locationDetails.lon, locationDetails.lat],
  },
  properties: {
    data: tweet,
  },
  type: 'Feature',
});

// Create Mapbox features for all Tweets that have location details.
// eslint-disable-next-line import/prefer-default-export
export const convertTweetsToMapboxFeatures = (tweets: Tweet[], locationsMap: LocationsMap)
: MapboxFeature[] => {
  const tweetsWithLocations = tweets.filter(
    (tweet) => tweet.author.location && locationsMap[tweet.author.location],
  );
  return tweetsWithLocations.map(
    (tweet) => convertTweetToMapboxFeature(tweet, locationsMap[tweet.author.location ?? '']),
  );
};
