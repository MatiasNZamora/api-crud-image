import { connect } from 'mongoose';

export async function startConection(){
    const db = await connect('mongodb://localhost/test-gallery-db', {
        // useNewUlrParser: true
    });
    console.log('Database is connected');
};

