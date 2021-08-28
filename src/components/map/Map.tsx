import React from 'react';
import mapboxgl from 'mapbox-gl';

import { convertTweetsToMapboxFeatures } from '../../utils/map';
import { LocationsMap, Tweet } from '../../utils/types';

import MapMarker from '../../assets/map_marker.png';
import '../../styles/map/Map.scss';

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

  // Load the marker image and display markers on the map
  React.useEffect(() => {
    if (map.current == null) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const currentMap = map.current!;
    currentMap.on('style.load', () => {
      currentMap.loadImage(MapMarker, (error, image) => {
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
            'icon-size': 0.6,
          },
        });
      });
    });
  }, []);

  // Manage interactions with markers
  React.useEffect(() => {
    const currentMap = map.current;
    if (currentMap) {
      // Zoom in when marker is clicked
      currentMap.on('click', 'symbols', (e) => {
        if (e.features && e.features[0].geometry.type === 'Point') {
          const { coordinates } = e.features[0].geometry;
          currentMap.flyTo({
            center: [coordinates[0], coordinates[1]],
            zoom: 5,
          });
        }
      });
    }
  }, []);

  // Update the map when Tweet information is updated
  React.useEffect(() => {
    (async () => {
      if (map.current !== null) {
        // Wait for map to be loaded first
        while (!map.current.loaded || !map.current.getSource('points')) {
          // eslint-disable-next-line no-await-in-loop
          await new Promise((resolve) => setTimeout(resolve, 200));
        }
        const geoJsonSource = map.current.getSource('points') as mapboxgl.GeoJSONSource;
        geoJsonSource.setData({
          type: 'FeatureCollection',
          features: displayTweets,
        });
      }
    })();
  }, [tweetLocations, tweets]);

  return <div ref={mapContainer} className="map" />;
};

export default Map;
