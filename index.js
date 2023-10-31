import { getData } from "./scrape.js";
import { twitterClient } from "./twitterConfig.js";
import cron from 'node-cron';

cron.schedule('*/5 * * * *', () => {
    getData()
        .then(async (data) => {
            const { status, scoreVisitor, scoreHome } = data;

            if (status == 'FINALIZADO') {
                if (scoreVisitor < scoreHome) {
                    try {
                        const response = await twitterClient.v2.tweet('Si');
                        console.log('Tweet sent successfully:', response);
                        process.exit(0);
                    } catch (error) {
                        console.error('Failed to tweet:', error);
                    }
                } else {
                    try {
                        const response = await twitterClient.v2.tweet('No');
                        console.log('Tweet sent successfully:', response);
                        process.exit(0);
                    } catch (error) {
                        console.error('Failed to tweet:', error);
                    }
                }
            } else {
                console.log('El juego no ha terminado')
            }
        })
        .catch((error) => {
            console.error(error);
        });
});





