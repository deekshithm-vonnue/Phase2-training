import app from "./app.ts";
import db from "./db.ts"
const hostname = "127.0.0.1";
const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port} wiht url http://${hostname}:${port}`);
});
