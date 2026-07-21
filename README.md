# Mirabell Stream

Mirabell Stream est un prototype frontend de plateforme de streaming documentaire, réalisé dans le cadre d’un test technique. L’application rassemble deux espaces : une interface publique pour découvrir et regarder des contenus ainsi qu'un dashboard d’administration pour suivre l’activité de la plateforme.

L’idée n’était pas de donner l’illusion d’un produit déjà prêt pour la production mais de construire une première version crédible, agréable à parcourir et techniquement propre. J’ai donc porté une attention particulière au responsive, à l’accessibilité, aux performances et à la clarté du code.

## Ce que propose l’application

### Côté plateforme de streaming

- une page d’accueil avec un contenu mis en avant et plusieurs sélections thématiques,
- un catalogue avec recherche textuelle, filtres par catégorie et recherche synchronisée avec l’URL,
- la lecture d’extraits vidéo dans une fenêtre modale,
- la mémorisation locale de la progression et la reprise de lecture,
- un indicateur de progression sur les contenus déjà consultés,
- un thème clair pour le dashboard, un thème sombre pour la plateforme ainsi qu’une page 404 dédiée.

### Côté administration

- des indicateurs synthétiques sur l’activité de la plateforme,
- une vue de l’évolution de l’audience et du temps de visionnage,
- la répartition des consultations par catégorie,
- un classement des contenus avec leurs statuts et leurs tendances,
- un aperçu des activités récentes,
- une présentation pensée aussi bien pour les écrans desktop que pour le mobile.

## Choix techniques

Le projet repose sur **React**, **TypeScript** et **Vite**. **React Router** gère la navigation, **Tailwind CSS** l’intégration, **Recharts** les graphiques et **Lucide React** les icônes. ESLint et Prettier complètent l’environnement de développement.

Les contenus, catégories et données analytiques sont simulés localement. Ils restent toutefois typés et séparés des composants afin de conserver une structure proche de celle que pourrait utiliser une application connectée à une API.

Le dashboard est chargé à la demande grâce aux routes différées de React Router. Recharts et les composants analytiques ne viennent donc pas alourdir le chargement initial de la partie publique.

## Quelques arbitrages

- **Des médias locaux pour un rendu fiable.** Les images et vidéos sont intégrées au projet afin que l’application reste stable pendant l’évaluation, sans dépendre d’un service tiers. Les miniatures sont optimisées en WebP, les images non prioritaires sont chargées de manière différée et leurs dimensions sont déclarées.
- **De vrais extraits plutôt que de fausses interactions.** Les durées affichées correspondent aux contenus fictifs complets mais chaque vidéo dispose d’un court extrait optimisé pour le web. Cela permet de proposer une expérience de lecture fonctionnelle sans transformer le dépôt en bibliothèque vidéo. L’interface précise clairement qu’il s’agit d’extraits de démonstration.
- **Une reprise de lecture sans backend.** La progression est enregistrée dans `localStorage`. Ce choix suffit à rendre le parcours crédible dans le cadre d’un prototype frontend tout en évitant d’ajouter une infrastructure sans rapport direct avec l’exercice.
- **Des statistiques simulées mais crédibles.** Le dashboard utilise un jeu de données statiques. La mention « Page actualisée » indique donc le moment où l’interface a été chargée et non une synchronisation avec un service distant.
- **Une vraie adaptation mobile.** Les informations restent disponibles sur petit écran mais leur hiérarchie change. Le tableau de performances devient par exemple une série de cartes, plus simple à lire et à manipuler sur mobile.

## Les principaux défis

Le premier enjeu a été de faire cohabiter deux espaces assez différents : une plateforme éditoriale et un outil d’administration, tout en gardant une identité commune et une navigation cohérente.

Le dashboard demandait aussi un travail particulier sur mobile : les graphiques et tableaux devaient rester lisibles sans simplement réduire leur version desktop. Les contrastes des séries, des tendances et des informations secondaires ont également été ajustés pour préserver à la fois l’identité visuelle et l’accessibilité.

Recharts représente une part importante du JavaScript. Le chargement différé de la branche administrative permet de ne faire supporter ce coût qu’aux personnes qui ouvrent réellement le dashboard.

## Qualité et validation

Les parcours principaux ont été testés sur mobile, tablette et ordinateur. Une attention spécifique a été portée à la navigation au clavier, au focus visible, aux libellés accessibles et aux contrastes y compris dans les graphiques.

- **100 % au score Lighthouse Accessibilité** sur les pages contrôlées ;
- aucune erreur, aucun avertissement React et aucune requête en échec sur les parcours testés ;
- validations ESLint, TypeScript, Prettier et Knip réussies ;
- build de production généré sans erreur.

## Ce que j’ajouterais ensuite

Avec davantage de temps, la suite logique serait d’intégrer une authentification avec gestion des rôles, une API, une base de données et un véritable outil de gestion des contenus. La progression de lecture pourrait alors être associée au compte utilisateur et synchronisée entre plusieurs appareils.

Le dashboard gagnerait également à être relié à une source analytique réelle, avec des états de chargement, d’erreur et de données obsolètes. Pour les médias, une pipeline automatisée pourrait générer plusieurs tailles et formats, accompagnés d’une stratégie de cache adaptée. Des tests automatisés viendraient ensuite compléter les validations manuelles réalisées sur ce prototype.

## Lancer le projet

### Prérequis

- Node.js ;
- npm.

```bash
git clone https://github.com/MattWB/mirabell-stream.git
cd mirabell-stream
npm install
npm run dev
```

### Commandes disponibles

```bash
npm run dev       # lance le serveur de développement
npm run build     # vérifie les types et génère le build de production
npm run preview   # prévisualise le build de production
npm run lint      # analyse le code avec ESLint
npm run format    # applique le formatage Prettier
```
