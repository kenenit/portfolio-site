export default function Footer() {
  return (
    <footer className="border-t border-border py-8 text-center font-mono text-[13px] text-muted">
      © {new Date().getFullYear()} Keneni Teha — built with Next.js, Tailwind CSS, and Framer Motion
    </footer>
  );
}
