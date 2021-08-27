import React from 'react';
import mapboxgl from 'mapbox-gl';

import { LocationsMap, Tweet } from '../../utils/types';

import '../../styles/map/Map.scss';
import TwitterLogo from '../../assets/twitter_logo.png';
import { convertTweetsToMapboxFeatures } from '../../utils/map';

interface MapProps {
    tweetLocations: LocationsMap;
    tweets: Tweet[];
}

const Map = ({ tweetLocations, tweets }: MapProps): JSX.Element => {
  const mapContainer = React.useRef<HTMLDivElement>(null);
  const map = React.useRef<mapboxgl.Map | null>(null);
  const displayTweets = convertTweetsToMapboxFeatures(tweets, tweetLocations);

  // Initialize the map
  React.useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN ?? '';
    map.current = new mapboxgl.Map({
      container: mapContainer.current ?? '',
      style: 'mapbox://styles/mapbox/dark-v10',
      zoom: -1,
    });
  }, []);

  // Display markers on the map for each Tweet
  React.useEffect(() => {
    if (map.current == null) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const currentMap = map.current!;
    currentMap.on('style.load', () => {
      currentMap.loadImage(TwitterLogo, (error, image) => {
        if (error) throw error;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const loadedImage = image!;
        currentMap.addImage('custom-marker', loadedImage);
        currentMap.addSource('points', {
          data: {
            type: 'FeatureCollection',
            features: displayTweets,
          },
          type: 'geojson',
        });
        currentMap.addLayer({
          id: 'symbols',
          type: 'symbol',
          source: 'points',
          layout: {
            'icon-image': 'custom-marker',
            'icon-allow-overlap': true,
            'icon-size': 0.02,
          },
        });
      });
    });
  }, []);

  // Update the map when Tweet information is updated
  React.useEffect(() => {
    if (map.current !== null) {
      const geoJsonSource = map.current.getSource('points') as mapboxgl.GeoJSONSource;
      if (!geoJsonSource) return;
      geoJsonSource.setData({
        type: 'FeatureCollection',
        features: displayTweets,
      });
    }
  }, [tweetLocations, tweets]);

  return <div ref={mapContainer} className="map" />;
};

export default Map;
