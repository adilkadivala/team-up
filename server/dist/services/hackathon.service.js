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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleHackathonInterest = exports.getHackathonById = exports.getHackathons = exports.createHackathon = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const email_service_1 = require("../services/email.service");
const createHackathon = (hackathonData, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, startDate, endDate, location, isOnline, organizer, websiteUrl, tags, prizes, } = hackathonData;
    // Get user
    const user = yield prisma_1.default.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw new Error("User not found");
    }
    // Create hackathon
    const hackathon = yield prisma_1.default.hackathon.create({
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
    yield (0, email_service_1.sendHackathonCreationEmail)(user.email, name);
    return hackathon;
});
exports.createHackathon = createHackathon;
const getHackathons = (search, location, isOnline, tagFilter) => __awaiter(void 0, void 0, void 0, function* () {
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
    const hackathons = yield prisma_1.default.hackathon.findMany({
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
});
exports.getHackathons = getHackathons;
const getHackathonById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const hackathon = yield prisma_1.default.hackathon.findUnique({
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
});
exports.getHackathonById = getHackathonById;
const toggleHackathonInterest = (hackathonId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if hackathon exists
    const hackathon = yield prisma_1.default.hackathon.findUnique({
        where: { id: hackathonId },
    });
    if (!hackathon) {
        throw new Error("Hackathon not found");
    }
    // Check if user already expressed interest
    const existingInterest = yield prisma_1.default.userHackathonInterest.findUnique({
        where: {
            userId_hackathonId: {
                userId,
                hackathonId,
            },
        },
    });
    if (existingInterest) {
        // Remove interest
        yield prisma_1.default.userHackathonInterest.delete({
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
        yield prisma_1.default.userHackathonInterest.create({
            data: {
                userId,
                hackathonId,
            },
        });
        return { interested: true };
    }
});
exports.toggleHackathonInterest = toggleHackathonInterest;
