import https from "https";
import * as cheerio from "cheerio";
import { twitterClient } from "./twitterConfig.js";
import cron from 'node-cron';

const url = 'https://cañeros.net'; // URL of the webpage to scrape

// Scrapes data from the baseball's team website and 
// performs HTML manipulation to retrieve the data needed
export async function getData() {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            let data = '';

            // Scrapes data from the website
            response.on('data', (chunk) => {
                data += chunk;
            });

            // Retrieves ONLY the data needed from the scraped data
            // when scraping is done
            response.on('end', () => {
                // Creates object to manipulate HTML
                const $ = cheerio.load(data);

                // Retrieves the status of the game
                const status = $('.tablero th').first().text().trim();

                // Creates the variables to later store the score
                let scoreOtherTeam = '';
                let scoreCaneros = '';

                // Finds the second and third rows of the score table
                // these rows contain the team's data (image and score)
                const teamX = $('.tablero tr').eq(1);
                const teamY = $('.tablero tr').eq(2);

                // Identifies which team is Cañeros (MOC) by analizing the image URL
                const teamX_Identifier = teamX.first().html().substring(83, 86);
                const teamY_Identifier = teamY.first().html().substring(83, 86);

                // Validates which team is Cañeros (MOC) and
                // sets the score accordingly
                if (teamY_Identifier == 'MOC') {
                    scoreCaneros = $(".car").eq(1).text().trim();
                    scoreOtherTeam = $(".car").eq(0).text().trim();
                } else if (teamX_Identifier == 'MOC') {
                    scoreCaneros = $(".car").eq(0).text().trim();
                    scoreOtherTeam = $(".car").eq(1).text().trim();
                }

                resolve({ status, scoreOtherTeam, scoreCaneros });
            });

            response.on('error', (error) => {
                reject(`Error: ${error.message}`);
            });
        });
    });
}

// cron.schedule('*/10 * * * * *', () => {
let tweetSent = false;
// Function that retrieves the scraped data from the baseball team website
getData()
    .then(async (data) => {
        const { status, scoreOtherTeam, scoreCaneros } = data;
        console.log(status)
        console.log(scoreOtherTeam)
        console.log(scoreCaneros)
        console.log(tweetSent)

        // Check if the game is over and if the tweet hasn't been sent
        if (status == 'FINALIZADO' && !tweetSent) {

            // Validates the score and tweets the result
            // depending on the outcome of the game
            if (scoreOtherTeam < scoreCaneros) {
                try {
                    // const response = await twitterClient.v2.tweet('Si');
                    console.log('Tweet sent successfully:');
                    tweetSent = true;
                } catch (error) {
                    console.error('Failed to tweet:', error);
                }
            } else {
                try {
                    // const response = await twitterClient.v2.tweet('No');
                    console.log('Tweet sent successfully:');
                    tweetSent = true;
                } catch (error) {
                    console.error('Failed to tweet:', error);
                }
            }
        } else {

            // Sets the helper variable to false to start showing the current game data,
            // if the game has started and if the tweet has been sent already from the previous game
            if (status != 'FINALIZADO' && tweetSent) {
                tweetSent = false;
            }

            // Prints to console the status of the game if it has already
            // started and if the tweet hasn't been sent already
            if (status != 'FINALIZADO' && !tweetSent) {
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
// });