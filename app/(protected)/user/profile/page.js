'use client';
import { updateProfile } from "firebase/auth";
import { useAuth } from "@app/lib/AuthContext";
import { useState } from "react";

export default function ProfileForm() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target.displayName.value.trim();
    const photoURL = e.target.photoURL.value.trim();

    setLoading(true);
    setError(null);

    try {
      await updateProfile(user, {
        displayName,
        photoURL,
      });
      alert("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update profile. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Twój Profil</h2>
      <form onSubmit={onSubmit}>
        {error && (
          <p className="text-red-500 text-sm mb-4 border border-red-300 p-2 rounded">
            {error}
          </p>
        )}
        <div className="mb-4">
          <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
            Wyświetlana nazwa
          </label>
          <input
            id="displayName"
            name="displayName"
            defaultValue={user?.displayName || ""}
            placeholder="Wpisz swoje imię"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700">
            URL zdjęcia profilowego
          </label>
          <input
            id="photoURL"
            name="photoURL"
            defaultValue={user?.photoURL || ""}
            placeholder="Dodaj URL do zdjęcia"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            defaultValue={user?.email || ""}
            disabled
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-200 rounded-md shadow-sm sm:text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-md shadow-sm focus:outline-none hover:bg-blue-600 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Aktualizowanie..." : "Zaktualizuj profil"}
        </button>
      </form>
    </div>
  );
}
