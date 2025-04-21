"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchUsers = exports.updateUserProfile = exports.getUserProfile = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const getUserProfile = async (userId) => {
    const user = await prisma_1.default.user.findUnique({
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
};
exports.getUserProfile = getUserProfile;
const updateUserProfile = async (userId, userData) => {
    const { skills, ...userUpdateData } = userData;
    // Update user basic info
    const updatedUser = await prisma_1.default.user.update({
        where: { id: userId },
        data: userUpdateData,
    });
    // If skills are provided, update them
    if (skills && Array.isArray(skills)) {
        // Delete existing skills
        await prisma_1.default.userSkill.deleteMany({
            where: { userId },
        });
        // Add new skills
        for (const skillName of skills) {
            // Find or create skill
            const skill = await prisma_1.default.skill.upsert({
                where: { name: skillName },
                update: {},
                create: { name: skillName },
            });
            // Create user skill connection
            await prisma_1.default.userSkill.create({
                data: {
                    userId,
                    skillId: skill.id,
                },
            });
        }
    }
    // Get updated user with skills
    const userWithSkills = await prisma_1.default.user.findUnique({
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
};
exports.updateUserProfile = updateUserProfile;
const searchUsers = async (search, skills, location, hackathonId) => {
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
    const users = await prisma_1.default.user.findMany({
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
};
exports.searchUsers = searchUsers;
