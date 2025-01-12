'use client';

import { useAuth } from "@app/lib/AuthContext";
import Image from "next/image";

export default function UserProfilePhoto() {
  const { user } = useAuth();

  if (!user) {
    return null; // Jeśli użytkownik nie jest zalogowany, nie wyświetlaj niczego
  }

  return (
    <div className="flex items-center gap-4 p-4">
      {user.photoURL ? (
        <Image
          src={user.photoURL}
          alt="Profile"
          width={48}
          height={48}
          className="rounded-full border border-gray-300"
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
          <span className="text-gray-600">No Photo</span>
        </div>
      )}
      <span className="font-medium text-gray-800">
        {user.displayName || "Anonymous"}
      </span>
    </div>
  );
}
