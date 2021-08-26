import React from 'react';
import mapboxgl from 'mapbox-gl';

import { LocationsMap, Tweet } from '../../utils/types';

import '../../styles/map/Map.scss';

interface MapProps {
    tweetLocations: LocationsMap;
    tweets: Tweet[];
}

const Map = ({ tweetLocations, tweets }: MapProps): JSX.Element => {
  const mapContainer = React.useRef<HTMLDivElement>(null);
  const map = React.useRef<mapboxgl.Map | null>(null);

  // Initialize the map
  React.useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN ?? '';
    map.current = new mapboxgl.Map({
      container: mapContainer.current ?? '',
      style: 'mapbox://styles/mapbox/dark-v10',
      zoom: -1,
    });
  }, []);

  return <div ref={mapContainer} className="map" />;
};

export default Map;
