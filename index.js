import express from "express";
import router from "./routes/router.js";

const PORT = process.env.PORT || 3000;
const app = express();

//router
app.use("/", router);

//server start
app.listen(PORT, () =>
  console.log(`server running on http://localhost:${PORT}`)
);
