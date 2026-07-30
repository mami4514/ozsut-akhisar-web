import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-10">

        {/* Sol Taraf */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#D6B17A]">
            1938'den Günümüze
          </p>

          <h1 className="mt-6 text-5xl font-bold leading-tight text-white lg:text-7xl">
            Türkiye'nin En Büyük
            <span className="block text-[#D6B17A]">
              Özsüt Şubesi
            </span>
            Akhisar'da Açılıyor.
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-300">
            Modern mimarisi, eşsiz lezzetleri ve güçlü ekibiyle
            Özsüt Akhisar çok yakında sizlerle buluşuyor.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/kariyer"
              className="rounded-full bg-[#D6B17A] px-7 py-4 font-semibold text-black transition hover:scale-105"
            >
              İş Başvurusu Yap
            </Link>

            <a
              href="#about"
              className="rounded-full border border-zinc-700 px-7 py-4 font-semibold text-white transition hover:border-[#D6B17A]"
            >
              Daha Fazla Bilgi
            </a>
          </div>
        </div>

        {/* Sağ Taraf */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">

            <img
              src="/images/hero-interior.jpg"
              alt="Özsüt Akhisar"
              className="h-full w-full object-cover transition duration-700 hover:scale-105"
            />

          </div>
        </div>

      </div>
    </section>
  );
}