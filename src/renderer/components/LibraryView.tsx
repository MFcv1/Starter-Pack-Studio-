import { providerKnowledgeBase, seoKnowledgeBase } from "../../shared/recommendationEngine";
import type { TechId } from "../../shared/types";
import { TechIcon } from "./TechIcon";

interface BuildRecipe {
  title: string;
  intent: string;
  examples: string[];
  stack: TechId[];
  dataMoment: string;
  typicalStack: string;
}

interface LibraryItem {
  techId: TechId;
  name: string;
  role: string;
  when: string;
  canBuild: string[];
  note: string;
  docsUrl: string;
  exampleUrl?: string;
}

interface LibraryCategory {
  title: string;
  description: string;
  items: LibraryItem[];
}

const buildRecipes: BuildRecipe[] = [
  {
    title: "Landing, vitrine, docs",
    intent: "Pages publiques rapides qui doivent être lues par Google et convaincre un humain.",
    examples: ["Agence locale", "Portfolio", "Documentation produit", "Page de lancement"],
    stack: ["astro", "cloudflare", "netlify", "seo"],
    dataMoment: "Pas de DB tant que le contenu peut vivre en fichiers. Ajoute CMS ou Firestore quand le client édite souvent.",
    typicalStack: "Astro + Markdown/MDX + Cloudflare Pages, ou Netlify si les formulaires comptent plus que l'edge."
  },
  {
    title: "SaaS ou portail client",
    intent: "Produit avec comptes, abonnements, pages privées et quelques pages publiques.",
    examples: ["CRM léger", "Portail client", "Outil de réservation", "App B2B"],
    stack: ["next", "postgres", "auth", "stripe"],
    dataMoment: "DB dès qu'un utilisateur crée/modifie quelque chose: comptes, projets, factures, droits, historique.",
    typicalStack: "Next.js + Postgres + Auth.js/Clerk/Supabase Auth + Stripe, souvent déployé sur Vercel."
  },
  {
    title: "Marketplace",
    intent: "Plusieurs rôles, annonces ou produits, vendeurs, modération et parfois paiement.",
    examples: ["Airbnb-like local", "Plateforme de freelances", "Catalogue vendeurs", "Billetterie"],
    stack: ["next", "stripe", "postgres", "search"],
    dataMoment: "Firestore suffit pour annonces simples; SQL devient prioritaire dès qu'il y a paiement, stock, commissions ou audit.",
    typicalStack: "Next.js + Postgres + Stripe Connect + Search + stockage objet pour images."
  },
  {
    title: "Dashboard ou outil interne",
    intent: "Interface privée dense, rapide à utiliser, sans enjeu SEO public.",
    examples: ["Admin de contenus", "Modération", "Analytics", "Outil métier interne"],
    stack: ["react", "vite", "firebase", "supabase"],
    dataMoment: "La DB suit le domaine: Firestore pour realtime simple, Postgres pour tables, filtres, exports et reporting.",
    typicalStack: "Vite + React + API existante, Firebase ou Supabase. Noindex, RBAC serveur, logs admin."
  },
  {
    title: "Backend métier ou API durable",
    intent: "Logique serveur indépendante du front, utilisée par web, mobile, partenaires ou workers.",
    examples: ["API mobile", "ERP", "Système de commandes", "Backend IA/data"],
    stack: ["nest", "django", "fastapi", "postgres"],
    dataMoment: "DB presque toujours centrale. Ajoute cache, queue et search quand volume, lenteur ou recherche apparaissent.",
    typicalStack: "NestJS/Django/FastAPI + Postgres + Redis + jobs, déployé sur Render/Railway/Fly/AWS."
  },
  {
    title: "App edge, API courte, gros fichiers",
    intent: "Réponses proches des visiteurs, coût bas, endpoints courts, assets volumineux.",
    examples: ["Webhook", "Proxy API", "Mini catalogue", "Distribution de downloads"],
    stack: ["cloudflare", "d1", "storage", "queue"],
    dataMoment: "D1/KV pour petite donnée edge. Postgres séparé si transactions fortes, reporting ou relations complexes.",
    typicalStack: "Cloudflare Pages/Workers + D1/KV + R2 + Queues, parfois Hono pour l'API."
  }
];

