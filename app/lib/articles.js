import { db } from "@app/lib/firebase";
import { addDoc, collection } from "firebase/firestore";

export const addArticle = async (title, content, user) => {
  try {
    await addDoc(collection(db, "articles"), {
      title,
      content,
      date: new Date(),
      user: user.uid, // UID użytkownika jako string
    });
    console.log("Artykuł dodany!");
  } catch (error) {
    console.error("Błąd podczas dodawania artykułu:", error);
  }
};
