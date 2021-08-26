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
