export interface Project {
  number: string;
  name: string;
  description: string;
  tech: string[];
  href?: string;
  // Replace with a real screenshot path in /public once available, e.g. "/projects/savvymenu.png"
  image?: string;
}

export const projects: Project[] = [
  {
    number: "01",
    name: "Nucleus Labs",
    description:
      "The company website for Nucleus Labs, the software and AI studio I work at — built to showcase their core service lines, in-house products, and portfolio of client work across web, mobile, and AI.",
    tech: ["Next.js"],
    href: "https://www.nucleuslabs.tech/",
    image: "/projects/nucleus-labs-hero.png",
  },
  {
    number: "02",
    name: "SavvyMenu",
    description:
      "A full-stack SaaS platform that turns restaurant menus into branded digital experiences. Restaurants create and customize menus, generate QR-based customer ordering, and run their floor through dedicated admin, kitchen, and waiter interfaces — built on a multi-tenant architecture designed to grow into a Free/Starter/Pro/Business subscription product.",
    tech: ["Next.js", "Prisma", "PostgreSQL (Neon)", "Auth.js", "Vercel Blob"],
    href: "https://savvymenu-tau.vercel.app/",
    image: "/projects/savvymenu-hero.png",
  },
  {
    number: "03",
    name: "Biku Menu",
    description:
      "A demo QR-code digital menu built to show Nucleus Labs' digital menu product to prospective restaurant clients — real-time menu browsing, item customization, order-status tracking, and local payment via Telebirr, with English, Amharic, and Afaan Oromo language support.",
    tech: ["Next.js"],
    href: "https://biku-digital-menu.vercel.app/",
    image: "/projects/biku-menu-hero.png",
  },
];

