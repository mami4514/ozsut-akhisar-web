import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

import JobApplicationForm from "@/components/career/JobApplicationForm";

export default function CareerPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F4EDE4] text-[#241E19]">
      {/* Arka plan dekorları */}
      <div className="pointer-events-none absolute -left-48 top-20 h-[500px] w-[500px] rounded-full bg-[#D6B17A]/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-48 bottom-20 h-[500px] w-[500px] rounded-full bg-white/60 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-[1100px] px-6 py-10 sm:px-10 sm:py-14 lg:py-20">
        {/* =====================================================
            GERİ DÖN
        ===================================================== */}

        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm font-medium text-[#786B60] transition-colors duration-300 hover:text-[#9A6B35]"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />

          Ana Sayfaya Dön
        </Link>

        {/* =====================================================
            FORM BAŞLIĞI
        ===================================================== */}

        <section className="mt-12 sm:mt-16">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-[#A87339] sm:w-12" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#9A6B35] sm:text-xs">
              Kariyer · Başvuru Formu
            </p>
          </div>

          <div className="mt-6 border-b border-[#D8CABC] pb-8 sm:mt-7 sm:pb-10">
            <h1 className="max-w-4xl text-[2.6rem] font-semibold leading-[1] tracking-[-0.045em] text-[#241E19] sm:text-5xl lg:text-6xl">
              Sizi biraz daha
              <span className="block text-[#A87339]">
                yakından tanıyalım.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-[14px] leading-7 text-[#71655B] sm:mt-6 sm:text-base sm:leading-8">
              Özsüt Akhisar ekibine katılmak için bilgilerinizi eksiksiz
              doldurun. Başvurunuz yönetim ekibimiz tarafından
              değerlendirilecektir.
            </p>
          </div>
        </section>

        {/* =====================================================
            FORM
        ===================================================== */}

        <section className="mt-8 sm:mt-10">
          <div
            className="
              rounded-[1.6rem]
              border
              border-[#DED2C5]
              bg-white/75
              p-5
              shadow-[0_24px_70px_rgba(66,49,34,0.08)]
              backdrop-blur-sm
              sm:rounded-[2rem]
              sm:p-8
              lg:p-10
            "
          >
            <JobApplicationForm />
          </div>

          {/* Alt bilgi */}
          <div className="mt-6 flex items-start gap-3 rounded-[1.2rem] border border-[#DED2C5] bg-[#EFE6DB]/75 px-5 py-4">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#9A6B35]" />

            <p className="text-[13px] leading-6 text-[#71655B] sm:text-sm">
              Başvurunuz yalnızca işe alım sürecinin değerlendirilmesi
              amacıyla kullanılacaktır.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}