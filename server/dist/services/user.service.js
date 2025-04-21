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
exports.searchUsers = exports.updateUserProfile = exports.getUserProfile = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const getUserProfile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            location: true,
            bio: true,
            avatarUrl: true,
            githubUrl: true,
            linkedinUrl: true,
            createdAt: true,
            skills: {
                include: {
                    skill: true,
                },
            },
            hackathonInterests: {
                include: {
                    hackathon: {
                        select: {
                            id: true,
                            name: true,
                            startDate: true,
                            endDate: true,
                            isOnline: true,
                            location: true,
                        },
                    },
                },
            },
        },
    });
    if (!user) {
        throw new Error("User not found");
    }
    return user;
});
exports.getUserProfile = getUserProfile;
const updateUserProfile = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { skills } = userData, userUpdateData = __rest(userData, ["skills"]);
    // Update user basic info
    const updatedUser = yield prisma_1.default.user.update({
        where: { id: userId },
        data: userUpdateData,
    });
    // If skills are provided, update them
    if (skills && Array.isArray(skills)) {
        // Delete existing skills
        yield prisma_1.default.userSkill.deleteMany({
            where: { userId },
        });
        // Add new skills
        for (const skillName of skills) {
            // Find or create skill
            const skill = yield prisma_1.default.skill.upsert({
                where: { name: skillName },
                update: {},
                create: { name: skillName },
            });
            // Create user skill connection
            yield prisma_1.default.userSkill.create({
                data: {
                    userId,
                    skillId: skill.id,
                },
            });
        }
    }
    // Get updated user with skills
    const userWithSkills = yield prisma_1.default.user.findUnique({
        where: { id: userId },
        include: {
            skills: {
                include: {
                    skill: true,
                },
            },
        },
    });
    return userWithSkills;
});
exports.updateUserProfile = updateUserProfile;
const searchUsers = (search, skills, location, hackathonId) => __awaiter(void 0, void 0, void 0, function* () {
    // Build filter conditions
    const where = {};
    if (search) {
        where.OR = [
            { name: { contains: search, mode: "insensitive" } },
            { role: { contains: search, mode: "insensitive" } },
        ];
    }
    if (skills && skills.length > 0) {
        where.skills = {
            some: {
                skill: {
                    name: { in: skills, mode: "insensitive" },
                },
            },
        };
    }
    if (location) {
        if (location === "remote") {
            where.location = { contains: "Remote", mode: "insensitive" };
        }
        else {
            where.location = { contains: location, mode: "insensitive" };
        }
    }
    if (hackathonId) {
        where.hackathonInterests = {
            some: {
                hackathonId,
            },
        };
    }
    // Get users
    const users = yield prisma_1.default.user.findMany({
        where,
        select: {
            id: true,
            name: true,
            role: true,
            location: true,
            avatarUrl: true,
            skills: {
                include: {
                    skill: true,
                },
            },
            hackathonInterests: {
                include: {
                    hackathon: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            name: "asc",
        },
    });
    return users;
});
exports.searchUsers = searchUsers;
