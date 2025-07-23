import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContexts";
import {
  createUserWithEmailAndPassword,
  getIdToken,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase.init";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const getToken = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      return await getIdToken(currentUser, true);
    } else {
      return null;
    }
  };

  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // ✅ Get Firebase token (JWT)
      const token = await user.getIdToken();

      // 💾 Save token to localStorage (you’ll use this in AxiosSecure later)
      localStorage.setItem("access-token", token);

      return userCredential;
    } catch (error) {
      console.error("Login failed:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider).finally(() =>
      setLoading(false)
    );
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const SignOut = () => {
    setLoading(true);

    // ❌ Remove the JWT token from localStorage
    localStorage.removeItem("access-token");

    return signOut(auth).finally(() => setLoading(false));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        const token = await currentUser.getIdToken();
        localStorage.setItem("access-token", token);
      } else {
        localStorage.removeItem("access-token");
      }
    });

    return () => unsubscribe();
  }, []);

  const { data: userData, isLoading: roleLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/${user.email}`
      );
      return res.data;
    },
  });

  const authContextValue = {
    loading : loading || roleLoading,
    registerUser,
    signIn,
    signInWithGoogle,
    user,
    updateUserProfile,
    SignOut,
    getToken,
    userRole: userData?.role,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
