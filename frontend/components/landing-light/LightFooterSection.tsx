"use client";

import Link from "next/link";
import { ArrowUp, Camera, MapPin } from "lucide-react";
import { motion } from "motion/react";

import LightLogo from "@/components/common/LightLogo";

const footerLinks = [
  {
    label: "Hakkımızda",
    href: "#about",
  },
  {
    label: "Deneyim",
    href: "#experience",
  },
  {
    label: "Lezzetler",
    href: "#signature",
  },
  {
    label: "Kariyer",
    href: "#career",
  },
];

export default function LightFooterSection() {
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-[#F2ECE3] text-[#2B241E]"
    >
      <div className="pointer-events-none absolute -left-44 top-0 h-[440px] w-[440px] rounded-full bg-[#D6B17A]/15 blur-3xl" />

      <div className="pointer-events-none absolute -right-44 bottom-0 h-[480px] w-[480px] rounded-full bg-white/70 blur-3xl" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-14 text-center text-[18vw] font-semibold leading-none tracking-[-0.08em] text-[#2B241E]/[0.025]"
      >
        ÖZSÜT
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-20 sm:pt-24 lg:px-10 lg:pt-28">
        <motion.div
          initial={{
            opacity: 0,
            y: 38,
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
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          
            <LightLogo
              width={210}
              height={116}
              priority={false}
            />
          

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.4em] text-[#B28A52]">
            Çok Yakında Akhisar&apos;da
          </p>

          <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Türkiye&apos;nin en büyük
            <span className="block text-[#B28A52]">
              Özsüt şubesi
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#6E6258]">
            1938&apos;den gelen lezzet mirası, Akhisar&apos;da yeni bir
            başlangıçla buluşuyor.
          </p>

          <nav
            aria-label="Footer navigasyonu"
            className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-4"
          >
            {footerLinks.map((item, index) => (
              <div
                key={item.href}
                className="flex items-center gap-7"
              >
                <a
                  href={item.href}
                  className="text-sm text-[#6E6258] transition duration-300 hover:text-[#B28A52]"
                >
                  {item.label}
                </a>

                {index < footerLinks.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden h-1 w-1 rounded-full bg-[#B28A52]/60 sm:block"
                  />
                )}
              </div>
            ))}
          </nav>

          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <div className="inline-flex items-center gap-3 text-sm text-[#6E6258]">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DFD5C9] bg-white/70">
                <MapPin className="h-4 w-4 text-[#B28A52]" />
              </span>

              Akhisar / Manisa
            </div>

            <a
              href="https://www.instagram.com/ozsutakhisar/"
              aria-label="Özsüt Akhisar Instagram hesabı"
              className="group inline-flex items-center gap-3 text-sm text-[#6E6258] transition hover:text-[#2B241E]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DFD5C9] bg-white/70 transition duration-300 group-hover:border-[#B28A52] group-hover:bg-[#B28A52] group-hover:text-white">
                <Camera className="h-4 w-4" />
              </span>

              Instagram
            </a>
          </div>

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.92,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.75,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-12 flex h-28 w-28 flex-col items-center justify-center rounded-full border border-[#B28A52]/35 text-[#B28A52]"
          >
            <span className="text-lg font-semibold">
              1938
            </span>

            <span className="my-2 h-px w-12 bg-[#B28A52]/50" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.26em]">
              Akhisar
            </span>
          </motion.div>

          <Link
            href="/kariyer"
            className="mt-10 inline-flex min-h-12 items-center justify-center rounded-full bg-[#2B241E] px-8 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#B28A52]"
          >
            İş Başvurusu Yap
          </Link>
        </motion.div>

        <div className="mt-16 flex flex-col items-center gap-5 border-t border-[#DFD5C9] pt-7 text-center text-xs text-[#8A7D72] sm:flex-row sm:justify-between sm:text-left">
          <p>
            © {new Date().getFullYear()} Özsüt Akhisar. Tüm hakları
            saklıdır.
          </p>

          <p>
            Modern mimari, köklü lezzet.
          </p>
        </div>
      </div>

      <motion.button
        type="button"
        onClick={scrollToTop}
        aria-label="Sayfanın en üstüne dön"
        whileHover={{
          y: -5,
        }}
        whileTap={{
          scale: 0.94,
        }}
        className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-[#B28A52]/40 bg-white/85 text-[#B28A52] shadow-xl backdrop-blur-xl transition hover:border-[#B28A52] hover:bg-[#B28A52] hover:text-white sm:bottom-7 sm:right-7"
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>
    </footer>
  );
}