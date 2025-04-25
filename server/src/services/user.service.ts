import prisma from "../prisma";

// get all users
export const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  if (!users) {
    throw new Error("users not found");
  }
  return users;
};

// get specific user
export const getUserProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
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

// update profile
export const updateUserProfile = async (userId: string, userData: any) => {
  const { skills, ...userUpdateData } = userData;

  // Update user basic info
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: userUpdateData,
  });

  // If skills are provided, update them
  if (skills && Array.isArray(skills)) {
    await prisma.userSkill.deleteMany({
      where: { userId },
    });

    // Add new skills
    for (const skillName of skills) {
      const skill = await prisma.skill.upsert({
        where: { name: skillName },
        update: {},
        create: { name: skillName },
      });

      // Create user skill connection
      await prisma.userSkill.create({
        data: {
          userId,
          skillId: skill.id,
        },
      });
    }
  }

  // Get updated user with skills
  const userWithSkills = await prisma.user.findUnique({
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

// search user
export const searchUsers = async (
  search?: string,
  skills?: string[],
  location?: string,
  hackathonId?: string
) => {
  // Build filter conditions
  const where: any = {};

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
    } else {
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
  const users = await prisma.user.findMany({
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
