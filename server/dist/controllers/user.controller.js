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
exports.searchUsers = exports.updateUserProfile = exports.getUserProfile = void 0;
const userService = __importStar(require("../services/user.service"));
const getUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserProfile(id);
        res.status(200).json(user);
    }
    catch (error) {
        if (error instanceof Error && error.message === "User not found") {
            return res.status(404).json({ message: error.message });
        }
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Error fetching user profile" });
    }
};
exports.getUserProfile = getUserProfile;
const updateUserProfile = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Authentication required" });
        }
        const userId = req.user.id;
        const userData = req.body;
        const updatedUser = await userService.updateUserProfile(userId, userData);
        res.status(200).json(updatedUser);
    }
    catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: "Error updating user profile" });
    }
};
exports.updateUserProfile = updateUserProfile;
const searchUsers = async (req, res) => {
    try {
        const { search, skills, location, hackathonId } = req.query;
        const skillsArray = skills
            ? (Array.isArray(skills) ? skills : [skills])
            : undefined;
        const users = await userService.searchUsers(search, skillsArray, location, hackathonId);
        res.status(200).json(users);
    }
    catch (error) {
        console.error("Error searching users:", error);
        res.status(500).json({ message: "Error searching users" });
    }
};
exports.searchUsers = searchUsers;
