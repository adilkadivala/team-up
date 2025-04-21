"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import bodyparser from "body-parser";
const config_1 = __importDefault(require("./config"));
const subscribe_route_1 = __importDefault(require("./routes/subscribe.route"));
const hackathon_routes_1 = __importDefault(require("./routes/hackathon.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const webhook_routes_1 = __importDefault(require("./routes/webhook.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// app.use(bodyparser.json());
// routes
app.use("/", subscribe_route_1.default);
app.use("/", hackathon_routes_1.default);
app.use("/", auth_routes_1.default);
app.use("/", webhook_routes_1.default);
// default
app.get("/", (req, res) => {
    res.status(200).json({ status: "hey! server is runnning well!!" });
});
const PORT = config_1.default.port;
app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}`);
});
