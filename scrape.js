import https from "https"

const url = 'https://cañeros.net'; // URL of the webpage to scrape
let status = ''; // Must be "FINALIZADO"
let scoreVisitor = ''; // Score for the visitor team
let scoreHome = ''; // Score for the local team

https.get(url, (response) => {
  let data = '';

  response.on('data', (chunk) => {
    data += chunk;
  });

  response.on('end', () => {

    status = data.substring(4488, 4498);
    scoreVisitor = data.substring(4855, 4856);
    scoreHome = data.substring(5247, 5248);

    // console.log(status);
    // console.log(scoreVisitor);
    // console.log(scoreHome);
  });
}).on('error', (error) => {
  console.error(`Error: ${error.message}`);
});

console.log(status);
console.log(scoreVisitor);
console.log(scoreHome);

if (scoreVisitor < scoreHome) {
  console.log('SI');
} else {
  console.log('NO');
}