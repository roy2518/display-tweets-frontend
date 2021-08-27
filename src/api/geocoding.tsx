import { APIError, LocationsAPIResponse } from '../utils/types';

const API_ENDPOINT = 'https://secure-anchorage-29952.herokuapp.com';
const API_ROUTE = '/api/locations';

// Retrieve tweets containing a given hashtag.
// The parameter 'nextToken' is optional and is
// used to fetch the next page of results.
const getLocationDetails = async (locationNames: string[])
: Promise<LocationsAPIResponse> => {
  const urlWithParams = `${API_ENDPOINT}${API_ROUTE}?names=${JSON.stringify(locationNames)}`;
  const response = await fetch(urlWithParams);
  if (response.ok) {
    return (await response.json()) as LocationsAPIResponse;
  }
  const error: APIError = await response.json();
  throw new Error(error.detail);
};

export default getLocationDetails;
