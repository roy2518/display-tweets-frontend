import React from 'react';

import mapboxgl from 'mapbox-gl';

import '../../styles/map/Map.scss';
import { LocationsMap, Tweet } from '../../util/types';

interface MapProps {
    tweetLocations: LocationsMap;
    tweets: Tweet[];
}

const Map = ({ tweetLocations, tweets }: MapProps): JSX.Element => {
  const mapContainer = React.useRef<HTMLDivElement>(null);
  const map = React.useRef<mapboxgl.Map | null>(null);

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
