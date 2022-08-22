import { trpc } from "../utils/trpc";
import { signIn, useSession, signOut } from "next-auth/react";
import Link from "next/link";

export const Header = () => {
  const { data: session } = useSession();
  trpc.useQuery(["currentUser"]);

  return (
    <header className="w-full flex items-center">
      <Link href="/">
        <h1 className="text-3xl cursor-pointer font-bold text-gray-800 mr-auto">
          Pokemon
        </h1>
      </Link>
      {!session?.user && <button onClick={() => signIn()}>Sign In</button>}
      {session?.user && (
        <div className="flex items-center cursor-pointer">
          <>
            <p className="mr-4">{session?.user.name}</p>
            {session?.user.image && (
              <img
                className="w-8 h-8 rounded-full shadow-md"
                referrerPolicy="no-referrer"
                src={session.user.image}
              />
            )}
            <button
              className="bg-slate-200 px-4 rounded shadow-md ml-4 text-sm"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </>
        </div>
      )}
    </header>
  );
};
