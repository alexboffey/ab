import NextAuth from "next-auth";
import { AppProviders } from "next-auth/providers";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../../../server/context";

export interface GoogleProfile {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  at_hash: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  locale: string;
  iat: number;
  exp: number;
}
// let useMockProvider = process.env.NODE_ENV === 'test';
const { GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OATH_CLIENT_SECRET } = process.env;
const providers: AppProviders = [];

if (!!GOOGLE_OAUTH_CLIENT_ID && !!GOOGLE_OATH_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: GOOGLE_OATH_CLIENT_SECRET,
      profile: async (p) => {
        const profile = p as GoogleProfile;
        // Find / add user from db
        const user = await prisma.user.findUnique({
          where: {
            email: profile.email,
          },
        });

        if (user) {
          return {
            id: user.id,
            email: user.email,
            image: user.img,
            name: user.name,
          };
        }

        const newUser = await prisma.user.create({
          data: {
            email: profile.email,
            name: profile.name,
            img: profile.picture,
          },
        });

        return {
          id: newUser.id,
          email: newUser.email,
          image: newUser.img,
          name: newUser.name,
        };
      },
    }),
  );
}

export default NextAuth({
  providers,
});
