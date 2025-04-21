import express, { Request, Response } from "express";
import cors from "cors";
// import bodyparser from "body-parser";
import config from "./config";
import subscribeRoute from "./routes/subscribe.route";
import hackathonRoute from "./routes/hackathon.routes";
import usersRoutes from "./routes/auth.routes";
import clerkWebhook from "./routes/webhook.routes";

const app = express();

app.use(cors());
app.use(express.json());
// app.use(bodyparser.json());

// routes
app.use("/", subscribeRoute);
app.use("/", hackathonRoute);
app.use("/", usersRoutes);
app.use("/", clerkWebhook);

// default
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ status: "hey! server is runnning well!!" });
});

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`server started on http://localhost:${PORT}`);
});
