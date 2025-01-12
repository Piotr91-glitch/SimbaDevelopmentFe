"use client";

import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useAuth } from "@app/lib/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RegisterForm() {
  const { user } = useAuth();
  const [registerError, setRegisterError] = useState("");
  const router = useRouter();

  // Jeśli użytkownik jest już zalogowany, przekieruj go
  if (user) {
    router.push("/user/profile");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setRegisterError("Hasła muszą się zgadzać.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const currentUser = userCredential.user;
      await sendEmailVerification(currentUser);
      router.push("/user/verify");
    } catch (error) {
      setRegisterError(error.message);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
       <Image
              src="/images/background3.jpg"
              alt="Background Image"
              layout="fill"
              objectFit="cover"
              priority
            />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg z-10 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Rejestracja</h1>
        {registerError && <p className="text-red-500 text-sm mb-4">{registerError}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Hasło
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Powtórz hasło
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Zarejestruj
        </button>
      </form>
    </div>
  );
}
