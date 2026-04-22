# Drink with Zay

Site personnel autour de ma passion pour les boissons artisanales — matcha, café, bubble tea.

🌐 **[drinkwith-zayy.vercel.app](https://drinkwith-zayy.vercel.app)**

---

## Ce que propose le site

- **Roue des boissons** — une roue aléatoire par catégorie pour choisir sa prochaine boisson
- **Recettes** — toutes les recettes détaillées avec temps de préparation, niveau de difficulté et variantes chaud/glacé
- **Dégustations** — un journal des coffee shops testés, notés par Zay et Kouceyla
- **Favoris** — sauvegarde des boissons préférées en local (localStorage)
- **Recherche** — filtre les recettes par nom en temps réel
- **PWA** — installable sur mobile comme une vraie application

---

## Stack technique

| Outil | Rôle |
|---|---|
| React 18 + Vite | Framework et bundler |
| Tailwind CSS | Styles utilitaires |
| Framer Motion | Animations |
| react-router-dom v6 | Navigation |
| vite-plugin-pwa | Service worker + manifest |
| Vercel | Hébergement + CI/CD |

---

## Lancer le projet en local

```bash
npm install
npm run dev
```

Le site est accessible sur `http://localhost:5173`.

---

## Déploiement

Le déploiement est automatique via Vercel. Un `git push` sur la branche `main` suffit à mettre à jour le site en production.
