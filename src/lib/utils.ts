import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AuthState } from "./types";
import { redirect } from "@tanstack/react-router";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function redirectIfNotAuthenticated() {
  const LOCAL_STORAGE_AUTH_KEY = import.meta.env
    .LOCAL_STORAGE_AUTH_KEY as string;
  const storedAuth = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);

  let authData: AuthState | null = null;

  if (storedAuth) {
    try {
      authData = JSON.parse(storedAuth) as AuthState;
    } catch (e) {
      console.error("Failed to parse auth data", e);
    }
  }

  if (authData?.isAuthenticated) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect({
      to: "/",
      replace: true,
    });
  }
}
