import { NavLink } from "react-router";

import { cn } from "~/lib/utils";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About", end: false },
];

export function SiteHeader() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
        <NavLink
          to="/"
          className="font-heading text-sm font-semibold tracking-tight"
        >
          gyk.me
        </NavLink>
        <nav className="flex items-center gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-2.5 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground",
                  isActive && "bg-muted text-foreground",
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
