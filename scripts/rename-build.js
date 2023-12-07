import fs from "node:fs";
import path from "node:path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

/// Lors du build du frontend, le dossier se situe dans
/// `/packages/frontend/dist` sauf qu'en mode production,
/// c'est le backend qui distribue les fichiers statiques.
/// 
/// On va alors déplacer le dossier `/packages/frontend/dist`
/// dans `/packages/backend/dist/public`
/// 
/// On part du principe que le backend a déjà été
/// compilé dans le dossier `/packages/backend/dist`.

const frontend_dist_path = path.join(__dirname, "..", "/packages/frontend/dist");
const backend_dist_path = path.join(__dirname, "..", "/packages/backend/dist");

// On vérifie que le dossier `frontend/dist` existe
if (!fs.existsSync(frontend_dist_path)) {
  throw new Error("Le dossier `frontend/dist` n'existe pas.");
}

// On vérifie que le dossier `backend/dist` existe
if (!fs.existsSync(backend_dist_path)) {
  throw new Error("Le dossier `backend/dist` n'existe pas.");
}

// On vérifie que le dossier `backend/dist/public` existe
if (!fs.existsSync(path.join(backend_dist_path, "public"))) {
  // On le crée s'il n'existe pas
  await fs.promises.mkdir(path.join(backend_dist_path, "public"));
}
// Sinon on le vide.
else {
  await fs.promises.rmdir(path.join(backend_dist_path, "public"), { recursive: true });
  await fs.promises.mkdir(path.join(backend_dist_path, "public"));
}

// On déplace le dossier `frontend/dist` dans `backend/dist/public`
await fs.promises.rename(frontend_dist_path, path.join(backend_dist_path, "public"));
