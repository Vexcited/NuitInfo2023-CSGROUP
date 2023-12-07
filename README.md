# Nuit de l'Info 2023 - CS GROUP

Un site minimaliste de publication d'articles, sur le thème de la nuit et de l'informatique.

## Intégrations

- [x] On utilise TypeScript à la place de JavaScript, pour éviter de faire tout erreur d'inattention et/ou de type.
- [x] On prépare les requêtes SQL avec des `?` et on les exécute avec les paramètres, pour éviter les injections SQL.
- [x] Cookies `httpOnly` pour éviter qu'ils soient accessible depuis le DOM avec `document.cookie`.
- [ ] On utilise `.innerText` à la place de `.innerHTML` pour afficher le contenu des commentaires. Ainsi on évite les potentielles failles XSS.
- [x] Connexion : Le mot de passe de la base de données est vérifié côté serveur, avec `bcrypt`.
- [x] Inscription : Vérification MDPs (long)
- [ ] Content-Security-Policy : On évite les injections de scripts que nous ne reconnaissons pas.
- [ ] CORS : On évite les requêtes cross-origin non autorisées.
- [ ] Comptes publique / privé -> Privé par défaut + possibilité de rendre publique des infos ou non
- [ ] Effacer son compte -> Supprimer les données
- [ ] Changer le mot de passe de son compte
- Voir ses articles
- On peut pas voir les articles des autres
- Voir les articles des autres (publiques)
- [x] On ne peut pas modifier les articles des autres utilisateurs (en modifiant l'ID de l'article dans les requêtes vers l'API)
- [ ] Rate limit sur les routes critiques (tel que l'authentification, les commentaires, ...)
- [ ] `X-Frame-Options` : Enlève la possibilité de faire des `iframe` avec la page.
- [x] [Cookie Tossing](https://book.hacktricks.xyz/pentesting-web/hacking-with-cookies/cookie-tossing) avec le préfixe [`__Host-`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#secure) pour les cookies sensibles (ex.: `token`)

## Requis

- Node.js v20

## Installation

A faire.

## Développement

A faire.
