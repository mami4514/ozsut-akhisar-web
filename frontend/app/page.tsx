import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_30%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-10 lg:px-16">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-white/60">
              Özsüt
            </p>

            <p className="mt-1 text-lg font-semibold tracking-wide">
              Akhisar
            </p>
          </div>

          <Link
            href="/login"
            className="rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-white transition hover:bg-white hover:text-black"
          >
            Yönetici Girişi
          </Link>
        </header>

        <section className="flex flex-1 items-center py-16">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.35em] text-white/60">
              Çok Yakında
            </p>

            <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-8xl">
              Türkiye&apos;nin en büyük Özsüt şubesi
              <span className="block text-white/50">
                Akhisar&apos;da açılıyor.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
              Modern mimarisi, geniş ürün seçenekleri ve güçlü ekibiyle
              Özsüt Akhisar çok yakında hizmetinizde.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/kariyer"
                className="inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-sm font-semibold text-black transition hover:bg-white/85"
              >
                İş Başvurusu Yap
              </Link>

              <a
                href="#hakkimizda"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-7 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Detayları Keşfet
              </a>
            </div>
          </div>
        </section>

        <section
          id="hakkimizda"
          className="grid gap-4 border-t border-white/10 py-8 sm:grid-cols-3"
        >
          <div>
            <p className="text-2xl font-semibold">Akhisar</p>
            <p className="mt-1 text-sm text-white/50">
              Yeni buluşma noktası
            </p>
          </div>

          <div>
            <p className="text-2xl font-semibold">Çok Yakında</p>
            <p className="mt-1 text-sm text-white/50">
              Açılış hazırlıkları devam ediyor
            </p>
          </div>

          <div>
            <p className="text-2xl font-semibold">Kariyer</p>
            <p className="mt-1 text-sm text-white/50">
              Ekibimize katılmak için başvurun
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}