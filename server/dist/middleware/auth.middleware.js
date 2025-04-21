"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const prisma_1 = __importDefault(require("../prisma"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }
        const token = authHeader.split(" ")[1];
        if (authHeader.includes("clerk")) {
            const clerkUserId = req.headers["x-clerk-user-id"];
            if (!clerkUserId) {
                return res.status(401).json({ message: "Invalid Clerk token" });
            }
            const user = yield prisma_1.default.user.findUnique({
                where: { id: clerkUserId },
            });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            req.user = { id: user.id, email: user.email }; // 👈 match your AuthRequest type
            return next();
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
        if (typeof decoded !== "object" || !("userId" in decoded)) {
            return res.status(401).json({ message: "Invalid token" });
        }
        const user = yield prisma_1.default.user.findUnique({
            where: { id: decoded.userId },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = { id: user.id, email: user.email };
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
});
exports.authMiddleware = authMiddleware;
