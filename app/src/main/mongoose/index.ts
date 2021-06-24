import { MongoClient, Collection } from "mongodb";

const FILE_DB_HOST = process.env.FILE_DB_HOST as string;
const FILE_DB_DATABASE = process.env.FILE_DB_DATABASE as string;
const FILES_COLLECTION = process.env.FILES_COLLECTION as string;

if (!FILE_DB_HOST || !FILE_DB_DATABASE || !FILES_COLLECTION) {
  throw "Missing FILE_DB_HOST, FILE_DB_DATABASE, or FILES_COLLECTION environment variables.";
}

const client = new MongoClient(FILE_DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

class Mongoose {
  static FilesCollection: Collection;

  static async init() {
    const connection = await client.connect();
    const FileDB = connection.db(FILE_DB_DATABASE);
    Mongoose.FilesCollection = FileDB.collection(FILES_COLLECTION);
  }
}

Mongoose.init();
export default Mongoose;
