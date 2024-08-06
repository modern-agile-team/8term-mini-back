const db = require("../config/db");

class Movie {
  constructor(body) {
    this.body = body;
  }
  getLists() {
    return new Promise((resolve, reject) => {
      const query = "select * from movie";
      db.query(query, async (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
}

module.exports = Movie;
