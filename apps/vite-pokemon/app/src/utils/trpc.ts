// utils/trpc.ts
import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "../../../api/src/app";

export const trpc = createReactQueryHooks<AppRouter>();
