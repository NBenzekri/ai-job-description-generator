import { User, getServerSession } from "next-auth";
import { JWT } from "next-auth/jwt";

interface Session {
  session: {
    user: User;
  };
  token: JWT;
}

export const session = async ({ session, token }: Session) => {
  session.user.id = token.id as string;
  return session;
};

export const getUserSession = async (): Promise<User | undefined> => {
  const authUserSession = await getServerSession({
    callbacks: {
      session,
    },
  });
  return authUserSession?.user;
};
