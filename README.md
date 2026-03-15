# ⚛️ Gironde Prestige - React Edition (Estimateur Immobilier)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

Une application Single-Page (SPA) moderne conçue pour la simulation et l'estimation de biens immobiliers de prestige dans la région Bordelaise.

> 💡 **Contexte :** Ce projet est la refactorisation complète en **React** de mon [projet initial réalisé en Vanilla JS](https://github.com/msq15/gironde-prestige). L'objectif de cette migration est de démontrer ma capacité à évoluer d'une manipulation directe du DOM vers une architecture orientée composants avec un gestionnaire d'état robuste (Hooks).

🌐 **[Voir la Démo en Ligne](https://gironde-prestige-react.vercel.app/)**

---

## 🚀 Pourquoi cette migration vers React ?
Passer du Vanilla JS à React a permis d'apporter plusieurs améliorations architecturales majeures :
- **State Management prédictible :** Remplacement des lourdes manipulations du DOM (`classList.add('hidden')`) par un état local (`useState`) gérant le tunnel de conversion de manière fluide.
- **Approche Composants :** Découpage de l'immense fichier `index.html` en composants réutilisables (`Hero`, `EstimatorForm`, `Results`, `Navbar`), rendant le code plus maintenable.
- **Écosystème moderne :** Intégration de Vite pour un build ultra-rapide et configuration locale de Tailwind CSS via PostCSS.

---

## ✨ Fonctionnalités clés
- **Tunnel d'estimation interactif :** Formulaire multi-étapes conditionnel avec validation en temps réel.
- **Algorithme métier de valorisation :** Calcul dynamique du net vendeur croisant une data map (basée sur les valeurs DVF de Bordeaux), les surfaces, le type de bien et des surcotes de prestation.
- **Lead Generation Gate :** Capture d'e-mails intentionnistes simulant un vrai pipeline d'agence immobilière.
- **Génération de cartographie dynamique :** Intégration de `react-leaflet` pour le positionnement sectoriel ciblé du bien estimé.
- **UI/UX Premium :** Design responsive "Glassmorphism", micro-animations Tailwind CSS, et célébration `canvas-confetti`.

---

## 🛠️ Stack Technique
- **Core :** React 18, Vite
- **Styling :** Tailwind CSS
- **Cartographie :** Leaflet & React-Leaflet
- **Animations :** Tailwind Animations, Canvas Confetti

---

## 🧠 La logique de l'algorithme d'estimation
L'algorithme de calcul se déclenche à la fin du tunnel et se décompose ainsi :
1. **Extraction de la base :** Récupération du prix au m² moyen selon la zone sélectionnée (ex: *Triangle d'or = 6800€/m²*).
2. **Calcul Primaire :** `Prix = Surface × Prix m²`
3. **Décote Type :** Application d'un malus (-5%) s'il s'agit d'un appartement au lieu d'une maison individuelle.
4. **Surcote Prestations :** Application d'un bonus cumulatif (+5% par coche) pour les biens possédant piscine, terrasse, pierre de taille, ou parking.
5. **Génération de la Fourchette :** Définition de l'amplitude de négociation (-6% pour la fourchette basse, +6% pour la fourchette haute).

---

## 📥 Installation & Lancement (Local)

Le projet utilise Vite pour un environnement de développement ultra-rapide.

1. Clonez ce dépôt :
   ```bash
   git clone https://github.com/msq15/gironde-prestige-react.git
   ```
2. Accédez au dossier :
   ```bash
   cd gironde-prestige-react
   ```
3. Installez les dépendances :
   ```bash
   npm install
   ```
4. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```
5. Ouvrez `http://localhost:5173` dans votre navigateur.

---

## 👨‍💻 Auteur
**Mohammed Squalli Houssaini**

Étudiant en **L3 MIAGE** (Après un parcours L1/L2 Informatique pure). 
Passionné par l'écosystème web moderne et la data.
Je suis actuellement **ouvert aux opportunités en développement (Alternance / Stage)**.

🔗 [Mon profil LinkedIn](https://www.linkedin.com/in/mohammed-squalli-houssaini-miage) | 📂 [Mon GitHub](https://github.com/msq15)