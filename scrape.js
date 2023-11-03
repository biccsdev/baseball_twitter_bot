import https from "https";
import * as cheerio from "cheerio";

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