'use client';

import { useAuth } from "@app/lib/AuthContext";
import { useEffect } from "react"; // Zmieniono na useEffect
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";

function Protected({ children }) {
  const { user } = useAuth();
  const returnUrl = usePathname();

  useEffect(() => {
    if (!user) {
      redirect(`/user/signin?returnUrl=${returnUrl}`); // Poprawiona literówka
    }
  }, [user, returnUrl]);

  return <>{children}</>;
}

export default Protected;
