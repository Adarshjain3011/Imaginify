import mongoose, { Mongoose } from "mongoose";

const databaseUrl = process.env.DATABASE_URL || "";


interface MongooseConnection {

    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;

}


let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {

    cached = (global as any).mongoose = {

        conn: null,
        promise: null,
    }
}

export const connectToDatabase = async ()=>{

    if(cached.conn) return cached.conn

    if(!databaseUrl) throw new Error("missing mongodb url ");


    cached.promise = cached.promise ||  mongoose.connect(databaseUrl,{

        dbName:"imaginify",
        bufferCommands:false,

    })

    cached.conn = await cached.promise;

    return cached.conn;

}




// async function connectDatabase() {

//     try {

//         await mongoose.connect(databaseUrl)

//     } catch (error: any) {

//         console.error(`Error connecting to MongoDB: ${error.message}`);

//         throw new error("mongo db error ")
//     }
// }