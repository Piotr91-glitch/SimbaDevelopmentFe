'use client';

import { useAuth } from "@app/lib/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { useEffect } from "react";

export default function VerifyEmail() {
    const { user } = useAuth();

    useEffect(() => {
        const auth = getAuth();
        if (user && !user.emailVerified) {
            signOut(auth).then(() => {
                console.log("User logged out after registration.");
            }).catch((error) => {
                console.error("Error signing out:", error);
            });
        }
    }, [user]);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-semibold mb-4">Email Verification</h1>
                <p>
                    Email not verified. Please verify your email by clicking on the link
                    sent to your address: <strong>{user?.email}</strong>.
                </p>
                <p className="mt-4">
                    Once verified, you can log back in.
                </p>
            </div>
        </div>
    );
}
