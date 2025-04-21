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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../prisma"));
const email_service_1 = require("./email.service");
const register = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = userData;
    // Check if user already exists
    const existingUser = yield prisma_1.default.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        throw new Error("User with this email already exists");
    }
    // Hash password
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    // Create user
    const user = yield prisma_1.default.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });
    // Send welcome email
    yield (0, email_service_1.sendWelcomeEmail)(email, name);
    // Generate JWT token
    const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, "secret", {
        expiresIn: "2d",
    });
    // Return user without password and token
    const { password: _ } = user, userWithoutPassword = __rest(user, ["password"]);
    return { user: userWithoutPassword, token };
});
exports.register = register;
const login = (credentials) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = credentials;
    // Find user
    const user = yield prisma_1.default.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new Error("Invalid email or password");
    }
    // Check password
    if (!user.password) {
        throw new Error("Password is missing for the user");
    }
    const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordMatch) {
        throw new Error("Invalid email or password");
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, "secret", {
        expiresIn: "2d",
    });
    // Return user without password and token
    const { password: _ } = user, userWithoutPassword = __rest(user, ["password"]);
    return { user: userWithoutPassword, token };
});
exports.login = login;
