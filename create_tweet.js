// import { TwitterApi } from 'twitter-api-v2';
// import dotenv from 'dotenv';

// dotenv.config();

// const main = async () => {
//     const twitterClient = new TwitterApi({
//         appKey: `${process.env.APPKEY}`,
//         appSecret: `${process.env.APPSECRET}`,
//         accessToken: `${process.env.ACCESSTOKEN}`,
//         accessSecret: `${process.env.ACCESSSECRET}`,
//     });

//     // Log your environment variables to ensure they are correctly loaded
//     console.log(process.env.APPKEY);
//     console.log(process.env.APPSECRET);
//     console.log(process.env.ACCESSTOKEN);
//     console.log(process.env.ACCESSSECRET);

//     try {
//         const response = await twitterClient.v2.tweet('Hello, this is a test.');
//         console.log('Tweet sent successfully:', response);
//     } catch (error) {
//         console.error('Failed to tweet:', error);
//     }
// };

// main();


import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';

dotenv.config();

const twitterClient = new TwitterApi({
    appKey: process.env.APPKEY,
    appSecret: process.env.APPSECRET,
    accessToken: process.env.ACCESSTOKEN,
    accessSecret: process.env.ACCESSSECRET,
});

// const twitterClient = new TwitterApi({
//     appKey: "5mDqECxTRgJeg9DBvaYZBrob2",
//     appSecret: "wgIqYm6mfRtWaBZbnK01QEgiajzw8bO33mYpgHOQUuXf0JRSNU",
//     accessToken: "1518699456429928448-FI9rrw4TzDBi3PmQqzKtsCtVQ3P3gX",
//     accessSecret: "aKqhkpxhtP3h3QNF1tbQTanCdJVZGNZZqdGRzw9AzqXuR",
// });



console.log(process.env.APPKEY)
console.log(process.env.APPSECRET)
console.log(process.env.ACCESSTOKEN)
console.log(process.env.ACCESSSECRET)

// await twitterClient.v2.tweet('Hello, this is a test.').then(console.log('tweet sent successfully')).catch(console.log('failed to tweet'));
try {
    const response = await twitterClient.v2.tweet('Hello, this is a test.');
    console.log('Tweet sent successfully:', response);
} catch (error) {
    console.error('Failed to tweet:', error);
}