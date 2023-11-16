import mongoose from 'mongoose';

export const connectToDb = async () => {
    mongoose.set('strictQuery' , true);
    try {
        const db_uri = String(process.env.MONGODB_URI);
        if(!db_uri) return console.log('Mongodb uri not found');

        const { connection  } = await mongoose.connect(db_uri)
        console.log(`Server connected to ${connection.host}`)
    } catch (error) {
        console.log(`Error ${error}`)
    }
}