"use client";

import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, UsersRound } from "lucide-react";
import { motion } from "motion/react";

export default function LightCareerSection() {
  return (
    <section
      id="career"
      className="relative overflow-hidden bg-[#2B241E] py-24 text-white sm:py-28 lg:py-32"
    >
      <div className="pointer-events-none absolute -left-44 top-0 h-[420px] w-[420px] rounded-full bg-[#D6B17A]/15 blur-3xl" />

      <div className="pointer-events-none absolute -right-44 bottom-0 h-[460px] w-[460px] rounded-full bg-white/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
            filter: "blur(8px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] px-6 py-10 shadow-[0_30px_90px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:px-10 sm:py-14 lg:px-14 lg:py-16"
        >
          <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-4xl">
              <motion.div
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
                  duration: 0.7,
                  delay: 0.15,
                }}
                className="inline-flex items-center gap-2 rounded-full border border-[#D6B17A]/25 bg-[#D6B17A]/10 px-4 py-2"
              >
                <BriefcaseBusiness className="h-4 w-4 text-[#D6B17A]" />

                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#D6B17A]">
                  Kariyer
                </span>
              </motion.div>

              <motion.h2
                initial={{
                  opacity: 0,
                  y: 28,
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
                  delay: 0.25,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-7 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
              >
                Bu hikâyenin
                <span className="block text-[#D6B17A]">
                  bir parçası olun
                </span>
              </motion.h2>

              <motion.p
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
                  duration: 0.75,
                  delay: 0.38,
                }}
                className="mt-7 max-w-2xl text-base leading-8 text-white/65 sm:text-lg"
              >
                Özsüt Akhisar&apos;ın açılış ekibinde yer alın. Güçlü bir
                markanın yeni yolculuğuna katkı sağlayın ve deneyiminizi
                bizimle büyütün.
              </motion.p>

              <motion.div
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
                  duration: 0.7,
                  delay: 0.5,
                }}
                className="mt-8 flex flex-wrap gap-5 text-sm text-white/55"
              >
                <div className="flex items-center gap-2">
                  <UsersRound className="h-4 w-4 text-[#D6B17A]" />
                  Açılış ekibi
                </div>

                <div className="h-5 w-px bg-white/15" />

                <div>Farklı pozisyon seçenekleri</div>
              </motion.div>
            </div>

            <motion.div
              initial={{
                opacity: 0,
                x: 30,
                scale: 0.96,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="lg:pl-8"
            >
              <Link
                href="/kariyer"
                className="group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[#D6B17A] px-8 text-sm font-semibold text-[#2B241E] transition duration-300 hover:-translate-y-1 hover:bg-[#E5C58F] sm:w-auto"
              >
                İş Başvurusu Yap

                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <p className="mt-4 text-center text-xs leading-6 text-white/40 lg:text-left">
                Başvurunuzu birkaç dakika içinde tamamlayabilirsiniz.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}