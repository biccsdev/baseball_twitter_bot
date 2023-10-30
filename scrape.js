import https from "https";

const url = 'https://cañeros.net'; // URL of the webpage to scrape

export async function getData() {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        const status = data.substring(4488, 4498);
        const scoreVisitor = data.substring(4855, 4856);
        const scoreHome = data.substring(5247, 5248);

        resolve({ status, scoreVisitor, scoreHome });
      });

      response.on('error', (error) => {
        reject(`Error: ${error.message}`);
      });
    });
  });
}

// Call the getData function and use the data from another file or function
// getData()
//   .then((data) => {
//     const { status, scoreVisitor, scoreHome } = data;

//     console.log(status);
//     console.log(scoreVisitor);
//     console.log(scoreHome);

//     if (status == 'FINALIZADO') {
//       if (scoreVisitor < scoreHome) {
//         console.log('SI');
//       } else {
//         console.log('NO');
//       }
//     } else {
//       console.log('El juego no ha terminado')
//     }
//   })
//   .catch((error) => {
//     console.error(error);
//   });
