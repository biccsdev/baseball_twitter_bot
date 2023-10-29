import https from "https";

const url = 'https://cañeros.net'; // URL of the webpage to scrape

async function getData() {
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
getData()
  .then((data) => {
    const { status, scoreVisitor, scoreHome } = data;

    console.log(status);

    if (scoreVisitor < scoreHome) {
      console.log('SI');
    } else {
      console.log('NO');
    }
  })
  .catch((error) => {
    console.error(error);
  });


// import https from "https"

// const url = 'https://cañeros.net'; // URL of the webpage to scrape
// let status = ''; // Must be "FINALIZADO"
// let scoreVisitor = ''; // Score for the visitor team
// let scoreHome = ''; // Score for the local team

// async function getData() {
//   https.get(url, (response) => {
//     let data = '';

//     response.on('data', (chunk) => {
//       data += chunk;
//     });

//     response.on('end', () => {
//       status = data.substring(4488, 4498);
//       scoreVisitor = data.substring(4855, 4856);
//       scoreHome = data.substring(5247, 5248);
//     });
//   }).on('error', (error) => {
//     console.error(`Error: ${error.message}`);
//   });
// }

// await getData();

// console.log(status)

// if (scoreVisitor < scoreHome) {
//   console.log('SI');
// } else {
//   console.log('NO');
// }


