"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllHackathon = exports.toggleHackathonInterest = exports.getHackathonById = exports.getHackathons = exports.createHackathon = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const email_service_1 = require("../services/email.service");
const createHackathon = async (hackathonData, userId) => {
    const { name, description, startDate, endDate, location, isOnline, organizer, websiteUrl, tags, prizes, } = hackathonData;
    console.log(hackathonData);
    // Get user
    const user = await prisma_1.default.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw new Error("User not found");
    }
    // Create hackathon
    const hackathon = await prisma_1.default.hackathon.create({
        data: {
            name,
            description,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            location,
            isOnline,
            organizer,
            websiteUrl,
            createdById: userId,
            tags: {
                create: tags.map((tagName) => ({
                    tag: {
                        connectOrCreate: {
                            where: { name: tagName },
                            create: { name: tagName },
                        },
                    },
                })),
            },
            prizes: {
                create: prizes.map((prize) => ({
                    description: prize,
                })),
            },
        },
        include: {
            tags: {
                include: {
                    tag: true,
                },
            },
            prizes: true,
        },
    });
    // Send confirmation email
    await (0, email_service_1.sendHackathonCreationEmail)(user.email, name);
    return hackathon;
};
exports.createHackathon = createHackathon;
const getHackathons = async (search, location, isOnline, tagFilter) => {
    // Build filter conditions
    const where = {};
    if (search) {
        where.OR = [
            { name: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
        ];
    }
    if (location === "online") {
        where.isOnline = true;
    }
    else if (location === "in-person") {
        where.isOnline = false;
    }
    if (tagFilter) {
        where.tags = {
            some: {
                tag: {
                    name: { equals: tagFilter, mode: "insensitive" },
                },
            },
        };
    }
    // Get hackathons
    const hackathons = await prisma_1.default.hackathon.findMany({
        where,
        include: {
            tags: {
                include: {
                    tag: true,
                },
            },
            prizes: true,
            interests: true,
        },
        orderBy: {
            startDate: "asc",
        },
    });
    return hackathons;
};
exports.getHackathons = getHackathons;
const getHackathonById = async (id) => {
    const hackathon = await prisma_1.default.hackathon.findUnique({
        where: { id },
        include: {
            tags: {
                include: {
                    tag: true,
                },
            },
            prizes: true,
            interests: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            role: true,
                            avatarUrl: true,
                        },
                    },
                },
            },
            createdBy: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });
    if (!hackathon) {
        throw new Error("Hackathon not found");
    }
    return hackathon;
};
exports.getHackathonById = getHackathonById;
const toggleHackathonInterest = async (hackathonId, userId) => {
    // Check if hackathon exists
    const hackathon = await prisma_1.default.hackathon.findUnique({
        where: { id: hackathonId },
    });
    if (!hackathon) {
        throw new Error("Hackathon not found");
    }
    // Check if user already expressed interest
    const existingInterest = await prisma_1.default.userHackathonInterest.findUnique({
        where: {
            userId_hackathonId: {
                userId,
                hackathonId,
            },
        },
    });
    if (existingInterest) {
        // Remove interest
        await prisma_1.default.userHackathonInterest.delete({
            where: {
                userId_hackathonId: {
                    userId,
                    hackathonId,
                },
            },
        });
        return { interested: false };
    }
    else {
        // Add interest
        await prisma_1.default.userHackathonInterest.create({
            data: {
                userId,
                hackathonId,
            },
        });
        return { interested: true };
    }
};
exports.toggleHackathonInterest = toggleHackathonInterest;
const getAllHackathon = async () => {
    try {
        const hackathons = await prisma_1.default.hackathon.findMany();
        if (!hackathons) {
            throw new Error("hackahons not found");
        }
        return hackathons;
    }
    catch (error) {
        console.log(error.message);
    }
};
exports.getAllHackathon = getAllHackathon;
