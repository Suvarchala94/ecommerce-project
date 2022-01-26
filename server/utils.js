const fs = require("fs");
const path = require("path");
const dbfp = path.join(__dirname, "db.json");
exports.readDB = async () => {
  return new Promise((resolve, reject) => {
    fs.readFile(dbfp, "utf8", (err, db) => {
      if (err) return reject(err);

      return resolve(JSON.parse(db));
    });
  });
};


exports.writeDB = async (obj) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(dbfp, JSON.stringify(obj, null, 2), (err) => {
      if (err) return reject(err);

      return resolve(obj);
    });
  });
};
