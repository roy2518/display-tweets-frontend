import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';

import MapMarker from 'assets/map_marker.png';

import TweetDisplay from 'components/common/TweetDisplay';

import 'styles/map/Map.scss';

import { convertTweetsToMapboxFeatures } from 'utils/map';
import { LocationsMap, Tweet } from 'utils/types';

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
            'icon-size': 0.6,
          },
        });
      });
    });
  }, []);

  // Zoom in when a marker is clicked
  React.useEffect(() => {
    const currentMap = map.current;
    if (currentMap) {
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

  // Display popup when user hovers over a marker
  React.useEffect(() => {
    const currentMap = map.current;
    // Create a popup, but don't add it to the map yet.
    const popup = new mapboxgl.Popup({
      maxWidth: '300px',
    });
    if (currentMap !== null) {
      currentMap.on('mouseenter', 'symbols', (e) => {
        if (e.features && e.features[0].geometry.type === 'Point') {
          // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
          currentMap.getCanvas().style.cursor = 'pointer';
          const { coordinates } = e.features[0].geometry;

          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          // Create component programmatically in order to insert it as html
          const div = document.createElement('div');
          const tweet = JSON.parse(e.features?.[0].properties?.data);
          ReactDOM.render(<TweetDisplay tweet={tweet} />, div);

          // Populate the popup and set its coordinates
          // based on the feature found.
          popup.setLngLat([coordinates[0], coordinates[1]])
            .setDOMContent(div)
            .addTo(currentMap);
        }
      });

      // Change cursor back to a pointer when it leaves a feature in the 'symbols' layer
      currentMap.on('mouseleave', 'symbols', () => {
        currentMap.getCanvas().style.cursor = '';
      });
    }
  }, []);

  return <div ref={mapContainer} className="map" />;
};

export default Map;
