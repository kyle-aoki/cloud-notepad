const MongoClient = require("mongodb").MongoClient;

const FILE_DB_DATABASE = process.env.FILE_DB_DATABASE;
const USER_DIR_COLLECTION = process.env.USER_DIR_COLLECTION;
const FILE_CONTENTS_COLLECTION = process.env.FILE_CONTENTS_COLLECTION;

if (!FILE_DB_DATABASE || !USER_DIR_COLLECTION || !FILE_CONTENTS_COLLECTION) {
  throw "Missing environment variables (D8E4KA).";
}

const url = "mongodb://localhost:27017";

const client = new MongoClient(url, { useUnifiedTopology: true });

client.connect(async function (err) {
  if (err) throw err;

  const filedb = client.db(FILE_DB_DATABASE);

  await filedb.createCollection(USER_DIR_COLLECTION);
  const filePaths = filedb.collection(USER_DIR_COLLECTION);
  await filePaths.createIndex("username", { unique: true });

  await filedb.createCollection(FILE_CONTENTS_COLLECTION);
  const fileContents = filedb.collection(FILE_CONTENTS_COLLECTION);
  await fileContents.createIndex("path", { unique: true });

  client.close();
});
