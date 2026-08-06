"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  History,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";

import LightNavbar from "./LightNavbar";

import {
  buttonHover,
  buttonTap,
  easeOutExpo,
  fadeUp,
  staggerContainer,
} from "@/lib/animations";

const heroFeatures = [
  {
    label: "Modern Mimari",
    icon: Building2,
  },
  {
    label: "1938'den Gelen Lezzet",
    icon: History,
  },
  {
    label: "Sıcak Atmosfer",
    icon: Sparkles,
  },
];

export default function LightHeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#F8F5EF]">
      <LightNavbar />

      {/* Dekoratif arka plan şekilleri */}
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-[#D6B17A]/15 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-10 h-[420px] w-[420px] rounded-full bg-[#E9DCCB]/70 blur-3xl" />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-14 px-6 pb-20 pt-40 lg:grid-cols-[0.88fr_1.12fr] lg:px-10 lg:pb-24 lg:pt-44">
        {/* Sol içerik */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.4em] text-[#B28A52] sm:text-sm"
          >
            1938&apos;den Günümüze
          </motion.p>

          <h1 className="mt-7 text-4xl font-semibold leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
            <span className="block overflow-hidden pb-2">
              <motion.span
                variants={fadeUp}
                className="block text-[#2B241E]"
              >
                Türkiye&apos;nin En Büyük
              </motion.span>
            </span>

            <span className="block overflow-hidden pb-2">
              <motion.span
                variants={fadeUp}
                className="block text-[#B28A52]"
              >
                Özsüt Şubesi
              </motion.span>
            </span>

            <span className="block overflow-hidden pb-2">
              <motion.span
                variants={fadeUp}
                className="block text-[#2B241E]"
              >
                Akhisar&apos;da Açılıyor
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-xl text-base leading-8 text-[#6E6258] sm:text-lg"
          >
            Modern mimarisi, eşsiz lezzetleri ve güçlü ekibiyle Özsüt
            Akhisar çok yakında misafirlerini ağırlamaya hazırlanıyor.
          </motion.p>

          {/* Butonlar */}
          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-col gap-4 sm:flex-row"
          >
            <motion.div
              whileHover={buttonHover}
              whileTap={buttonTap}
            >
              <Link
                href="/kariyer"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#2B241E] px-8 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(43,36,30,0.18)] transition-colors duration-300 hover:bg-[#B28A52] sm:w-auto"
              >
                İş Başvurusu Yap
              </Link>
            </motion.div>

            <motion.div
              whileHover={buttonHover}
              whileTap={buttonTap}
            >
              <a
                href="#about"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[#D8CCBE] bg-white/60 px-8 text-sm font-semibold text-[#2B241E] shadow-[0_12px_35px_rgba(61,46,33,0.06)] backdrop-blur-sm transition-colors duration-300 hover:border-[#B28A52] hover:bg-white sm:w-auto"
              >
                Hikayemizi Keşfet
              </a>
            </motion.div>
          </motion.div>

          {/* Premium özellik satırı */}
          <motion.div
            variants={fadeUp}
            className="mt-11 border-t border-[#DFD5C9] pt-7"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7 sm:gap-y-4">
              {heroFeatures.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <motion.div
                    key={feature.label}
                    initial={{
                      opacity: 0,
                      x: -18,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      duration: 0.65,
                      delay: 1.2 + index * 0.16,
                      ease: easeOutExpo,
                    }}
                    className="flex items-center gap-2.5 text-sm font-medium text-[#695D53]"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#B28A52]/10 text-[#B28A52]">
                      <Icon className="h-4 w-4" />
                    </span>

                    <span>{feature.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* Sağ görsel */}
        <motion.div
          initial={{
            opacity: 0,
            x: 60,
            scale: 0.96,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 1.15,
            delay: 0.35,
            ease: easeOutExpo,
          }}
          className="relative pb-8"
        >
          <div className="pointer-events-none absolute -left-6 top-12 hidden h-36 w-36 rounded-full border border-[#B28A52]/30 lg:block" />

          <div className="pointer-events-none absolute -bottom-2 -right-8 hidden h-56 w-56 rounded-full bg-[#E9DCCB] lg:block" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-3 shadow-[0_30px_80px_rgba(60,45,30,0.15)]">
            <div className="relative min-h-[430px] overflow-hidden rounded-[1.5rem] sm:min-h-[520px] lg:min-h-[580px]">
              {/* Ken Burns efekti */}
              <motion.div
                initial={{
                  scale: 1.08,
                }}
                animate={{
                  scale: 1,
                }}
                transition={{
                  duration: 22,
                  ease: "linear",
                }}
                className="absolute inset-0"
              >
                <Image
                  src="/images/store-front.jpg"
                  alt="Özsüt Akhisar dış cephe görünümü"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
              </motion.div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

              <motion.div
                initial={{
                  opacity: 0,
                  y: 24,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 1.15,
                  ease: easeOutExpo,
                }}
                className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/75">
                  Çok Yakında
                </p>

                <p className="mt-3 max-w-md text-2xl font-semibold leading-tight sm:text-3xl">
                  Modern mimarisiyle Akhisar&apos;ın yeni buluşma noktası
                </p>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.7,
              delay: 1.35,
              ease: easeOutExpo,
            }}
            className="absolute bottom-0 left-6 rounded-2xl border border-white bg-white/95 px-5 py-4 shadow-xl backdrop-blur-md sm:left-10"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-[#9A8B7F]">
              Yeni Şube
            </p>

            <p className="mt-1 font-semibold text-[#2B241E]">
              Akhisar / Manisa
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}