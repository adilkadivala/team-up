"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const config_1 = __importDefault(require("./config"));
const subscribe_route_1 = __importDefault(require("./routes/subscribe.route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
// routes
app.use("/", subscribe_route_1.default);
app.get("/", (req, res) => {
    res.status(200).json({ status: "hey! server is runnning well!!" });
});
const PORT = config_1.default.port;
app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}`);
});
