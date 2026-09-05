export default function Nav() {
  const links = [
    { href: "#about", label: "about" },
    { href: "#work", label: "work" },
    { href: "#skills", label: "skills" },
    { href: "#contact", label: "contact" },
  ];

  return (
    <nav className="relative z-20 mx-auto flex w-full max-w-[1100px] items-center justify-between px-6 py-7">
      <span className="font-display text-lg font-bold tracking-tight">
        KENENI
      </span>
      <div className="flex gap-7">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="font-mono text-[13px] text-muted transition-colors hover:text-accent"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
