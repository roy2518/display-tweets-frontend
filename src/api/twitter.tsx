import { APIError, SearchTweetsAPIResponse } from 'utils/types';

const API_ENDPOINT = 'https://secure-anchorage-29952.herokuapp.com';
const API_ROUTE = '/api/tweets';

// Retrieve tweets containing a given hashtag.
// The parameter 'nextToken' is optional and is
// used to fetch the next page of results.
const searchTweets = async (hashtag: string, nextToken?: string)
: Promise<SearchTweetsAPIResponse> => {
  const urlWithParams = `${API_ENDPOINT}${API_ROUTE}?hashtag=${hashtag}${nextToken ? `&next_token=${nextToken}` : ''}`;
  const response = await fetch(urlWithParams);
  if (response.ok) {
    return (await response.json()) as SearchTweetsAPIResponse;
  }
  const error: APIError = await response.json();
  throw new Error(error.detail);
};

export default searchTweets;
