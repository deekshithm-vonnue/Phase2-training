import http from "http";
import { server } from "./router.ts";
const hostname = "127.0.0.1";
const port = 3000;

server.listen(port, hostname, () => {
  console.log(`server running at http://${hostname}:${port}/`);
});
