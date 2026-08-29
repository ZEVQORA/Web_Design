"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { ZevqoraLogo } from "@/components/brand/ZevqoraLogo";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * The header starts quiet - it sits directly on the canvas with no chrome so
 * the hero reads as one uninterrupted surface. Once the page moves, a hairline
 * and a translucent surface arrive so the header separates from content
 * scrolling underneath it. That is the whole transition; nothing shrinks,
 * nothing slides.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background-color,border-color,box-shadow] duration-[320ms] ease-[cubic-bezier(0.2,0,0,1)]",
        scrolled
          ? "border-b border-line bg-canvas/80 shadow-[0_1px_0_rgb(15_17_21/0.02),0_8px_24px_-16px_rgb(15_17_21/0.16)] backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent",
      )}
    >
      <div className="container-wide flex h-[68px] items-center justify-between gap-8">
        <Link
          href="/"
          aria-label="ZEVQORA home"
          className="rounded-sm py-2 text-ink"
        >
          <ZevqoraLogo size={28} />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-nav rounded-sm py-2 text-muted transition-control hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="text-nav hidden rounded-sm px-3 py-2 text-muted transition-control hover:text-ink sm:inline-block"
          >
            Sign in
          </Link>
          <ButtonLink
            href={site.primaryCta.href}
            size="sm"
            className="hidden sm:inline-flex"
          >
            {site.primaryCta.label}
          </ButtonLink>

          {/* Mobile */}
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-ink lg:hidden"
              >
                <Menu size={20} aria-hidden />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/20 backdrop-blur-sm" />
              <Dialog.Content className="fixed inset-x-0 top-0 z-50 border-b border-line bg-canvas p-6 focus:outline-none">
                <Dialog.Title className="sr-only">Menu</Dialog.Title>
                <Dialog.Description className="sr-only">
                  Site navigation
                </Dialog.Description>

                <div className="flex h-4 items-center justify-between">
                  <ZevqoraLogo size={26} />
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      aria-label="Close menu"
                      className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-ink"
                    >
                      <X size={20} aria-hidden />
                    </button>
                  </Dialog.Close>
                </div>

                <nav aria-label="Mobile" className="mt-8">
                  <ul className="flex flex-col">
                    {site.nav.map((item) => (
                      <li key={item.href} className="rule">
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="text-h3 block py-4 text-ink"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                    <li className="rule">
                      <Link
                        href="/login"
                        onClick={() => setOpen(false)}
                        className="text-h3 block py-4 text-ink"
                      >
                        Sign in
                      </Link>
                    </li>
                  </ul>
                </nav>

                <ButtonLink
                  href={site.primaryCta.href}
                  size="lg"
                  className="mt-8 w-full"
                  onClick={() => setOpen(false)}
                >
                  {site.primaryCta.label}
                </ButtonLink>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
