import Link from "next/link";

import Navbar from "./Navbar";

export default function HeroSection() {
  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/hero-interior.jpg')",
      }}
    >
      {/* Katmanlar */}
      <div className="absolute inset-0 bg-black/55" />

      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30" />

      <Navbar />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-36 lg:px-10 lg:pb-24 lg:pt-40">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#D6B17A] sm:text-sm">
            1938&apos;den Günümüze
          </p>

          <h1 className="mt-7 text-4xl font-bold leading-[1.08] tracking-tight text-[#F8F6F2] sm:text-6xl lg:text-7xl xl:text-8xl">
            Türkiye&apos;nin En Büyük
            <span className="mt-2 block text-[#D6B17A]">
              Özsüt Şubesi
            </span>
            <span className="mt-2 block">
              Akhisar&apos;da Açılıyor
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
            Modern mimarisi, eşsiz lezzetleri ve güçlü ekibiyle Özsüt
            Akhisar çok yakında misafirlerini ağırlamaya hazırlanıyor.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/kariyer"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#D6B17A] px-8 text-sm font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-[#E1C18F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B17A] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              İş Başvurusu Yap
            </Link>

            <a
              href="#about"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 bg-black/20 px-8 text-sm font-semibold text-white backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-[#D6B17A]/80 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Hikayemizi Keşfet
            </a>
          </div>
        </div>

        <a
          href="#about"
          aria-label="Hikaye bölümüne ilerle"
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-white/60 transition hover:text-[#D6B17A] sm:flex"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.35em]">
            Keşfet
          </span>

          <span className="animate-bounce text-2xl">
            ↓
          </span>
        </a>
      </div>
    </section>
  );
}