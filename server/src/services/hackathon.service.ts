import prisma from "../prisma";
import { HackathonInput } from "../types";
import { sendHackathonCreationEmail } from "../services/email.service";

export const createHackathon = async (
  hackathonData: HackathonInput,
  userId: string
) => {
  const {
    name,
    description,
    startDate,
    endDate,
    location,
    isOnline,
    organizer,
    websiteUrl,
    tags,
    prizes,
  } = hackathonData;

  // Get user
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Create hackathon
  const hackathon = await prisma.hackathon.create({
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
        create: tags.map((tagName: string) => ({
          tag: {
            connectOrCreate: {
              where: { name: tagName },
              create: { name: tagName },
            },
          },
        })),
      },
      prizes: {
        create: prizes.map((prize: string) => ({
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
  await sendHackathonCreationEmail(user.email, name);

  return hackathon;
};

export const getHackathons = async (
  search?: string,
  location?: string,
  isOnline?: boolean,
  tagFilter?: string
) => {
  // Build filter conditions
  const where: any = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  if (location === "online") {
    where.isOnline = true;
  } else if (location === "in-person") {
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
  const hackathons = await prisma.hackathon.findMany({
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

export const getHackathonById = async (id: string) => {
  const hackathon = await prisma.hackathon.findUnique({
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

export const toggleHackathonInterest = async (
  hackathonId: string,
  userId: string
) => {
  // Check if hackathon exists
  const hackathon = await prisma.hackathon.findUnique({
    where: { id: hackathonId },
  });

  if (!hackathon) {
    throw new Error("Hackathon not found");
  }

  // Check if user already expressed interest
  const existingInterest = await prisma.userHackathonInterest.findUnique({
    where: {
      userId_hackathonId: {
        userId,
        hackathonId,
      },
    },
  });

  if (existingInterest) {
    // Remove interest
    await prisma.userHackathonInterest.delete({
      where: {
        userId_hackathonId: {
          userId,
          hackathonId,
        },
      },
    });
    return { interested: false };
  } else {
    // Add interest
    await prisma.userHackathonInterest.create({
      data: {
        userId,
        hackathonId,
      },
    });
    return { interested: true };
  }
};
