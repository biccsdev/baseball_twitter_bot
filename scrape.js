import https from "https";
import * as cheerio from "cheerio";

const url = 'https://cañeros.net'; // URL of the webpage to scrape

export async function getData() {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        const $ = cheerio.load(data);

        const status = $('.tablero th').first().text().trim();
        console.log("Status:", status);

        const scoreVisitor = $(".juegoequipoX .car").text();
        console.log("Score Visitor:", scoreVisitor);

        const scoreHome = $(".juegoequipoY .car").text();
        console.log("Score Home:", scoreHome);

        resolve({ status, scoreVisitor, scoreHome });
      });

      response.on('error', (error) => {
        reject(`Error: ${error.message}`);
      });
    });
  });
}