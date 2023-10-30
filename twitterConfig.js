import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';

dotenv.config();

export const twitterClient = new TwitterApi({
    appKey: process.env.APPKEY,
    appSecret: process.env.APPSECRET,
    accessToken: process.env.ACCESSTOKEN,
    accessSecret: process.env.ACCESSSECRET,
});

// try {
//     const response = await twitterClient.v2.tweet('Hello, this is a test.');
//     console.log('Tweet sent successfully:', response);
// } catch (error) {
//     console.error('Failed to tweet:', error);
// }