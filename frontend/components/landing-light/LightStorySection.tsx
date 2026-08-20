"use client";

import Image from "next/image";
import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

const timeline = [
  {
    year: "1938",
    title: "Bir lezzet mirasının başlangıcı",
    description:
      "Özsüt'ün İzmir'de başlayan yolculuğu; ustalık, kalite ve misafir memnuniyeti anlayışıyla büyüyerek Türkiye'nin en köklü lezzet markalarından birine dönüştü.",
  },
  {
    year: "2021",
    title: "Akhisar'da büyüyen işletmecilik deneyimi",
    description:
      "2021 yılında Manisa-Akhisar'da, İzmir-İstanbul Karayolu üzerinde hizmet veren Köfteci Hünkar'ın işletmesini devralan ekip; bölgenin misafirlerini, beklentilerini ve sofra kültürünü yakından tanıyarak güçlü bir yerel işletmecilik deneyimi oluşturdu.",
  },
  {
    year: "2026",
    title: "Özsüt Akhisar ile yeni bir dönem",
    description:
      "Yıllar içinde Akhisar'da kazanılan bu deneyim, bugün Özsüt'ün 1938'den gelen köklü marka mirasıyla buluşuyor. Yeni Özsüt Akhisar; özgün mimarisi, atmosferi, lezzetleri ve hizmet anlayışıyla şehrin yeni buluşma noktalarından biri olmaya hazırlanıyor.",
  },
];

const gallery = [
  {
    src: "/images/ozsut-story-detail-1.jpg",
    label: "Ferah & Doğal Atmosfer",
  },
  {
    src: "/images/ozsut-story-detail-2.jpg",
    label: "Taptaze Lezzetler",
  },
  {
    src: "/images/ozsut-story-detail-3.jpg",
    label: "Açık Alanda Keyif",
  },
];

/* =========================================================
   MANIFESTO
========================================================= */

