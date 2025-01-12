"use client";

import { useAuth } from "@app/lib/AuthContext";
import { signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";
import Link from "next/link";

export default function Sidebar() {
  const { user } = useAuth(); // Pobieranie użytkownika z kontekstu
  const auth = getAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Wylogowanie nie powiodło się:", error);
    }
  };

  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Menu</h1>
      </div>
      <nav className="flex flex-col gap-4 p-4">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        {!user && (
          <Link href="/user/signin" className="hover:underline">
            Sign In
          </Link>
        )}
        {user && (
          <>
            <Link href="/user/profile" className="hover:underline">
              Profile
            </Link>
            <button
              onClick={handleSignOut}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Wyloguj
            </button>
          </>
        )}
      </nav>
    </div>
  );
}
