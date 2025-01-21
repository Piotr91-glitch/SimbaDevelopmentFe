'use client';

import { updateProfile } from "firebase/auth";
import { useAuth } from "@app/lib/AuthContext";
import { useState, useEffect } from "react";
import { db } from "@app/lib/firebase"; // Import bazy danych Firestore
import { getDoc, doc, setDoc } from "firebase/firestore"; // Funkcje Firestore
import { useForm } from "react-hook-form"; // Import React Hook Form

export default function ProfileForm() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: user?.email || "",
      displayName: user?.displayName || "",
      photoURL: user?.photoURL || "",
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const snapshot = await getDoc(doc(db, "users", user?.uid));
          if (snapshot.exists()) {
            const address = snapshot.data().address || {};
            setValue("city", address.city || "");
            setValue("street", address.street || "");
            setValue("zipCode", address.zipCode || "");
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      }
    };

    fetchUserData();
  }, [user, setValue]);

  const onSubmit = async (data) => {
    const { displayName, photoURL, city, street, zipCode } = data;

    setLoading(true);
    setError(null);

    try {
      // Aktualizacja danych profilu użytkownika w Firebase Authentication
      await updateProfile(user, {
        displayName,
        photoURL,
      });

      // Zapis dodatkowych danych (adres) do Firestore
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, {
        address: {
          city,
          street,
          zipCode,
        },
      }, { merge: true });

      alert("Profile and address updated successfully!");
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
      <form onSubmit={handleSubmit(onSubmit)}>
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
            {...register("displayName")}
            className="mt-1 block w-full px-3 py-2 border bg-black rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700">
            URL zdjęcia profilowego
          </label>
          <input
            id="photoURL"
            {...register("photoURL")}
            className="mt-1 block w-full px-3 py-2 border bg-black rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            disabled
            {...register("email")}
            className="mt-1 block w-full px-3 py-2 border bg-black rounded-md shadow-sm sm:text-sm"
          />
        </div>
        {/* Nowe pola adresowe */}
        <div className="mb-4">
          <label htmlFor="street" className="block text-sm font-medium text-gray-700">
            Ulica
          </label>
          <input
            id="street"
            {...register("street")}
            className="mt-1 block w-full px-3 py-2 border bg-black rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            Miasto
          </label>
          <input
            id="city"
            {...register("city")}
            className="mt-1 block w-full px-3 py-2 border bg-black rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
            Kod pocztowy
          </label>
          <input
            id="zipCode"
            {...register("zipCode")}
            className="mt-1 block w-full px-3 py-2 border bg-black rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
