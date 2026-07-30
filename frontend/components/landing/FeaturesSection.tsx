import { CakeSlice, Coffee, UtensilsCrossed } from "lucide-react";

const features = [
  {
    title: "Pastane",
    description:
      "Özsüt'ün sevilen pastaları, tatlıları ve özel lezzetleri Akhisar'da sizlerle buluşacak.",
    icon: CakeSlice,
  },
  {
    title: "Kahve",
    description:
      "Nitelikli kahveler, sıcak içecekler ve keyifli buluşmalar için yepyeni bir deneyim.",
    icon: Coffee,
  },
  {
    title: "Restaurant",
    description:
      "Günün her saatine eşlik eden zengin menü seçenekleri ve ferah bir restoran atmosferi.",
    icon: UtensilsCrossed,
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-[#141210] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#D6B17A]">
            Yeni Bir Deneyim
          </p>

          <h2 className="mt-6 text-4xl font-bold text-white sm:text-5xl">
            Akhisar&apos;ın Yeni
            <span className="block text-[#D6B17A]">
              Buluşma Noktası
            </span>
          </h2>

          <p className="mt-6 text-base leading-7 text-zinc-300 sm:text-lg">
            Lezzet, kalite ve sıcak atmosferi bir araya getiren yeni
            Özsüt Akhisar deneyimi çok yakında.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="group rounded-3xl border border-white/10 bg-[#1D1A18] p-8 transition duration-300 hover:-translate-y-1 hover:border-[#D6B17A]/50"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D6B17A]/10 text-[#D6B17A] transition group-hover:bg-[#D6B17A] group-hover:text-black">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="mt-7 text-2xl font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-zinc-400">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}