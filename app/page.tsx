import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SignOutButton from "@/components/SignOutButton";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main className="w-full">
      <h1 className="text-3xl text-center mt-6">
        الحمد لله الذي علمني ما لم أكن أعلم
      </h1>
      <div className="mt-5 p-6 bg-green-400">
        <h2 className="text-green-900">Sessions</h2>
        <pre>{JSON.stringify(session)}</pre>
      </div>
      {session ? <SignOutButton /> : <Link href={"/auth/signin"}>SignIn</Link>}
    </main>
  );
}
