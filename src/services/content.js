// src/services/content.js
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

// pega todas trilhas ordenadas
export async function fetchTrilhas() {
  const snap = await getDocs(collection(db, "trilhas"));
  const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  return data.sort((a,b) => (a.ordem || 0) - (b.ordem || 0));
}

// pega trilha por id
export async function fetchTrilhaById(trilhaId) {
  const snap = await getDoc(doc(db, "trilhas", trilhaId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

// pega módulos dados array de ids
export async function fetchModulosByIds(modIds = []) {
  const modules = [];
  for (const id of modIds) {
    const snap = await getDoc(doc(db, "modulos", id));
    if (snap.exists()) modules.push({ id: snap.id, ...snap.data() });
  }
  return modules.sort((a,b) => (a.ordem||0) - (b.ordem||0));
}

// pega quiz
export async function fetchQuiz(quizId) {
  if (!quizId) return null;
  const snap = await getDoc(doc(db, "quizzes", quizId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}
