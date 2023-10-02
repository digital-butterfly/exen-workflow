# Next Auth

## Steps

1. create next app

   ```bash
   npx create-next-app@latest
   ```

1. install next auth package

   ```bash
   npm i next-auth
   ```

1. initialize NextAuth.ts in `/app/api/auth/[...nextauth]/route.ts`

   ```ts
   import NextAuth from "next-auth";
   import { options } from "./options";

   const handler = NextAuth(options);

   export { handler as GET, handler as POST };
   ```

1. create other file for option in `/app/api/auth/[...nextauth]/options.ts`

   ```ts
   import type { NextAuthOptions } from "next-auth";

   export const options: NextAuthOptions = {
     providers: [],
   };
   ```

1. create file in the root folder called `.env.local`

   - generate a secret key using terminal (if it doesn't work just skip this step)

   ```bash
    openssl rand -base64 32
   ```

   - add it to your `.env.local` file

   ```env
    NEXTAUTH_SECRET=myRandomValue
   ```

1. protect your routes (you can choose one of three ways)

   - create a file named `middleware.ts` in the same level of `/app` folder

   ```ts
   // Without a defined matcher, this one line applies next-aut to the entire project
   export { default } from "next-auth/middleware";

   // Applies next-auth only to matching routes - can be regex
   // Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
   export const config = { matcher: ["/extra", "/dashboard"] };
   ```

   - redirect the user based on the session info

   ```tsx
   import { options } from "./api/auth/[...nextauth]/options";
   import { getServerSession } from "next-auth/next";
   import { redirect } from "next/navigation";

   export default async function ServerPage() {
     const session = await getServerSession(options);

     if (!session) {
       redirect("/api/auth/signin?callbackUrl=/server");
     }

     return <>...</>;
   }
   ```

   - don't show the protected content bases on session info

   ```tsx
   import {options} from "./api/auth/[...nextauth]/options"
   import {getServerSession} from "next-auth/next"
   import UserCard from "./components/UserCard"

   export default async function Home() {
       const session = await getServerSession(options)

       return (
           <>
               {session ? (
                   <UserCard user={session?.user} pagetype={"Home"} >
               ): (
                   <h1 claName="text-5xl">You Shall Not Pass!</h1>
               )}
           </UserCard>
       )
   }
   ```

1. if you want to get session info in client components (not desired) you should add the AuthProvider to the layout

   - create AuthProvider component

   ```tsx
   "use client";

   import { SessionProvider } from "next-auth/react";

   export default function AuthProvider({ children }) {
     return <SessionProvider>{children}</SessionProvider>;
   }
   ```

   - import it in main layout

   ```tsx
   import AuthProvider from "./context/AuthProvider";

   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           <AuthProvider>{children}</AuthProvider>
         </body>
       </html>
     );
   }
   ```

   - example of using the session in client component

   ```tsx
   "use client";
   // Remember you must use an AuthProvider for client component to useSession
   import { useSession } from "next-auth/react";
   import { redirect } from "next/navigation";

   export default function ClientPage() {
     const { data: session } = useSession({
       required: true,
       onUnauthenticated() {
         redirect("/api/auth/signin?callbackUrl=/client");
       },
     });

     return <>...</>;
   }
   ```

1. if you want to get the avatar image for signed in user (for example from github) you should edit your `next.config.js` file

```js
/**@type {import('next').NextConfig}*/
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusecontent.com",
        port: "",
        pathname: "/u/**",
      },
    ],
  },
};
module.exports = nextConfig;
```
