"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
// auth.service.ts
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../prisma"));
const email_service_1 = require("./email.service");
const config_1 = __importDefault(require("../config"));
// Use separate secrets for access and refresh tokens
const ACCESS_TOKEN_SECRET = config_1.default.jwtSecret;
const REFRESH_TOKEN_SECRET = config_1.default.jwtRefersh;
// Generate access and refresh tokens
const generateTokens = (user) => {
    const accessToken = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, ACCESS_TOKEN_SECRET, { expiresIn: "7d" } // Change to 15 minutes
    );
    const refreshToken = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" } // Change to 7 days
    );
    return { accessToken, refreshToken };
};
const register = async (userData) => {
    const { name, email, password } = userData;
    // Hash password
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    // Create user
    const user = await prisma_1.default.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });
    // Send welcome email
    await (0, email_service_1.sendWelcomeEmail)(email, name);
    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user);
    // Return user without password and tokens
    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, accessToken, refreshToken };
};
exports.register = register;
const login = async (credentials) => {
    const { email, password } = credentials;
    // Find user
    const user = await prisma_1.default.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new Error("Account not found");
    }
    // Check password
    if (!user?.password) {
        throw new Error("Password is missing for the user");
    }
    const passwordMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!passwordMatch) {
        throw new Error("Invalid email or password");
    }
    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user);
    // Return user without password and tokens
    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, accessToken, refreshToken };
};
exports.login = login;
