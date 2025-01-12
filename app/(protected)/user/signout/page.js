"use client";

import { signOut } from "firebase/auth";
import { auth } from "@app/lib/firebase"; 
import { useRouter } from "next/navigation";

export default function LogoutForm() {
  const router = useRouter();

  const onSubmit = () => {
    signOut(auth)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.error("Błąd podczas wylogowywania:", error.message);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={onSubmit}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Wyloguj
      </button>
    </div>
  );
}
