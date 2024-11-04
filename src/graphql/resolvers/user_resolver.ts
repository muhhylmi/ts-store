import prisma from "../../utils/prisma";

export const userResolvers = {
  Query: {
    getUsers: async () => {
      const data = await prisma.user.findMany({
        include:  {
          role: true
        }
      });
      return data.map(value => {
        return {
          id: value.id,
          username:  value.username,
          role: value.role.role_name
        };
      });
    },
  },
  Mutation: {
    createUser: async (_: unknown, { username, password, roleId }: { username: string; password: string, roleId: number }) => {
      return await prisma.user.create({
        data: { username, password, roleId },
      });
    },
  },
};
