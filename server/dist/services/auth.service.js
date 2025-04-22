"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../prisma"));
const email_service_1 = require("./email.service");
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
    // Generate JWT token
    const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, "secret", {
        expiresIn: "2d",
    });
    // Return user without password and token
    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
};
exports.register = register;
const login = async (credentials) => {
    const { email, password } = credentials;
    // Find user
    const user = await prisma_1.default.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new Error("Invalid email or password");
    }
    // Check password
    if (!user.password) {
        throw new Error("Password is missing for the user");
    }
    const passwordMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!passwordMatch) {
        throw new Error("Invalid email or password");
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, "secret", {
        expiresIn: "2d",
    });
    // Return user without password and token
    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
};
exports.login = login;
