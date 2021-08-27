export interface APIError {
    detail: string;
    title: string;
}

export interface LocationAddress {
    country: string;
    'country_code': string;
}

export interface LocationsAPIResponse {
    data: LocationsMap;
}

export interface LocationDetails {
    address: LocationAddress;
    'display_name': string;
    lat: number;
    lon: number;
}

export interface LocationsMap {
    [key: string]: LocationDetails;
}

export interface MapboxFeature {
    geometry: {
        coordinates: number[];
        type: string;
    }
    properties: {
        data: Tweet;
    }
    type: string;
}

export interface SearchTweetsAPIResponse {
    data: { tweets: Tweet[] };
    'next_token': string;
}

export interface Tweet {
    author: TweetAuthor;
    tweet: TweetContent;
}

export interface TweetAuthor {
    id: string;
    location: string;
    name: string;
    'profile_image_url': string;
    username: string;
}

export interface TweetContent {
    'author_id': string;
    'created_at': string;
    id: string;
    text: string;
}
