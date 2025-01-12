"use client";

import { useState } from "react";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import Image from "next/image";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await setPersistence(auth, browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err) {
      setError("Niepoprawny email lub hasło");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      {/* Obraz w tle */}
      <Image
        src="/images/background2.jpg" 
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        className="-z-10"
        priority
      />

      {/* Formularz logowania */}
      <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Zaloguj się
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Wpisz swój email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Hasło
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Wpisz swoje hasło"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Zaloguj się
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Nie masz konta?{" "}
          <a href="/user/register" className="text-blue-500 hover:underline">
            Zarejestruj się
          </a>
        </p>
      </div>
    </div>
  );
}
