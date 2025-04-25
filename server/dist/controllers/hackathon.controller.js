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
exports.getAllHackathon = exports.toggleHackathonInterest = exports.getHackathonById = exports.getHackathonsbySearch = exports.createHackathon = void 0;
const hackathonService = __importStar(require("../services/hackathon.service"));
const createHackathon = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Authentication required" });
        }
        const hackathonData = req.body;
        const userId = req.user.id;
        const hackathon = await hackathonService.createHackathon(hackathonData, userId);
        res.status(201).json(hackathon);
    }
    catch (error) {
        console.error("Error creating hackathon:", error);
        res.status(500).json({ message: "Error creating hackathon" });
    }
};
exports.createHackathon = createHackathon;
const getHackathonsbySearch = async (req, res) => {
    try {
        const { search, location, isOnline, tag } = req.query;
        const hackathons = await hackathonService.getHackathons(search, location, isOnline === "true", tag);
        res.status(200).json(hackathons);
    }
    catch (error) {
        console.error("Error fetching hackathons:", error);
        res.status(500).json({ message: "Error fetching hackathons" });
    }
};
exports.getHackathonsbySearch = getHackathonsbySearch;
const getHackathonById = async (req, res) => {
    try {
        const { id } = req.params;
        const hackathon = await hackathonService.getHackathonById(id);
        res.status(200).json(hackathon);
    }
    catch (error) {
        if (error instanceof Error && error.message === "Hackathon not found") {
            return res.status(404).json({ message: error.message });
        }
        console.error("Error fetching hackathon:", error);
        res.status(500).json({ message: "Error fetching hackathon" });
    }
};
exports.getHackathonById = getHackathonById;
const toggleHackathonInterest = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Authentication required" });
        }
        const { id } = req.params;
        const userId = req.user.id;
        const result = await hackathonService.toggleHackathonInterest(id, userId);
        res.status(200).json(result);
    }
    catch (error) {
        if (error instanceof Error && error.message === "Hackathon not found") {
            return res.status(404).json({ message: error.message });
        }
        console.error("Error toggling hackathon interest:", error);
        res.status(500).json({ message: "Error toggling hackathon interest" });
    }
};
exports.toggleHackathonInterest = toggleHackathonInterest;
const getAllHackathon = async (req, res) => {
    try {
        const hackathons = await hackathonService.getAllHackathon();
        console.log(hackathons);
        res.status(200).json({ hackathons });
    }
    catch (error) {
        console.log(error.message);
    }
};
exports.getAllHackathon = getAllHackathon;
