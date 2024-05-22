import app from './app';
import { startConection } from './database';

async function main() {
    startConection();

    await app.listen(app.get('port'));
    console.log('Server is running on port', app.get('port'));

};

main();