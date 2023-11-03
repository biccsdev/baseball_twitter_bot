import { promises as fs } from 'fs';

// Helper variable that lets us manage the state of the last sent tweet
export let tweetSent;

// Reads the state of the last sent tweet from the json file and stores it in the tweetSent variable
export async function readJsonFile() {
    try {
        const fileContent = await fs.readFile('tweetState.json', 'utf-8');
        const data = JSON.parse(fileContent);
        tweetSent = data;
    } catch (error) {
        console.error('Error reading the JSON file:', error);
    }
}

// Updates the state of the last sent tweet from the json file and stores it in the tweetSent variable 
export async function updateJsonFile() {
    try {
        const fileContent = await fs.readFile('tweetState.json', 'utf-8');
        const data = JSON.parse(fileContent);
        // Updates the "tweetSent" property
        tweetSent = !data;
        // Writes the updated data back to the JSON file
        await fs.writeFile('tweetState.json', JSON.stringify(tweetSent, null));
    } catch (error) {
        console.error('Error updating the JSON file:', error);
    }
}


