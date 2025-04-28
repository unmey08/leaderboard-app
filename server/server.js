const app = require("./app");

app.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.API_BASE}:${process.env.PORT}`)
);
