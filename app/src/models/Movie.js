const db = require("../config/db");

class Movie {
  constructor(body) {
    this.body = body;
  }
  getLists() {
    const query = "select * from movie";
    db.query(query, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json(data);
    });
  }
}
