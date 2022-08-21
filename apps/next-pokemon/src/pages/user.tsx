import { trpc } from "../utils/trpc";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Icon } from "components/Icon";

export default function User() {
  const { data: session } = useSession();
  const currentUser = trpc.useQuery(["currentUser"]);
  const pokemon = trpc.useQuery(["pokemon"]);

  return (
    <main className="bg-slate-100 p-8 min-h-screen">
      <header className="flex items-center">
        <Link href="/">
          <h1 className="cursor-pointer text-3xl font-bold text-gray-800">
            Pokemon
          </h1>
        </Link>
        <nav className="ml-auto">
          {!session?.user && (
            <>
              <button
                onClick={() => signIn("github")}
                data-testid="signin"
                className="px-4 bg-slate-300 rounded h-full"
              >
                Sign In
              </button>
            </>
          )}
          {!!session?.user && (
            <div className="flex flex-col">
              <div className="flex items-center">
                <p className="mr-4">{session.user.name}</p>
                {session.user.image && (
                  <img
                    className="w-8 h-8 rounded-full shadow-md"
                    referrerPolicy="no-referrer"
                    src={session.user.image}
                  />
                )}
              </div>
            </div>
          )}
        </nav>
      </header>
      {!!session?.user && (
        <main>
          <header className="py-10">
            Showing {session?.user?.name}'s Pokemon
          </header>
          <main className="grid grid-flow grid-cols-12 items-stretch">
            {(currentUser.data?.pokemon ?? []).map((poke) => {
              return (
                <main className="min-h-[8rem] flex flex-col flex-wrap items-center py-8 relative">
                  <div className="relative p-4">
                    <Icon
                      className="text-green-600 absolute bottom-4 right-4"
                      name="pokeball"
                    />
                    <img src={poke.sprite} alt={poke.name} />
                  </div>
                  <p className="mt-auto">
                    <span className="text-sm font-medium leading-loose tracking-wider">
                      {poke.name}
                    </span>
                    <span className="block leading-none text-xs font-medium text-slate-700">
                      #{poke.num}
                    </span>
                  </p>
                </main>
              );
            })}
          </main>
        </main>
      )}
    </main>
  );
}
