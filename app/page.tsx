import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import NavBar from "@/components/home/NavBar";

import heroImg from "@/public/imgs/hero.png";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main className="w-full">
      <NavBar token={session} />

      <div className="flex flex-wrap container p-8 mx-auto mt-20">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8">
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight">
              Accompagnement des porteurs de projets
            </h1>
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
              Gérer facilement les porteurs de projets et les accompagner dans
              leur parcours.
            </p>

            <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              {session ? (
                <Link
                  href={`/${session?.user.role}`}
                  className="px-8 py-4 text-lg font-medium text-center text-white bg-sky-400 hover:bg-sky-500 transition-all rounded-md "
                >
                  Commencer
                </Link>
              ) : (
                <Link
                  href="/auth/signin"
                  className="px-8 py-4 text-lg font-medium text-center text-white bg-sky-400 hover:bg-sky-500 transition-all rounded-md "
                >
                  Se connecter
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="">
            <Image
              src={heroImg}
              width="616"
              height="617"
              className={"object-cover"}
              alt="Hero Illustration"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
