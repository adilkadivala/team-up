"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET || "teamupdefault",
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "3d",
    resendApiKey: process.env.RESEND_API_KEY,
    clerkWebhookSecret: process.env.CLERK_WEBHOOK_SECRET || "",
    clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
};
