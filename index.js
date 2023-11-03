import { getData } from "./scrape.js";
import { twitterClient } from "./twitterConfig.js";
import { readJsonFile, updateJsonFile, tweetSent } from "./helperStore.js";
import cron from 'node-cron';
// '*/10 * * * * *'
// '*/5 * * * *'

// Helper function that allows us to manage the state of the last sent tweet
// when calling this function, it populates the state of whether the tweet 
// has been sent or not ( tweetSent variable)
await readJsonFile()

// Cron job that runs the program every 5 minutes
cron.schedule('*/10 * * * * *', () => {

    // Function that retrieves the scraped data from the baseball team website
    getData()
        .then(async (data) => {
            const { status, scoreOtherTeam, scoreCaneros } = data;

            // Check if the game is over and if the tweet hasn't been sent
            if (status == 'FINALIZADO' && !tweetSent) {

                // Validates the score and tweets the result
                // depending on the outcome of the game
                if (scoreOtherTeam < scoreCaneros) {
                    try {
                        const response = await twitterClient.v2.tweet('Si');
                        console.log('Tweet sent successfully:', response);
                        await updateJsonFile();
                    } catch (error) {
                        console.error('Failed to tweet:', error);
                    }
                } else {
                    try {
                        const response = await twitterClient.v2.tweet('No');
                        console.log('Tweet sent successfully:', response);
                        await updateJsonFile();
                    } catch (error) {
                        console.error('Failed to tweet:', error);
                    }
                }
            } else {

                // Validates that the game hasn't started yet
                if (status == 'PRÓXIMO') {
                    console.log('Waiting for next game...')
                }

                // Sets the helper variable to false to start showing the current game data, 
                // if the game has started and if the tweet has been sent already from the previous game
                if (status != 'FINALIZADO' && tweetSent) {
                    await updateJsonFile();
                }

                // Prints to console the status of the game if it has already 
                // started and if the tweet hasn't been sent already
                if (status != 'FINALIZADO' && status != 'PRÓXIMO' && !tweetSent) {
                    console.log("Status:", status);
                    console.log("Score Visitor:", scoreOtherTeam);
                    console.log("Score Home:", scoreCaneros);

                    if (scoreOtherTeam < scoreCaneros) {
                        console.log('Home is winning');
                    } else if (scoreOtherTeam > scoreCaneros) {
                        console.log('Visitors are winning');
                    } else {
                        console.log('Game is tied');
                    }
                }

                // Prints to console data when the game is over and the tweet was sent
                // it also indicates that the next game hasn't started yet
                if (status == 'FINALIZADO' && tweetSent) {
                    console.log('Game is over, tweet has been sent.')
                    console.log('Waiting for next game...')
                }
                console.log('-------------------------------')
            }
        })
        .catch((error) => {
            console.error(error);
        });
});





