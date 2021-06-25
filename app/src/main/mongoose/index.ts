import { MongoClient, Collection } from "mongodb";

const FILE_DB_HOST = process.env.FILE_DB_HOST as string;
const FILE_DB_DATABASE = process.env.FILE_DB_DATABASE as string;
const USER_DIR_COLLECTION = process.env.USER_DIR_COLLECTION as string;
const FILE_CONTENTS_COLLECTION = process.env.FILE_CONTENTS_COLLECTION as string;

if (!FILE_DB_HOST || !FILE_DB_DATABASE || !USER_DIR_COLLECTION || !FILE_CONTENTS_COLLECTION) {
  throw "Missing FILE_DB_HOST, FILE_DB_DATABASE, FILE_PATHS_COLLECTION, or FILE_CONTENTS_COLLECTION environment variables.";
}

const client = new MongoClient(FILE_DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

class Mongoose {
  static UserDir: Collection;
  static FileContents: Collection;

  static async init() {
    const connection = await client.connect();
    const FileDB = connection.db(FILE_DB_DATABASE);
    Mongoose.UserDir = FileDB.collection(USER_DIR_COLLECTION);
    Mongoose.FileContents = FileDB.collection(FILE_CONTENTS_COLLECTION);
  }
}

Mongoose.init();

export default Mongoose;
