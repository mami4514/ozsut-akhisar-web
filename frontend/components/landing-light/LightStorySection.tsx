"use client";

import Image from "next/image";
import { motion } from "motion/react";

const storyStats = [
  {
    value: "1938",
    label: "İzmir’de başlayan yolculuk",
  },
  {
    value: "Akhisar",
    label: "Yeni buluşma noktası",
  },
  {
    value: "Yeni Nesil",
    label: "Modern şube deneyimi",
  },
];

const textContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.12,
    },
  },
};

const textItemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function LightStorySection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-white py-24 sm:py-28 lg:py-32"
    >
      <div className="pointer-events-none absolute -left-40 top-16 h-[420px] w-[420px] rounded-full bg-[#D6B17A]/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-10 h-[440px] w-[440px] rounded-full bg-[#F0E8DE] blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-10">
        {/* Görsel alanı */}
        <motion.div
          initial={{
            opacity: 0,
            x: -56,
            scale: 0.96,
            filter: "blur(10px)",
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            scale: 1,
            filter: "blur(0px)",
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 1.05,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative pb-8"
        >
          <div className="pointer-events-none absolute -left-7 -top-7 hidden h-32 w-32 rounded-full border border-[#B28A52]/30 lg:block" />

          <div className="pointer-events-none absolute -bottom-2 -right-8 hidden h-52 w-52 rounded-full bg-[#EFE5D8] lg:block" />

          <div className="relative overflow-hidden rounded-[2rem] border border-[#EEE5DC] bg-[#F8F5EF] p-3 shadow-[0_30px_80px_rgba(61,46,33,0.12)]">
            <div className="relative min-h-[470px] overflow-hidden rounded-[1.5rem] sm:min-h-[580px]">
              <Image
                src="/images/ozsut-tarihce.jpeg"
                alt="Özsüt Akhisar iç mekân görünümü"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover transition duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              <motion.div
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
                  delay: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#E4C795]">
                  Köklü Bir Hikâye
                </p>

                <p className="mt-3 max-w-md text-2xl font-semibold leading-tight sm:text-3xl">
                  Gelenekten gelen lezzet, modern bir mimariyle buluşuyor.
                </p>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{
              opacity: 0,
              y: 22,
              scale: 0.96,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.75,
              delay: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute bottom-0 right-5 rounded-2xl border border-[#E7DDD0] bg-white/95 px-6 py-5 shadow-xl backdrop-blur-md sm:right-10"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-[#9A8B7F]">
              1938&apos;den Bugüne
            </p>

            <p className="mt-1 text-lg font-semibold text-[#2B241E]">
              Değişmeyen lezzet anlayışı
            </p>
          </motion.div>
        </motion.div>

        {/* Metin alanı */}
        <motion.div
          variants={textContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.25,
          }}
        >
          <motion.p
            variants={textItemVariants}
            className="text-xs font-semibold uppercase tracking-[0.4em] text-[#B28A52] sm:text-sm"
          >
            1938&apos;den Günümüze
          </motion.p>

          <motion.h2
            variants={textItemVariants}
            className="mt-7 text-4xl font-semibold leading-tight tracking-tight text-[#2B241E] sm:text-5xl lg:text-6xl"
          >
            Bir lezzet
            <span className="block text-[#B28A52]">
              hikâyesi
            </span>
          </motion.h2>

          <motion.div
            variants={textItemVariants}
            className="mt-8 space-y-6 text-base leading-8 text-[#6E6258] sm:text-lg"
          >
            <p>
              Özsüt&apos;ün 1938 yılında başlayan yolculuğu; kaliteye,
              ustalığa ve misafir memnuniyetine duyulan bağlılıkla büyümeye
              devam ediyor.
            </p>

            <p>
              Bu köklü miras şimdi modern mimarisi, geniş ürün seçenekleri
              ve sıcak atmosferiyle Akhisar&apos;da yepyeni bir deneyime
              dönüşüyor.
            </p>
          </motion.div>

          <motion.div
            variants={textItemVariants}
            className="mt-10 grid gap-5 sm:grid-cols-3"
          >
            {storyStats.map((item, index) => (
              <motion.div
                key={item.value}
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
                  duration: 0.65,
                  delay: 0.2 + index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="border-t border-[#DFD5C9] pt-5"
              >
                <p className="text-2xl font-semibold text-[#2B241E]">
                  {item.value}
                </p>

                <p className="mt-2 text-sm leading-6 text-[#887B70]">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.a
            variants={textItemVariants}
            href="#experience"
            whileHover={{
              x: 6,
            }}
            className="mt-10 inline-flex items-center gap-3 text-sm font-semibold text-[#2B241E] transition hover:text-[#B28A52]"
          >
            Özsüt Akhisar deneyimini keşfet

            <span aria-hidden="true">
              →
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}