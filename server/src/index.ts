import express from "express";
import cors from "cors";
import bodyparser from "body-parser";
import config from "./config";

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyparser.json());

app.get("/", (req, res) => {
  res.status(200).json({ status: "hey! server is runnning well!!" });
});

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`server started on http://localhost:${PORT}`);
});
