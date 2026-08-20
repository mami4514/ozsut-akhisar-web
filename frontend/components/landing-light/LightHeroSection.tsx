"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

import LightNavbar from "./LightNavbar";

const ease = [0.16, 1, 0.3, 1] as const;

export default function LightHeroSection() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#F1E9DE]">
      {/* TAM EKRAN MEKAN FOTOĞRAFI */}
      <div className="absolute inset-0">
        <Image
          src="/images/ozsut-akhisar-hero.png"
          alt="Özsüt Akhisar şubesi"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_center] lg:object-center"
        />

        {/* Sıcak ivory geçiş */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-r
            from-[#F1E9DE]/95
            via-[#F5EFE7]/72
            to-transparent
            lg:from-[#F1E9DE]/92
            lg:via-[#F5EFE7]/48
            lg:to-transparent
          "
        />

        {/* Hafif sıcak ışık dokusu */}
        <div
          className="
            pointer-events-none
            absolute
            -left-32
            top-[18%]
            h-[520px]
            w-[520px]
            rounded-full
            bg-[#D6B17A]/10
            blur-[100px]
          "
        />

        {/* Navbar okunabilirliği */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#F1E9DE]/85 via-[#F1E9DE]/35 to-transparent" />

        {/* Mobil alt kontrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#17130F]/30 via-transparent to-transparent lg:hidden" />
      </div>

      {/* NAVBAR */}
      <div className="relative z-50">
        <LightNavbar />
      </div>

      {/* HERO CONTENT */}
      <div
        className="
          relative z-20
          mx-auto
          flex min-h-[100svh]
          max-w-[1600px]
          items-center
          px-6
          pb-8 pt-32
          sm:px-10 sm:pb-10 sm:pt-36
          lg:px-14 lg:pb-8 lg:pt-32
          xl:px-20
          2xl:px-24
        "
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[820px]"
        >
          {/* ÜST ETİKET */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease,
            }}
            className="mb-4 flex items-center gap-4 sm:mb-5"
          >
            <span className="h-px w-10 bg-[#A57A45] sm:w-14" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#86653F] sm:text-xs">
              1938&apos;den Günümüze
            </span>
          </motion.div>

          {/* ANA BAŞLIK */}
          <h1
            className="
              max-w-[820px]
              text-[2.65rem]
              font-semibold
              leading-[0.94]
              tracking-[-0.055em]
              text-[#211C17]
              sm:text-[3.7rem]
              lg:text-[4.2rem]
              xl:text-[4.7rem]
              2xl:text-[5.05rem]
            "
          >
            <span className="block overflow-hidden pb-1 sm:pb-2">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.15,
                  ease,
                }}
                className="block"
              >
                Türkiye&apos;nin
              </motion.span>
            </span>

            <span className="block overflow-hidden pb-1 sm:pb-2">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.24,
                  ease,
                }}
                className="block"
              >
                En Büyük
              </motion.span>
            </span>

            {/* ÖZSÜT VURGUSU */}
            <span className="block overflow-hidden pb-1 sm:pb-2">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.33,
                  ease,
                }}
                className="
                  block
                  font-semibold
                  text-[#9A6B35]
                  drop-shadow-[0_2px_12px_rgba(154,107,53,0.10)]
                "
              >
                Özsüt Şubesi
              </motion.span>
            </span>

            <span className="block overflow-hidden pb-2">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.42,
                  ease,
                }}
                className="block"
              >
                Akhisar&apos;da Açılıyor
              </motion.span>
            </span>
          </h1>

          {/* AÇIKLAMA */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.62,
              ease,
            }}
            className="
              mt-4
              max-w-[570px]
              text-[14px]
              leading-6
              text-[#5E554C]
              sm:text-base sm:leading-7
              lg:text-[17px] lg:leading-7
            "
          >
            Özsüt&apos;ün 1938&apos;den gelen lezzet mirası, özgün mimarisi
            ve yepyeni deneyimiyle Akhisar&apos;da hayat buluyor.
          </motion.p>

          {/* CTA BUTONLARI */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.75,
              ease,
            }}
            className="mt-5 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#about"
              className="
                group
                inline-flex
                min-h-12
                items-center
                justify-center
                gap-3
                rounded-full
                bg-[#211C17]
                px-7
                text-sm
                font-semibold
                text-white
                shadow-[0_18px_45px_rgba(33,28,23,0.18)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#A87C46]
                sm:min-h-13
              "
            >
              Hikâyemizi Keşfet

              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
            </a>

            <Link
              href="/kariyer"
              className="
                group
                inline-flex
                min-h-12
                items-center
                justify-center
                gap-3
                rounded-full
                border
                border-[#B49E84]/70
                bg-[#F4EDE4]/75
                px-7
                text-sm
                font-semibold
                text-[#211C17]
                shadow-[0_8px_30px_rgba(69,51,33,0.05)]
                backdrop-blur-md
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:border-[#A87C46]
                hover:bg-[#F6F0E8]/95
                sm:min-h-13
              "
            >
              Kariyer Fırsatları

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* KONUM */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: 0.95,
            }}
            className="mt-5 flex flex-wrap items-center gap-4 sm:gap-5"
          >
            <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#77695C] sm:text-[10px]">
              Akhisar
            </span>

            <span className="h-1 w-1 rounded-full bg-[#A87C46]" />

            <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#77695C] sm:text-[10px]">
              Manisa
            </span>

            <span className="h-1 w-1 rounded-full bg-[#A87C46]" />

            <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#77695C] sm:text-[10px]">
              Çok Yakında
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* SCROLL GÖSTERGESİ */}
      <motion.a
        href="#about"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 1.2,
        }}
        className="
          absolute
          bottom-7
          right-7
          z-30
          hidden
          items-center
          gap-4
          lg:flex
          xl:right-12
        "
      >
        <span className="text-[9px] font-semibold uppercase tracking-[0.35em] text-white drop-shadow-md">
          Keşfet
        </span>

        <span
          className="
            flex
            h-11 w-11
            items-center
            justify-center
            rounded-full
            border border-white/40
            bg-black/15
            text-white
            shadow-lg
            backdrop-blur-md
            transition-all
            duration-300
            hover:bg-black/30
          "
        >
          <ArrowDown className="h-4 w-4" />
        </span>
      </motion.a>
    </section>
  );
}