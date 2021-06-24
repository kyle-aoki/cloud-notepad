import { MongoClient, Collection } from "mongodb";

const FILE_DB_HOST = process.env.FILE_DB_HOST;
const FILE_DB_DATABASE = process.env.FILE_DB_DATABASE;

if (!FILE_DB_HOST || !FILE_DB_DATABASE) {
  throw "Missing FILE_DB_HOST or FILE_DB_DATABASE environment variables.";
}

const client = new MongoClient(FILE_DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

class Mongoose {
  static FilesCollection: Collection;

  static async init() {
    const connection = await client.connect();
    const FileDB = connection.db("file-db");
    Mongoose.FilesCollection = FileDB.collection("files");
  }
}

Mongoose.init();
export default Mongoose;
