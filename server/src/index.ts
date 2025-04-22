import express, { Request, Response } from "express";
import cors from "cors";
import config from "./config";
import subscribeRoute from "./routes/subscribe.route";
import hackathonRoute from "./routes/hackathon.routes";
import usersRoutes from "./routes/auth.routes";

const app = express();

const corsOpt = {
  origin: config.clientUrl,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOpt));
app.use(express.json());

// routes
app.use("/", subscribeRoute);
app.use("/", hackathonRoute);
app.use("/", usersRoutes);

// default
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ status: "hey! server is runnning well!!" });
});

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`server started on http://localhost:${PORT}`);
});
