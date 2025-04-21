"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = exports.syncClerkUser = exports.login = exports.register = void 0;
const authService = __importStar(require("../services/auth.service"));
const prisma_1 = __importDefault(require("../prisma"));
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res
                .status(400)
                .json({ message: "Name, email, and password are required" });
        }
        const result = await authService.register({ name, email, password });
        res.status(201).json(result);
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === "User with this email already exists") {
                return res.status(400).json({ message: error.message });
            }
        }
        res.status(500).json({ message: "Error registering user" });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required" });
        }
        const result = await authService.login({ email, password });
        res.status(200).json(result);
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message === "Invalid email or password") {
                return res.status(401).json({ message: error.message });
            }
        }
        res.status(500).json({ message: "Error logging in" });
    }
};
exports.login = login;
const syncClerkUser = async (req, res) => {
    const { id, email, name, avatarUrl } = req.body;
    if (!id || !email || !name) {
        return res.status(400).json({ error: "Missing required user fields." });
    }
    try {
        const user = await prisma_1.default.user.upsert({
            where: { id },
            update: {
                email,
                name,
                avatarUrl,
            },
            create: {
                id,
                email,
                name,
                avatarUrl,
            },
        });
        res.status(200).json({ success: true, user });
    }
    catch (error) {
        console.error("Failed to sync Clerk user:", error);
        res.status(500).json({ error: "Failed to sync user." });
    }
};
exports.syncClerkUser = syncClerkUser;
const getCurrentUser = async (req, res) => {
    try {
        // @ts-ignore - assuming req.user is set by auth middleware
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user = await prisma_1.default.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                location: true,
                bio: true,
                avatarUrl: true,
                githubUrl: true,
                linkedinUrl: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error("Error fetching current user:", error);
        res.status(500).json({ message: "Error fetching user data" });
    }
};
exports.getCurrentUser = getCurrentUser;
