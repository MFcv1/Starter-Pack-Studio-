import algoliaLogo from "../assets/brand-logos/algolia.svg";
import angularLogo from "../assets/brand-logos/angular.svg";
import astroLogo from "../assets/brand-logos/astro.svg";
import auth0Logo from "../assets/brand-logos/auth0.svg";
import awsLogo from "../assets/brand-logos/amazonaws.svg";
import cloudflareLogo from "../assets/brand-logos/cloudflare.svg";
import contentfulLogo from "../assets/brand-logos/contentful.svg";
import djangoLogo from "../assets/brand-logos/django.svg";
import fastapiLogo from "../assets/brand-logos/fastapi.svg";
import firebaseLogo from "../assets/brand-logos/firebase.svg";
import googleSearchConsoleLogo from "../assets/brand-logos/googlesearchconsole.svg";
import laravelLogo from "../assets/brand-logos/laravel.svg";
import mongoLogo from "../assets/brand-logos/mongodb.svg";
import mysqlLogo from "../assets/brand-logos/mysql.svg";
import netlifyLogo from "../assets/brand-logos/netlify.svg";
import nextLogo from "../assets/brand-logos/nextdotjs.svg";
import nestLogo from "../assets/brand-logos/nestjs.svg";
import nodeLogo from "../assets/brand-logos/nodedotjs.svg";
import nuxtLogo from "../assets/brand-logos/nuxt.svg";
import postgresLogo from "../assets/brand-logos/postgresql.svg";
import rabbitmqLogo from "../assets/brand-logos/rabbitmq.svg";
import railsLogo from "../assets/brand-logos/rubyonrails.svg";
import reactLogo from "../assets/brand-logos/react.svg";
import redisLogo from "../assets/brand-logos/redis.svg";
import remixLogo from "../assets/brand-logos/remix.svg";
import renderLogo from "../assets/brand-logos/render.svg";
import stripeLogo from "../assets/brand-logos/stripe.svg";
import supabaseLogo from "../assets/brand-logos/supabase.svg";
import svelteLogo from "../assets/brand-logos/svelte.svg";
import vercelLogo from "../assets/brand-logos/vercel.svg";
import viteLogo from "../assets/brand-logos/vite.svg";
import type { TechId } from "../../shared/types";

const brandLogos: Partial<Record<TechId, string>> = {
  angular: angularLogo,
  astro: astroLogo,
  auth: auth0Logo,
  aws: awsLogo,
  cloudflare: cloudflareLogo,
  cms: contentfulLogo,
  d1: cloudflareLogo,
  django: djangoLogo,
  fastapi: fastapiLogo,
  firebase: firebaseLogo,
  firestore: firebaseLogo,
  "firebase-sql": firebaseLogo,
  laravel: laravelLogo,
  mongodb: mongoLogo,
  mysql: mysqlLogo,
  netlify: netlifyLogo,
  nest: nestLogo,
  next: nextLogo,
  "node-api": nodeLogo,
  nuxt: nuxtLogo,
  postgres: postgresLogo,
  queue: rabbitmqLogo,
  rails: railsLogo,
  react: reactLogo,
  redis: redisLogo,
  remix: remixLogo,
  render: renderLogo,
  search: algoliaLogo,
  seo: googleSearchConsoleLogo,
  stripe: stripeLogo,
  supabase: supabaseLogo,
  sveltekit: svelteLogo,
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
