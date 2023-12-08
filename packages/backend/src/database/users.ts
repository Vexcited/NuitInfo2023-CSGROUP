import db from "./index.js";
import bcrypt from "bcrypt";

export const createUser = async (username: string, raw_password: string) => {
  // On vérifie si l'utilisateur existe déjà.
  const user = await getUser(username);
  if (user) {
    throw new Error("L'utilisateur existe déjà.");
  }

  const encrypted_password = await bcrypt.hash(raw_password, 10);

  const results = db
    .prepare("INSERT INTO users (username, password, created_at, updated_at) VALUES (?, ?, ?, ?)")
    .run(username, encrypted_password, new Date().toISOString(), new Date().toISOString());

  if (results.changes === 0) {
    throw new Error("L'utilisateur n'a pas été crée.");
  }

  return results.lastInsertRowid;
};

export interface User {
  id: number;
  username: string;
  password: string;
  created_at: string;
  updated_at: string;
}

export const getUser = async (username: string) => {
  const user = db
    // On prépare la requête, pour éviter les injections SQL.
    .prepare("SELECT * FROM users WHERE username = ?")
    .get(username) as User | undefined;

  return user;
}