const libraryCategories: LibraryCategory[] = [
  {
    title: "UI et composants",
    description: "Ce qui fabrique l'interface visible. Ce n'est pas encore l'architecture complète.",
    items: [
      {
        techId: "react",
        name: "React",
        role: "Librairie UI",
        when: "Composer des interfaces interactives en blocs réutilisables.",
        canBuild: ["Dashboard", "Configurateur", "Backoffice", "App SaaS avec Next"],
        note: "React n'héberge rien et ne choisit pas la DB. Next, Remix, Astro ou Vite peuvent l'utiliser.",
        docsUrl: "https://react.dev/learn"
      },
      {
        techId: "vite",
        name: "Vite",
        role: "Build tool / SPA",
        when: "Démarrer vite une app côté client, surtout privée.",
        canBuild: ["Admin interne", "Prototype interactif", "Electron app", "SPA avec API externe"],
        note: "Excellent pour une interface privée. Pour une page publique SEO, préfère Astro ou Next.",
        docsUrl: "https://vite.dev/guide/"
      },
      {
        techId: "auth",
        name: "Auth",
        role: "Comptes et rôles",
        when: "Dès qu'il existe un utilisateur, un admin, un espace privé ou des permissions.",
        canBuild: ["Espace client", "Admin", "SaaS", "Marketplace vendeurs"],
        note: "L'auth doit être validée côté serveur ou par des rules, jamais seulement par le menu React.",
        docsUrl: "https://authjs.dev/"
      }
    ]
  },
  {
    title: "Frameworks front/fullstack",
    description: "Ce qui décide comment les pages sont organisées et rendues: statique, serveur, hybride ou SPA.",
    items: [
      {
        techId: "next",
        name: "Next.js",
        role: "Framework React fullstack",
        when: "Produit React avec routes dynamiques, SEO, auth, server actions/API, SSR/SSG/ISR.",
        canBuild: ["SaaS", "Marketplace", "Catalogue e-commerce", "Portail client"],
        note: "Peut parler à SQL. Il reste léger seulement si tu mets toute la logique métier complexe dedans.",
        docsUrl: "https://nextjs.org/docs",
        exampleUrl: "https://vercel.com/templates/nextjs"
      },
      {
        techId: "astro",
        name: "Astro",
        role: "Framework contenu/SEO",
        when: "Pages publiques majoritairement lisibles: landing, vitrine, docs, blog, guides.",
        canBuild: ["Landing", "Site vitrine", "Docs", "Blog éditorial"],
        note: "Il envoie peu de JavaScript. Tu peux ajouter React seulement sur les zones interactives.",
        docsUrl: "https://docs.astro.build/",
        exampleUrl: "https://astro.build/showcase/"
      },
      {
        techId: "remix",
        name: "Remix",
        role: "Framework React web standards",
        when: "Workflows formulaires, mutations serveur, CRUD et expérience web classique robuste.",
        canBuild: ["Portail client", "App métier", "CRUD produit", "Site dynamique"],
        note: "Alternative React à Next, souvent très agréable pour penser routes, loaders et actions.",
        docsUrl: "https://remix.run/docs",
        exampleUrl: "https://remix.run/showcase"
      },
      {
        techId: "sveltekit",
        name: "SvelteKit",
        role: "Framework Svelte fullstack",
        when: "Même famille de besoin que Next/Nuxt, avec moins de runtime client et une syntaxe Svelte.",
        canBuild: ["SaaS", "Dashboard", "Site hybride", "App edge"],
        note: "Très pertinent si tu choisis Svelte. Pas prioritaire si l'équipe est déjà React.",
        docsUrl: "https://svelte.dev/docs/kit",
        exampleUrl: "https://madewithsvelte.com/"
      },
      {
        techId: "nuxt",
        name: "Nuxt",
        role: "Framework Vue fullstack",
        when: "Produit Vue avec SSR, SSG, routes et backend léger.",
        canBuild: ["Site contenu Vue", "App produit", "Dashboard", "E-commerce"],
        note: "L'équivalent mental de Next dans l'écosystème Vue.",
        docsUrl: "https://nuxt.com/docs"
      },
      {
        techId: "angular",
        name: "Angular",
        role: "Framework frontend opinionné",
        when: "Grandes apps d'entreprise avec conventions fortes, formulaires, routing, tests et équipe structurée.",
        canBuild: ["ERP front", "Portail entreprise", "Admin complexe", "App bancaire/interne"],
        note: "Plus lourd à démarrer, mais cohérent quand l'organisation veut un cadre strict.",
        docsUrl: "https://angular.dev/overview"
      }
    ]
  },
  {
    title: "Backends et API",
    description: "Quand la logique métier mérite d'exister hors du composant UI ou hors d'un petit handler Next.",
    items: [
      {
        techId: "node-api",
        name: "Node API",
        role: "Express/Fastify/Hono",
        when: "API légère, webhooks, proxy, microservice ou backend très contrôlé.",
        canBuild: ["Webhook Stripe", "API mobile", "Proxy sécurisé", "Service de génération"],
        note: "Hono est très bon en edge; Express/Fastify restent classiques côté Node serveur.",
        docsUrl: "https://expressjs.com/"
      },
      {
        techId: "nest",
        name: "NestJS",
        role: "Backend Node structuré",
        when: "Domaine métier sérieux: modules, services, guards, queues, tests, équipe backend.",
        canBuild: ["CRM", "ERP léger", "Marketplace avancée", "API B2B"],
        note: "À choisir quand le backend devient un produit durable, pas juste trois endpoints.",
        docsUrl: "https://docs.nestjs.com/"
      },
      {
        techId: "django",
        name: "Django",
        role: "Backend Python complet",
        when: "Admin rapide, ORM, auth, permissions, CRUD solide et backend conventionnel.",
        canBuild: ["Backoffice", "CMS métier", "SaaS B2B", "Portail admin"],
        note: "Très fort quand l'admin et les données structurées comptent plus que l'effet frontend.",
        docsUrl: "https://docs.djangoproject.com/"
      },
      {
        techId: "rails",
        name: "Rails",
        role: "Backend Ruby productif",
        when: "CRUD, SaaS, workflows métier et productivité par conventions.",
        canBuild: ["SaaS", "CRM", "Marketplace", "Admin métier"],
        note: "Excellent pour sortir vite une app complète avec une structure mature.",
        docsUrl: "https://guides.rubyonrails.org/"
      },
      {
        techId: "laravel",
        name: "Laravel",
        role: "Backend PHP complet",
        when: "App web classique, auth, jobs, emails, admin, hébergement PHP ou équipe Laravel.",
        canBuild: ["Backoffice", "E-commerce", "SaaS", "Portail client"],
        note: "Très riche côté backend: queues, policies, migrations, billing via Cashier.",
        docsUrl: "https://laravel.com/docs"
      },
      {
        techId: "fastapi",
        name: "FastAPI",
        role: "API Python typée",
        when: "Data, IA, services API, validation typée, documentation OpenAPI automatique.",
        canBuild: ["API IA", "Scoring", "Backend data", "Service de traitement"],
        note: "Très bon compagnon d'un frontend Next/Vite quand Python est naturel côté métier.",
        docsUrl: "https://fastapi.tiangolo.com/"
      }
    ]
  },
  {
    title: "Bases de données",
    description: "La DB devient nécessaire quand l'app doit se souvenir de quelque chose créé ou modifié par des humains ou des systèmes.",
    items: [
      {
        techId: "postgres",
        name: "PostgreSQL",
        role: "SQL relationnel",
        when: "Relations, paiements, audit, permissions, reporting, contraintes et exports.",
        canBuild: ["SaaS", "Marketplace Stripe", "CRM", "App métier"],
        note: "C'est le choix sain dès que l'argent, les droits ou l'historique deviennent sérieux.",
        docsUrl: "https://www.postgresql.org/docs/"
      },
      {
        techId: "firestore",
        name: "Firestore",
        role: "Base documentaire realtime",
        when: "MVP, annonces, profils, contenu éditable simple, realtime, backoffice léger.",
        canBuild: ["Marketplace sans paiement", "Admin contenu", "App collaborative", "MVP mobile/web"],
        note: "Modélise selon les requêtes. Attention aux reads, rules et jointures faites dans le code.",
        docsUrl: "https://firebase.google.com/docs/firestore"
      },
      {
        techId: "supabase",
        name: "Supabase",
        role: "BaaS Postgres",
        when: "Tu veux SQL + Auth + Storage + APIs sans coder tout le backend.",
        canBuild: ["SaaS", "Dashboard", "App métier SQL", "Marketplace MVP"],
        note: "Très bon quand Postgres doit rester au centre mais que tu veux accélérer l'auth et les APIs.",
        docsUrl: "https://supabase.com/docs"
      },
      {
        techId: "d1",
        name: "Cloudflare D1",
        role: "SQL SQLite serverless",
        when: "Petite donnée structurée proche des Workers: formulaires, mini catalogue, flags.",
        canBuild: ["Mini app edge", "Formulaires", "Catalogue simple", "Prototype Cloudflare"],
        note: "Pas un Postgres lourd. Vérifie limites, migrations et lignes scannées.",
        docsUrl: "https://developers.cloudflare.com/d1/"
      },
      {
        techId: "mongodb",
        name: "MongoDB",
        role: "Base documents JSON",
        when: "Documents souples, profils variables, événements, contenu sans schéma relationnel fort.",
        canBuild: ["App contenu", "Journal d'événements", "MVP flexible", "Catalogue souple"],
        note: "Moins naturel pour paiements, reporting relationnel et contraintes fortes.",
        docsUrl: "https://www.mongodb.com/docs/"
      },
      {
        techId: "mysql",
        name: "MySQL",
        role: "SQL relationnel classique",
        when: "Écosystème PHP/Laravel, hébergement traditionnel, app relationnelle standard.",
        canBuild: ["E-commerce", "Backoffice", "CMS", "App Laravel"],
        note: "Même famille mentale que Postgres, avec un écosystème très installé.",
        docsUrl: "https://dev.mysql.com/doc/"
      },
      {
        techId: "redis",
        name: "Redis",
        role: "Cache / sessions / queues",
        when: "Accélérer, limiter, décaler, stocker des sessions ou piloter des jobs.",
        canBuild: ["Rate limit", "Cache API", "Queue email", "Sessions"],
        note: "Très rarement la source de vérité principale. Il complète une vraie DB.",
        docsUrl: "https://redis.io/docs/latest/"
      }
    ]
  },
  {
    title: "Hébergement, cloud et BaaS",
    description: "L'endroit où le code tourne, plus les services prêts à l'emploi autour.",
    items: [
      {
        techId: "cloudflare",
        name: "Cloudflare",
        role: "Pages, Workers, R2, D1",
        when: "Statique rapide, edge functions, APIs courtes, gros fichiers, coût bas.",
        canBuild: ["Astro vitrine", "Webhook edge", "Downloads R2", "Mini app D1"],
        note: "Très fort pour edge/statique. Moins naturel pour backend Node long-running.",
        docsUrl: "https://developers.cloudflare.com/"
      },
      {
        techId: "vercel",
        name: "Vercel",
        role: "Plateforme Next.js",
        when: "Next.js, previews, SSR/ISR, app produit React, DX rapide.",
        canBuild: ["SaaS Next", "Catalogue dynamique", "Marketplace", "App avec previews"],
        note: "Excellent DX, mais surveille compute, bandwidth, images et gros fichiers.",
        docsUrl: "https://vercel.com/docs"
      },
      {
        techId: "firebase",
        name: "Firebase",
        role: "Backend app Google",
        when: "Auth, Firestore, Storage, Functions, notifications, backoffice rapide.",
        canBuild: ["App realtime", "Marketplace simple", "Admin contenu", "MVP mobile/web"],
        note: "Inutile pour une landing statique. Cohérent dès qu'il y a comptes, données ou uploads.",
        docsUrl: "https://firebase.google.com/docs"
      },
      {
        techId: "netlify",
        name: "Netlify",
        role: "Static hosting + forms",
        when: "Vitrines, previews client, formulaires simples et fonctions légères.",
        canBuild: ["Site vitrine", "Landing avec formulaire", "Campagne", "Portfolio"],
        note: "Très pratique quand le formulaire est la seule partie dynamique.",
        docsUrl: "https://docs.netlify.com/"
      },
      {
        techId: "aws",
        name: "AWS",
        role: "Cloud généraliste",
        when: "Infra durable, S3/CloudFront, Lambda, RDS, ECS, jobs, besoins entreprise.",
        canBuild: ["Backend métier", "API scalable", "Pipeline data", "App avec S3/RDS"],
        note: "Puissant mais plus complexe. Pas le premier choix pour une petite landing.",
        docsUrl: "https://docs.aws.amazon.com/"
      },
      {
        techId: "render",
        name: "Render / Railway / Fly",
        role: "Déploiement backend simple",
        when: "Tu as une API Node/Python/Ruby, un worker ou Docker à faire tourner longtemps.",
        canBuild: ["NestJS API", "FastAPI", "Rails app", "Worker jobs"],
        note: "Bon pont entre serverless simple et infra cloud complète.",
        docsUrl: "https://render.com/docs"
      }
    ]
  },
  {
    title: "Services transverses",
    description: "Briques qui apparaissent quand le produit gagne de vrais workflows.",
    items: [
      {
        techId: "stripe",
        name: "Stripe",
        role: "Paiement",
        when: "Checkout, abonnements, remboursements, marketplace, commissions, webhooks.",
        canBuild: ["Achat simple", "SaaS abonnement", "Marketplace Connect", "Facturation"],
        note: "Paiement implique webhooks idempotents, logs, audit et souvent SQL.",
        docsUrl: "https://docs.stripe.com/"
      },
      {
        techId: "search",
        name: "Search",
        role: "Recherche/facettes",
        when: "Catalogue, docs, marketplace ou admin où la recherche devient une fonctionnalité centrale.",
        canBuild: ["Recherche produit", "Docs search", "Facettes marketplace", "Recherche admin"],
        note: "Algolia/Meilisearch/Typesense/OpenSearch ou Postgres full-text selon volume et besoin typo-tolerant.",
        docsUrl: "https://www.algolia.com/doc/"
      },
      {
        techId: "queue",
        name: "Queues / jobs",
        role: "Arrière-plan",
        when: "Emails, exports, synchronisations, retries webhook, traitements longs.",
        canBuild: ["Envoi email", "Export CSV", "Indexation search", "Sync CRM"],
        note: "À ajouter quand une action ne doit pas bloquer la requête utilisateur.",
        docsUrl: "https://developers.cloudflare.com/queues/"
      },
      {
        techId: "storage",
        name: "Object storage",
        role: "Fichiers et médias",
        when: "Images, PDF, uploads privés, vidéos, archives, binaires lourds.",
        canBuild: ["Galerie", "Documents client", "Downloads", "Images marketplace"],
        note: "R2, S3, Supabase Storage ou Firebase Storage. Utilise des URLs signées si privé.",
        docsUrl: "https://developers.cloudflare.com/r2/"
      },
      {
        techId: "seo",
        name: "SEO",
        role: "Indexation et découverte",
        when: "Des pages publiques doivent être trouvées, comprises et partagées.",
        canBuild: ["Vitrine", "Blog", "Catalogue", "Docs"],
        note: "HTML initial, liens crawlables, sitemap, metadata, canonical et schema visible.",
        docsUrl: "https://developers.google.com/search/docs"
      }
    ]
  }
];

