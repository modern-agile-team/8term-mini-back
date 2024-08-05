"use strict";

const app = require("../app");

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`${PORT}번 포트에서 대기 중`);
});
