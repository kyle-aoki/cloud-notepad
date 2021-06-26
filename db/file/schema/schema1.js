const MongoClient = require("mongodb").MongoClient;

const FILE_DB_DATABASE = process.env.FILE_DB_DATABASE;
const USER_DIR_COLLECTION = process.env.USER_DIR_COLLECTION;
const FILES_COLLECTION = process.env.FILES_COLLECTION;

if (!FILE_DB_DATABASE || !USER_DIR_COLLECTION || !FILES_COLLECTION) {
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

  await filedb.createCollection(FILES_COLLECTION);
  const files = filedb.collection(FILES_COLLECTION);
  await files.createIndex("path", { unique: true });

  client.close();
});
