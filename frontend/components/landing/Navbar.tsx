import Link from "next/link";

import Logo from "@/components/common/Logo";

const navigationItems = [
  {
    label: "Hakkımızda",
    href: "#about",
  },
  {
    label: "Lezzetler",
    href: "#features",
  },
  {
    label: "Kariyer",
    href: "#career",
  },
  {
    label: "İletişim",
    href: "#contact",
  },
];

export default function Navbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link
          href="/"
          aria-label="Özsüt Akhisar ana sayfa"
          className="shrink-0"
        >
          <Logo
            width={150}
            height={82}
            priority
          />
        </Link>

        <nav
          aria-label="Ana navigasyon"
          className="hidden items-center gap-8 lg:flex"
        >
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/75 transition hover:text-[#D6B17A]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Link
          href="/kariyer"
          className="inline-flex h-11 items-center justify-center rounded-full border border-[#D6B17A]/60 bg-black/20 px-5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-[#D6B17A] hover:bg-[#D6B17A] hover:text-black"
        >
          İş Başvurusu
        </Link>
      </div>
    </header>
  );
}