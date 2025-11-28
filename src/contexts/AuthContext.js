import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

const USER_KEY = "@user"; // chave usada pra guardar o usuário logado

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || "",
        };

        setUser(userData);

        // salva só a info de login, NUNCA o progresso
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
      } else {
        setUser(null);
        await AsyncStorage.removeItem(USER_KEY); // remove só o user
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

 const logout = async () => {
  await AsyncStorage.removeItem("progress");
  await AsyncStorage.removeItem("streak");
  await signOut(auth);
  setUser(null);
};

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