function openUrl(url: string) {
  void window.studio.openExternalUrl(url);
}

export function LibraryView() {
  const bricksCount = libraryCategories.reduce((total, category) => total + category.items.length, 0);

  return (
    <section className="library-view">
      <div className="library-hero panel">
        <div>
          <span className="overline">Bibliothèque</span>
          <h1>Choisir une stack par type d'app</h1>
          <p>
            Lis les briques comme des couches: interface, rendu, backend, base de données, hébergement et services. Le but est de comprendre ce que tu peux construire, pas d'empiler des logos.
          </p>
        </div>
        <div className="library-proof">
          <span>{providerKnowledgeBase.length} providers suivis</span>
          <span>{seoKnowledgeBase.length} stratégies SEO</span>
          <span>{bricksCount} briques rangées</span>
        </div>
      </div>

      <section className="panel app-map-panel">
        <div className="panel-header">
          <h2>Types d'apps concrètes</h2>
          <span>{buildRecipes.length} recettes mentales</span>
        </div>
        <div className="app-recipe-grid">
          {buildRecipes.map((recipe) => (
            <article className="app-recipe-card" key={recipe.title}>
              <div className="app-recipe-head">
                <div>
                  <strong>{recipe.title}</strong>
                  <span>{recipe.intent}</span>
                </div>
                <div className="mini-tech-strip">
                  {recipe.stack.map((id) => (
                    <TechIcon id={id} key={`${recipe.title}-${id}`} />
                  ))}
                </div>
              </div>
              <p>{recipe.typicalStack}</p>
              <div className="recipe-examples">
                {recipe.examples.map((example) => (
                  <span key={example}>{example}</span>
                ))}
              </div>
              <em>{recipe.dataMoment}</em>
            </article>
          ))}
        </div>
      </section>

      <div className="library-category-grid">
        {libraryCategories.map((category) => (
          <section className="panel library-category" key={category.title}>
            <div className="panel-header">
              <h2>{category.title}</h2>
              <span>{category.items.length} éléments</span>
            </div>
            <p>{category.description}</p>
            <div className="library-item-grid">
              {category.items.map((item) => (
                <article className="library-item" key={`${category.title}-${item.techId}-${item.name}`}>
                  <div className="library-tech-head">
                    <TechIcon id={item.techId} />
                    <div>
                      <strong>{item.name}</strong>
                      <em>{item.role}</em>
                    </div>
                  </div>
                  <div>
                    <span>{item.when}</span>
                    <div className="library-build-list">
                      {item.canBuild.map((example) => (
                        <small key={example}>{example}</small>
                      ))}
                    </div>
                    <p>{item.note}</p>
                    <div className="library-links">
                      <button className="library-doc-link" onClick={() => openUrl(item.docsUrl)} type="button">
                        Docs officielles
                      </button>
                      {item.exampleUrl ? (
                        <button className="library-doc-link secondary" onClick={() => openUrl(item.exampleUrl!)} type="button">
                          Exemples web
                        </button>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
