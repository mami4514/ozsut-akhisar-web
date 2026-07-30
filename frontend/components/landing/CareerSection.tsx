import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";

export default function CareerSection() {
  return (
    <section className="bg-[#181513] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#1D1A18]">
          <div className="grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:p-16">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D6B17A]/10 text-[#D6B17A]">
                <Users className="h-7 w-7" />
              </div>

              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.35em] text-[#D6B17A]">
                Kariyer
              </p>

              <h2 className="mt-5 max-w-3xl text-4xl font-bold text-white sm:text-5xl">
                Ekibimizin Bir Parçası Olun
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
                Özsüt Akhisar&apos;ın açılış ekibinde yer almak,
                deneyiminizi güçlü bir markayla buluşturmak ve birlikte
                büyümek için başvurunuzu hemen iletebilirsiniz.
              </p>
            </div>

            <div className="lg:pl-10">
              <Link
                href="/kariyer"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D6B17A] px-7 text-sm font-semibold text-black transition hover:scale-105 sm:w-auto"
              >
                İş Başvurusu Yap
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}