import { providerKnowledgeBase, seoKnowledgeBase } from "../../shared/recommendationEngine";
import type { TechId } from "../../shared/types";
import { TechIcon } from "./TechIcon";

interface LibraryItem {
  techId: TechId;
  name: string;
  role: string;
  when: string;
  note: string;
  docsUrl: string;
}

interface LibraryCategory {
  title: string;
  description: string;
  items: LibraryItem[];
}

const libraryCategories: LibraryCategory[] = [
  {
    title: "Frameworks et rendu",
    description: "Ce qui structure le code front, le rendu HTML et l'expérience développeur.",
    items: [
      {
        techId: "react",
        name: "React",
        role: "Librairie UI",
        when: "Construire des composants interactifs.",
        note: "React n'est pas un hébergeur ni un framework complet: Next et Vite peuvent l'utiliser.",
        docsUrl: "https://react.dev/learn"
      },
      {
        techId: "next",
        name: "Next.js",
        role: "Framework React fullstack",
        when: "SSR, SSG, ISR, catalogue dynamique, app produit.",
        note: "Très fort quand le SEO dépend de données vivantes ou de routes nombreuses.",
        docsUrl: "https://nextjs.org/docs"
      },
      {
        techId: "astro",
        name: "Astro",
        role: "Framework contenu/SEO",
        when: "Landing, vitrine, docs, guides, pages publiques stables.",
        note: "Génère du HTML pré-rendu avec peu de JavaScript.",
        docsUrl: "https://docs.astro.build/"
      },
      {
        techId: "vite",
        name: "Vite",
        role: "Build tool / SPA",
        when: "Dashboard privé, outil interne, app React côté client.",
        note: "Excellent pour une interface privée; pas le défaut pour un site SEO public.",
        docsUrl: "https://vite.dev/guide/"
      }
    ]
  },
  {
    title: "Fournisseurs et hébergement",
    description: "Où le site/app est déployé, avec les services autour: CDN, fonctions, auth ou stockage.",
    items: [
      {
        techId: "cloudflare",
        name: "Cloudflare",
        role: "CDN, Pages, Workers, R2",
        when: "Astro statique, edge functions, gros downloads avec R2.",
        note: "Très bon coût/perf pour sites publics et fichiers lourds.",
        docsUrl: "https://developers.cloudflare.com/"
      },
      {
        techId: "firebase",
        name: "Firebase",
        role: "Backend app Google",
        when: "Auth, Firestore, Storage, Functions, backoffice rapide.",
        note: "Inutile pour une landing statique, cohérent dès qu'il y a comptes/données.",
        docsUrl: "https://firebase.google.com/docs"
      },
      {
        techId: "vercel",
        name: "Vercel",
        role: "Plateforme Next.js",
        when: "Next, SSR/ISR, previews produit, routes dynamiques.",
        note: "Très bon DX, mais surveiller compute/bandwidth selon usage.",
        docsUrl: "https://vercel.com/docs"
      },
      {
        techId: "netlify",
        name: "Netlify",
        role: "Static hosting + forms",
        when: "Vitrine statique avec formulaires simples et previews.",
        note: "Très pratique quand le formulaire est la seule partie dynamique.",
        docsUrl: "https://docs.netlify.com/"
      },
      {
        techId: "supabase",
        name: "Supabase",
        role: "Backend Postgres",
        when: "SQL, Auth, Storage, APIs auto sur Postgres.",
        note: "À comparer avec Firebase quand le modèle relationnel est important.",
        docsUrl: "https://supabase.com/docs"
      }
    ]
  },
  {
    title: "Bases de données et stockage",
    description: "Là où vivent les données applicatives, les fichiers, les historiques et le reporting.",
    items: [
      {
        techId: "firestore",
        name: "Firestore",
        role: "Base documentaire realtime",
        when: "Profils, annonces, backoffice léger, données simples.",
        note: "Attention aux reads et aux règles de sécurité.",
        docsUrl: "https://firebase.google.com/docs/firestore"
      },
      {
        techId: "postgres",
        name: "PostgreSQL",
        role: "SQL relationnel",
        when: "Paiement, audit, reporting, contraintes fortes.",
        note: "Devient prioritaire quand la donnée est structurante.",
        docsUrl: "https://www.postgresql.org/docs/"
      },
      {
        techId: "d1",
        name: "Cloudflare D1",
        role: "SQL SQLite serverless",
        when: "MVP Cloudflare, petites données structurées.",
        note: "Pas un Postgres lourd; surveiller lignes scannées et limites.",
        docsUrl: "https://developers.cloudflare.com/d1/"
      },
      {
        techId: "firebase-sql",
        name: "Firebase SQL Connect",
        role: "Postgres dans Firebase",
        when: "Rester dans Firebase tout en utilisant SQL.",
        note: "Ajoute le coût Cloud SQL et doit être justifié.",
        docsUrl: "https://firebase.google.com/docs/sql-connect"
      },
      {
        techId: "storage",
        name: "Cloudflare R2 / Firebase Storage",
        role: "Stockage objet",
        when: "Images, PDF, .dmg, .exe, fichiers lourds.",
        note: "Pour Cloudflare, pense R2; pour Firebase, Storage demande souvent Blaze.",
        docsUrl: "https://developers.cloudflare.com/r2/"
      }
    ]
  },
  {
    title: "Capacités produit",
    description: "Fonctions transverses qui changent le choix de starter ou de provider.",
    items: [
      {
        techId: "seo",
        name: "Google Search Central",
        role: "Indexation Google",
        when: "Pages publiques qui doivent être trouvées.",
        note: "HTML initial, liens crawlables, sitemap, title/H1/meta, schema réel.",
        docsUrl: "https://developers.google.com/search/docs"
      },
      {
        techId: "auth",
        name: "Firebase Auth",
        role: "Comptes et permissions",
        when: "Login, rôles, admin, espace client.",
        note: "Dès qu'il y a Auth, l'architecture n'est plus une simple landing.",
        docsUrl: "https://firebase.google.com/docs/auth"
      },
      {
        techId: "stripe",
        name: "Stripe",
        role: "Paiement",
        when: "Checkout, commissions, remboursements, webhooks.",
        note: "Paiement implique audit, webhooks idempotents et souvent SQL.",
        docsUrl: "https://docs.stripe.com/"
      }
    ]
  }
];

export function LibraryView() {
  return (
    <section className="library-view">
      <div className="library-hero panel">
        <div>
          <span className="overline">Bibliothèque</span>
          <h1>Comprendre les briques avant de choisir</h1>
          <p>Frameworks, providers, bases de données et capacités sont rangés par rôle pour lire l'architecture sans jargon inutile.</p>
        </div>
        <div className="library-proof">
          <span>{providerKnowledgeBase.length} providers</span>
          <span>{seoKnowledgeBase.length} stratégies SEO</span>
          <span>{libraryCategories.reduce((total, category) => total + category.items.length, 0)} briques</span>
        </div>
      </div>

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
                <article className="library-item" key={`${category.title}-${item.techId}`}>
                  <div className="library-tech-head">
                    <TechIcon id={item.techId} />
                    <div>
                      <strong>{item.name}</strong>
                      <em>{item.role}</em>
                    </div>
                  </div>
                  <div>
                    <span>{item.when}</span>
                    <p>{item.note}</p>
                    <button className="library-doc-link" onClick={() => void window.studio.openExternalUrl(item.docsUrl)} type="button">
                      Docs officielles
                    </button>
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
