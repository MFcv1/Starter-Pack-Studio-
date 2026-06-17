import astroLogo from "../assets/brand-logos/astro.svg";
import cloudflareLogo from "../assets/brand-logos/cloudflare.svg";
import firebaseLogo from "../assets/brand-logos/firebase.svg";
import netlifyLogo from "../assets/brand-logos/netlify.svg";
import nextLogo from "../assets/brand-logos/nextdotjs.svg";
import postgresLogo from "../assets/brand-logos/postgresql.svg";
import stripeLogo from "../assets/brand-logos/stripe.svg";
import vercelLogo from "../assets/brand-logos/vercel.svg";
import viteLogo from "../assets/brand-logos/vite.svg";
import type { TechId } from "../../shared/types";

const brandLogos: Partial<Record<TechId, string>> = {
  astro: astroLogo,
  cloudflare: cloudflareLogo,
  d1: cloudflareLogo,
  firebase: firebaseLogo,
  firestore: firebaseLogo,
  "firebase-sql": firebaseLogo,
  netlify: netlifyLogo,
  next: nextLogo,
  postgres: postgresLogo,
  stripe: stripeLogo,
  storage: cloudflareLogo,
  vercel: vercelLogo,
  vite: viteLogo
};

interface BrandLogoProps {
  id: TechId;
  label: string;
}

export function BrandLogo({ id, label }: BrandLogoProps) {
  const src = brandLogos[id];

  if (!src) return null;

  return <img alt={`${label} logo`} className="brand-logo" draggable={false} src={src} />;
}

export function hasBrandLogo(id: TechId) {
  return Boolean(brandLogos[id]);
}
