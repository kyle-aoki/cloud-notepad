import { MongoClient, Collection } from "mongodb";

const FILE_DB_HOST = process.env.FILE_DB_HOST as string;

if (!FILE_DB_HOST) {
  throw "Missing FILE_DB_HOST.";
}

const client = new MongoClient(FILE_DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

class Mongoose {
  static User: Collection;
  static UserDir: Collection;
  static Files: Collection;

  static async initialize() {
    const connection = await client.connect();
    const CN_DB = connection.db("CN_DB");
    Mongoose.User = CN_DB.collection("User")
    Mongoose.UserDir = CN_DB.collection("UserDir");
    Mongoose.Files = CN_DB.collection("Files");
  }
}

Mongoose.initialize();

export default Mongoose;