function ManifestoSection() {
  const words = [
    { text: "Geçmişten", accent: false },
    { text: "gelen", accent: false },
    { text: "miras.", accent: true },

    { text: "Akhisar'da", accent: false },
    { text: "kazanılan", accent: false },
    { text: "deneyim.", accent: true },

    { text: "Geleceğe", accent: false },
    { text: "açılan", accent: false },
    { text: "yeni", accent: true },
    { text: "bir", accent: true },
    { text: "kapı.", accent: true },
  ];

  return (
    <div className="relative overflow-hidden bg-[#F4EDE4]">
      {/* Arka plan ışığı */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AE79]/10 blur-[130px]" />

      <div className="relative mx-auto max-w-[1650px] px-6 py-16 sm:px-10 sm:py-20 lg:px-14 xl:px-20">
        {/* Etiket */}
        <motion.div
          initial={{
            opacity: 0,
            y: 14,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.6,
          }}
          transition={{
            duration: 0.7,
            ease,
          }}
          className="mb-7 text-center"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#9A6B35] sm:text-xs">
            Yeni Bir Dönem
          </span>

          <div className="mx-auto mt-4 h-px w-12 bg-[#B88A50]" />
        </motion.div>

        {/* Manifesto yazısı */}
        <div className="flex flex-wrap justify-center gap-x-[0.22em] gap-y-2 text-center xl:flex-nowrap">
          {words.map((word, index) => (
            <motion.span
              key={`${word.text}-${index}`}
              initial={{
                opacity: 0,
                y: 22,
                filter: "blur(5px)",
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              viewport={{
                once: true,
                amount: 0.75,
              }}
              transition={{
                duration: 0.72,
                delay: index * 0.065,
                ease,
              }}
              className={`
                inline-block
                whitespace-nowrap
                text-[1.45rem]
                font-semibold
                leading-tight
                tracking-[-0.04em]
                sm:text-[1.8rem]
                lg:text-[1.9rem]
                xl:text-[2.1rem]
                2xl:text-[2.4rem]
                ${
                  word.accent
                    ? "text-[#9A6B35]"
                    : "text-[#2B241E]"
                }
              `}
            >
              {word.text}
            </motion.span>
          ))}
        </div>

        {/* 2026 */}
        <motion.div
          initial={{
            opacity: 0,
            y: 16,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            delay: 1,
            ease,
          }}
          className="mt-8 flex items-center justify-center gap-5"
        >
          <span className="h-px w-12 bg-[#C6A477]" />

          <span className="text-xs font-semibold tracking-[0.55em] text-[#8E683B]">
            2026
          </span>

          <span className="h-px w-12 bg-[#C6A477]" />
        </motion.div>
      </div>
    </div>
  );
}

/* =========================================================
   STORY
========================================================= */

export default function LightStorySection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#FCFAF7]"
    >
      {/* Arka plan dekorları */}
      <div className="pointer-events-none absolute -left-40 top-24 h-[420px] w-[420px] rounded-full bg-[#D5B17D]/10 blur-[110px]" />

      <div className="pointer-events-none absolute -right-48 bottom-0 h-[500px] w-[500px] rounded-full bg-[#EEE1D1]/60 blur-[120px]" />

      <div className="relative mx-auto max-w-[1650px] px-6 py-20 sm:px-10 sm:py-24 lg:px-14 lg:py-28 xl:px-16 2xl:px-20">
        {/* =====================================================
            ANA GRID
        ===================================================== */}

        <div
          className="
            grid
            gap-14
            lg:grid-cols-[minmax(0,1.13fr)_minmax(360px,0.87fr)]
            lg:items-start
            lg:gap-14
            xl:grid-cols-[minmax(0,1.17fr)_minmax(400px,0.83fr)]
            xl:gap-16
          "
        >
          {/* ===================================================
              SOL TARAF
          =================================================== */}

          <div className="min-w-0">
            {/* Başlık */}
            <motion.div
              initial={{
                opacity: 0,
                y: 24,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.35,
              }}
              transition={{
                duration: 0.85,
                ease,
              }}
              className="mb-7"
            >
              {/* Hikayemiz */}
              <div className="mb-5 flex items-center gap-4">
                <span className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#9A6B35] sm:text-xs">
                  Hikâyemiz
                </span>

                <span className="h-px w-12 bg-[#9A6B35]" />
              </div>

              {/* =================================================
                  3 SATIR BAŞLIK
              ================================================= */}

              <h2 className="font-semibold leading-[0.98] tracking-[-0.045em]">
                {/* Satır 1 */}
                <span
                  className="
                    block
                    text-[2.55rem]
                    text-[#241E19]
                    sm:text-[3.15rem]
                    lg:text-[clamp(3rem,3.5vw,4.05rem)]
                  "
                >
                  Bir marka mirası,
                </span>

                {/* Satır 2 */}
                <span
                  className="
                    mt-2
                    block
                    text-[2.05rem]
                    text-[#A87339]
                    sm:text-[2.6rem]
                    lg:text-[clamp(2.45rem,3vw,3.45rem)]
                  "
                >
                  Akhisar&apos;da yeni bir
                </span>

                {/* Satır 3 */}
                <span
                  className="
                    mt-1
                    block
                    text-[2.05rem]
                    text-[#A87339]
                    sm:text-[2.6rem]
                    lg:text-[clamp(2.45rem,3vw,3.45rem)]
                  "
                >
                  hikâyeyle buluşuyor.
                </span>
              </h2>
            </motion.div>

            {/* =================================================
                FOTOĞRAF + GALERİ
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                x: -30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.95,
                ease,
              }}
              className="
                overflow-hidden
                rounded-[1.8rem]
                bg-[#EDE5DB]
                shadow-[0_28px_70px_rgba(57,43,31,0.11)]
              "
            >
              {/* =================================================
                  ANA FOTOĞRAF

                  ÖNEMLİ:
                  fill yok
                  object-cover yok
                  min-height yok

                  Görsel 2000x1125 oranında gösteriliyor.
                  Crop / zoom yapılmıyor.
              ================================================= */}

              <div className="relative w-full overflow-hidden">
                <Image
                  src="/images/ozsut-story-main4.jpg"
                  alt="Özsüt Akhisar bahçe ve mimari görünümü"
                  width={2000}
                  height={1125}
                  quality={100}
                  sizes="
                    (max-width: 1024px) 100vw,
                    (max-width: 1400px) 65vw,
                    1000px
                  "
                  className="block h-auto w-full"
                />
              </div>

              {/* =================================================
                  3'LÜ GALERİ
              ================================================= */}

              <div className="grid grid-cols-3 gap-2 bg-[#FCFAF7] p-2">
                {gallery.map((item, index) => (
                  <motion.div
                    key={item.src}
                    initial={{
                      opacity: 0,
                      y: 16,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.65,
                      delay: index * 0.1,
                      ease,
                    }}
                    className="
                      group
                      relative
                      aspect-[4/3]
                      overflow-hidden
                      rounded-[0.95rem]
                    "
                  >
                    <Image
                      src={item.src}
                      alt={item.label}
                      fill
                      quality={100}
                      sizes="
                        (max-width: 1024px) 32vw,
                        330px
                      "
                      className="
                        object-cover
                        object-center
                        transition-transform
                        duration-700
                        group-hover:scale-[1.03]
                      "
                    />

                    {/* Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />

                    {/* Etiket */}
                    <div className="absolute inset-x-0 bottom-0 p-3 text-center">
                      <span
                        className="
                          text-[7px]
                          font-semibold
                          uppercase
                          tracking-[0.13em]
                          text-white
                          sm:text-[8px]
                          lg:text-[9px]
                          xl:text-[10px]
                        "
                      >
                        {item.label}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ===================================================
              SAĞ TARAF
              TIMELINE
          =================================================== */}

          <div className="min-w-0 lg:pt-[66px] xl:pt-[72px]">
            <div className="relative">
              {/* Timeline çizgisi */}
              <div
                className="
                  absolute
                  bottom-5
                  left-[19px]
                  top-5
                  w-px
                  bg-[#DED1C2]
                  sm:left-[23px]
                "
              />

              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{
                      opacity: 0,
                      y: 24,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.25,
                    }}
                    transition={{
                      duration: 0.75,
                      delay: index * 0.09,
                      ease,
                    }}
                    className="
                      relative
                      grid
                      grid-cols-[40px_minmax(0,1fr)]
                      gap-5
                      sm:grid-cols-[48px_minmax(0,1fr)]
                      sm:gap-6
                    "
                  >
                    {/* Timeline noktası */}
                    <div
                      className="
                        relative
                        z-10
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#CBAE87]
                        bg-[#FCFAF7]
                        sm:h-12
                        sm:w-12
                      "
                    >
                      <span className="h-2.5 w-2.5 rounded-full bg-[#9A6B35]" />
                    </div>

                    {/* İçerik */}
                    <div className="min-w-0 border-b border-[#E5DBD0] pb-8">
                      <p className="text-sm font-semibold tracking-[0.15em] text-[#9A6B35]">
                        {item.year}
                      </p>

                      <h3
                        className="
                          mt-2
                          text-xl
                          font-semibold
                          leading-snug
                          tracking-tight
                          text-[#29221C]
                          sm:text-[1.35rem]
                          xl:text-[1.45rem]
                        "
                      >
                        {item.title}
                      </h3>

                      <p
                        className="
                          mt-4
                          max-w-xl
                          text-[14px]
                          leading-7
                          text-[#71665C]
                          sm:text-[15px]
                          sm:leading-7
                        "
                      >
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =======================================================
          MANIFESTO
      ======================================================= */}

      <div className="border-t border-[#E1D6CA]">
        <ManifestoSection />
      </div>
    </section>
  );
}