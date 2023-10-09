import { MongoClient } from "mongodb";
import "dotenv/config";

let dbConnection;
const URI = process.env.MONGO_URI;

const connectToDb = (cb) => {
    MongoClient.connect(URI)
        .then((client) => {
            dbConnection = client.db("my-portfolio");
            return cb();
        })
        .catch((err) => {
            console.log(err);
            return cb(err);
        });
};

const getDb = () => dbConnection;

export { connectToDb, getDb };
