import NextAuth from "next-auth";
import { AppProviders } from "next-auth/providers";
import GoogleProvider from "next-auth/providers/google";

// import CredentialsProvider from 'next-auth/providers/credentials';

// let useMockProvider = process.env.NODE_ENV === 'test';
const {
  // GITHUB_CLIENT_ID,
  // GITHUB_SECRET,
  // NODE_ENV,
  // APP_ENV,
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OATH_CLIENT_SECRET,
} = process.env;
const providers: AppProviders = [];

if (!!GOOGLE_OAUTH_CLIENT_ID && !!GOOGLE_OATH_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: GOOGLE_OATH_CLIENT_SECRET,
    }),
  );
}

// if (
//   (NODE_ENV !== 'production' || APP_ENV === 'test') &&
//   (!GITHUB_CLIENT_ID || !GITHUB_SECRET)
// ) {
//   console.log('⚠️ Using mocked GitHub auth correct credentials were not added');
//   useMockProvider = true;
// }

// if (useMockProvider) {
//   providers.push(
//     CredentialsProvider({
//       id: 'github',
//       name: 'Mocked GitHub',
//       async authorize(credentials) {
//         const user = {
//           id: credentials?.name,
//           name: credentials?.name,
//           email: credentials?.name,
//         };
//         return user;
//       },
//       credentials: {
//         name: { type: 'test' },
//       },
//     }),
//   );
// } else {
//   if (!GITHUB_CLIENT_ID || !GITHUB_SECRET) {
//     throw new Error('GITHUB_CLIENT_ID and GITHUB_SECRET must be set');
//   }
//   providers.push(
//     GithubProvider({
//       clientId: GITHUB_CLIENT_ID,
//       clientSecret: GITHUB_SECRET,
//       profile(profile) {
//         return {
//           id: profile.id,
//           name: profile.login,
//           email: profile.email,
//           image: profile.avatar_url,
//         } as any;
//       },
//     }),
//   );
// }

export default NextAuth({
  providers,
});
