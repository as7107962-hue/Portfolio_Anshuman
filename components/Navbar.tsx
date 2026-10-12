"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { site } from "@/lib/site";
import { Container } from "./Container";
import { Button } from "./Button";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = useMemo(() => site.navigation, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const menuId = "mobile-menu";

  return (
    <header className="site-header">
      <Container>
        <div className="header-inner">
          <Link href="/" className="brand" aria-label="Anshuman home">
            <strong>{site.name}</strong>
            <span>AI Systems Engineer</span>
          </Link>

          <div className="header-actions">
            <nav className="nav desktop-nav" aria-label="Primary">
              {navItems.map((item) => {
                const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                return (
                  <Link key={item.href} href={item.href} className={isActive ? "active" : undefined}>
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <Button href="/contact" variant="primary" className="header-cta desktop-cta">
              Fill out the form
            </Button>

            <button
              type="button"
              className="nav-toggle"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              aria-controls={menuId}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </Container>

      <button
        type="button"
        className={`mobile-menu-backdrop ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
        tabIndex={-1}
      />

      <div id={menuId} className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <Container>
          <div className="mobile-menu-panel" role="dialog" aria-modal="true" aria-label="Navigation menu">
            <div className="mobile-menu-header">
              <div className="mobile-menu-title">Navigation</div>
              <button type="button" className="nav-close" aria-label="Close menu" onClick={() => setIsOpen(false)}>
                ✕
              </button>
            </div>

            <nav className="mobile-nav" aria-label="Mobile primary">
              {navItems.map((item) => {
                const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={isActive ? "active" : undefined}
                    onClick={() => setIsOpen(false)}
                  >
                    <span>{item.label}</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mobile-menu-actions">
              <Button href="/contact" variant="primary" className="mobile-menu-cta" onClick={() => setIsOpen(false)}>
                Fill out the form
              </Button>
              <Button href="/services" variant="ghost" className="mobile-menu-secondary" onClick={() => setIsOpen(false)}>
                View services
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}
