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
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const authService = __importStar(require("../services/auth.service"));
const register = async (req, res) => {
    console.log("hitte register");
    try {
        const { name, email, password = "teamup" } = req.body;
        console.log(req.body);
        if (!name || !email) {
            return res.status(400).json({ message: "Name, and email are required" });
        }
        const result = await authService.register({ name, email, password });
        res.status(200).json(result);
    }
    catch (error) {
        if (error.message === "User with this email already exists") {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: { message: error.message } });
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
