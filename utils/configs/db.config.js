import mongodb from "mongodb";
const MongoClient = mongodb.MongoClient;

const dbURL = "mongodb+srv://abhushit:abhushit@cluster0.tofdisz.mongodb.net/?retryWrites=true&w=majority";

// const dbURL = "mongodb+srv://yourstayio:0VvTDdppaidsSu17@cluster0.jcab7ph.mongodb.net/test";

export default {
    mongodb,
    MongoClient,
    dbURL
}