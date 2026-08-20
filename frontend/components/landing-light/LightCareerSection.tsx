"use client";

import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  Clock3,
  UsersRound,
} from "lucide-react";
import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

const careerPoints = [
  {
    icon: UsersRound,
    text: "Açılış Ekibi",
  },
  {
    icon: BriefcaseBusiness,
    text: "Farklı Pozisyonlar",
  },
  {
    icon: Clock3,
    text: "Online Başvuru",
  },
];

export default function LightCareerSection() {
  return (
    <section
      id="career"
      className="relative overflow-hidden bg-[#241E19] py-16 text-white sm:py-24 lg:py-32"
    >
      {/* =====================================================
          ARKA PLAN
      ===================================================== */}

      <div className="pointer-events-none absolute -left-48 top-0 h-[520px] w-[520px] rounded-full bg-[#D6B17A]/14 blur-[130px]" />

      <div className="pointer-events-none absolute -right-44 bottom-[-100px] h-[520px] w-[520px] rounded-full bg-white/[0.04] blur-[120px]" />

      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[90%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-14 xl:px-20">
        {/* =====================================================
            ANA ALAN
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 32,
            filter: "blur(7px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.9,
            ease,
          }}
          className="
            relative
            lg:overflow-hidden
            lg:rounded-[2rem]
            lg:border
            lg:border-white/[0.09]
            lg:bg-white/[0.035]
            lg:px-14
            lg:py-16
            lg:shadow-[0_35px_100px_rgba(0,0,0,0.22)]
            lg:backdrop-blur-xl
            xl:px-16
          "
        >
          {/* Desktop dekor */}
          <div className="pointer-events-none absolute right-[-80px] top-[-120px] hidden h-[350px] w-[350px] rounded-full bg-[#D6B17A]/7 blur-[90px] lg:block" />

          <div
            className="
              relative
              grid
              gap-9
              sm:gap-12
              lg:grid-cols-[minmax(0,1fr)_380px]
              lg:items-center
              xl:grid-cols-[minmax(0,1fr)_420px]
            "
          >
            {/* =================================================
                SOL TARAF
            ================================================= */}

            <div className="max-w-4xl">
              {/* Kariyer label */}

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
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                  ease,
                }}
                className="flex items-center gap-4"
              >
                <span className="h-px w-9 bg-[#D6B17A] sm:w-12" />

                <div className="inline-flex items-center gap-2">
                  <BriefcaseBusiness className="h-4 w-4 text-[#D6B17A]" />

                  <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#D6B17A] sm:text-xs">
                    Kariyer
                  </span>
                </div>
              </motion.div>

              {/* Ana başlık */}

              <motion.h2
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
                }}
                transition={{
                  duration: 0.85,
                  delay: 0.18,
                  ease,
                }}
                className="
                  mt-5
                  max-w-4xl
                  text-[2.55rem]
                  font-semibold
                  leading-[0.98]
                  tracking-[-0.045em]
                  sm:mt-6
                  sm:text-5xl
                  lg:mt-7
                  lg:text-6xl
                  xl:text-[4.7rem]
                "
              >
                Bu hikâyenin

                <span className="mt-1 block text-[#D6B17A]">
                  bir parçası olun.
                </span>
              </motion.h2>

              {/* Açıklama */}

              <motion.p
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.75,
                  delay: 0.28,
                  ease,
                }}
                className="
                  mt-5
                  max-w-2xl
                  text-[14px]
                  leading-7
                  text-white/65
                  sm:mt-6
                  sm:text-base
                  sm:leading-8
                  lg:mt-7
                  lg:text-[17px]
                "
              >
                Özsüt Akhisar&apos;ın açılış ekibine katılın.
                Misafirperverliğe, kaliteye ve birlikte büyümeye değer veren
                güçlü bir ekibin parçası olun.
              </motion.p>

              {/* =================================================
                  BİLGİLER
              ================================================= */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 18,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.75,
                  delay: 0.38,
                  ease,
                }}
                className="
                  mt-6
                  grid
                  grid-cols-1
                  gap-2.5
                  sm:mt-7
                  sm:flex
                  sm:flex-wrap
                  sm:items-center
                  sm:gap-0
                  lg:mt-9
                "
              >
                {careerPoints.map((point, index) => {
                  const Icon = point.icon;

                  return (
                    <div
                      key={point.text}
                      className="flex items-center"
                    >
                      <div
                        className="
                          flex
                          min-h-9
                          items-center
                          gap-3
                          rounded-full
                          border
                          border-white/[0.07]
                          bg-white/[0.035]
                          px-4
                          text-[12px]
                          text-white/65
                          sm:min-h-0
                          sm:rounded-none
                          sm:border-0
                          sm:bg-transparent
                          sm:px-0
                          sm:text-sm
                        "
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0 text-[#D6B17A] sm:h-4 sm:w-4" />

                        <span>{point.text}</span>
                      </div>

                      {index < careerPoints.length - 1 && (
                        <div className="mx-5 hidden h-5 w-px bg-white/15 sm:block" />
                      )}
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* =================================================
                SAĞ / ALT BAŞVURU KARTI
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 24,
                x: 0,
                scale: 0.98,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.85,
                delay: 0.2,
                ease,
              }}
              className="
                relative
                overflow-hidden
                rounded-[1.5rem]
                border
                border-white/10
                bg-black/10
                p-5
                sm:rounded-[1.7rem]
                sm:p-7
                lg:p-8
              "
            >
              {/* Hafif iç glow */}

              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#D6B17A]/5 blur-[50px]" />

              <div className="relative">
                {/* Başvurular açık */}

                <p className="text-[9px] font-semibold uppercase tracking-[0.32em] text-[#D6B17A] sm:text-[10px]">
                  Başvurular Açık
                </p>

                {/* Kart başlığı */}

                <h3
                  className="
                    mt-3
                    max-w-md
                    text-[1.5rem]
                    font-semibold
                    leading-[1.15]
                    tracking-[-0.03em]
                    text-white
                    sm:mt-4
                    sm:text-[1.8rem]
                  "
                >
                  Özsüt Akhisar&apos;da
                  <span className="block">
                    sizin için de bir yer olabilir.
                  </span>
                </h3>

                {/* Avantajlar */}

                <div className="mt-5 space-y-3 sm:mt-6 sm:space-y-3.5">
                  <div className="flex items-center gap-3 text-[12px] text-white/60 sm:text-sm">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D6B17A]/12">
                      <Check className="h-3.5 w-3.5 text-[#D6B17A]" />
                    </span>

                    Farklı pozisyonlara başvuru
                  </div>

                  <div className="flex items-center gap-3 text-[12px] text-white/60 sm:text-sm">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D6B17A]/12">
                      <Check className="h-3.5 w-3.5 text-[#D6B17A]" />
                    </span>

                    CV&apos;nizi online iletin
                  </div>

                  <div className="flex items-center gap-3 text-[12px] text-white/60 sm:text-sm">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D6B17A]/12">
                      <Check className="h-3.5 w-3.5 text-[#D6B17A]" />
                    </span>

                    Başvurunuzu dakikalar içinde tamamlayın
                  </div>
                </div>

                {/* CTA */}

                <Link
                  href="/kariyer"
                  className="
                    group
                    mt-6
                    inline-flex
                    min-h-13
                    w-full
                    items-center
                    justify-center
                    gap-3
                    rounded-full
                    bg-[#D6B17A]
                    px-7
                    text-[13px]
                    font-semibold
                    text-[#241E19]
                    shadow-[0_15px_40px_rgba(214,177,122,0.15)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-[#E5C58F]
                    hover:shadow-[0_20px_50px_rgba(214,177,122,0.20)]
                    sm:mt-8
                    sm:min-h-14
                    sm:text-sm
                  "
                >
                  İş Başvurusu Yap

                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <p className="mt-3 text-center text-[9px] leading-5 text-white/35 sm:mt-4 sm:text-[11px]">
                  Başvurunuzu online olarak birkaç dakika içinde
                  tamamlayabilirsiniz.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* =====================================================
            DESKTOP ALT NOT
        ===================================================== */}

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
            delay: 0.12,
            ease,
          }}
          className="
            mt-8
            hidden
            justify-between
            gap-4
            text-center
            sm:flex-row
            sm:items-center
            sm:text-left
            lg:flex
          "
        >
          <p className="text-xs leading-6 text-white/35">
            Özsüt Akhisar · Açılış Ekibi · 2026
          </p>

          <div className="flex items-center justify-center gap-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#D6B17A]/75">
            <span className="h-px w-8 bg-[#D6B17A]/50" />

            Birlikte Büyüyoruz
          </div>
        </motion.div>
      </div>
    </section>
  );
}