import Database from 'better-sqlite3';
import path from "node:path";
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const DATABASE_PATH = path.join(__dirname, 'local.db');
const db = new Database(DATABASE_PATH);

/**
 * Should initialize the database.
 * If the database (the tables) is already initialized, it should do nothing.
 */
export const initializeDatabase = () => {
  db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username VARCHAR(48) NOT NULL UNIQUE, -- On limite la taille du nom d'utilisateur à 48 caractères.
  password TEXT NOT NULL,
  created_at DATE NOT NULL,
  updated_at DATE NOT NULL -- Date de dernière modification du compte.
);

CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(1024) NOT NULL, -- On limite la taille du titre à 1024 caractères.
  content TEXT,
  private BOOLEAN NOT NULL,
  allow_comments BOOLEAN NOT NULL,
  created_at DATE NOT NULL,
  updated_at DATE NOT NULL,
  user_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content VARCHAR(4096) NOT NULL, -- On limite la taille du contenu à 4096 caractères.
  created_at DATE NOT NULL,
  user_id INTEGER NOT NULL,
  article_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
);
  `.trim());
}

export default db;