'use client';

import { useState, useEffect } from "react";
import { db } from "@app/lib/firebase"; // Import Firestore
import { collection, query, where, getDocs, orderBy } from "firebase/firestore"; // Funkcje Firestore
import { useAuth } from "@app/lib/AuthContext"; // Import kontekstu autoryzacji

export default function ArticlesPage() {
  const { user } = useAuth();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(db, "articles"),
          where("authorId", "==", user.uid), // Pobierz artykuły tylko zalogowanego użytkownika
          orderBy("createdAt", "desc") // Opcjonalnie sortuj według daty
        );

        const querySnapshot = await getDocs(q);
        const articlesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setArticles(articlesData);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Nie udało się pobrać artykułów.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [user]);

  if (loading) {
    return <p>Ładowanie artykułów...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Twoje Artykuły</h2>
      {articles.length === 0 ? (
        <p>Nie znaleziono artykułów.</p>
      ) : (
        <ul className="space-y-4">
          {articles.map((article) => (
            <li key={article.id} className="p-4 bg-white rounded shadow-md">
              <h3 className="text-xl font-bold">{article.title}</h3>
              <p className="text-gray-700">{article.content}</p>
              <small className="text-gray-500">
                Autor: {article.author || "Nieznany"} |{" "}
                {new Date(article.createdAt?.toDate()).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
