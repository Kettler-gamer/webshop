import "dotenv/config";
import express from "express";
import router from "./src/routes/router.js";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "50mb" }));
app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Started listening on port ${process.env.PORT}`);
});
