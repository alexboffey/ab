import { trpc } from "../utils/trpc";
import { signOut, useSession } from "next-auth/react";
import { Icon } from "components/Icon";
import { Pokemon } from "components/Pokemon";
import { Header } from "components/Header";

export default function User() {
  const { data: session } = useSession();
  const currentUser = trpc.useQuery(["currentUser"]);

  return (
    <main className="bg-slate-100 p-8 min-h-screen">
      <Header />
      {!!session?.user && (
        <main>
          <header className="py-8">
            <p className="">{session.user.name}</p>
          </header>

          <button
            className="bg-slate-200 px-4 rounded shadow-md"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </main>
      )}
    </main>
  );
}
