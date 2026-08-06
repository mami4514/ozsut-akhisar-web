"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, type Variants } from "motion/react";

interface ExperienceItem {
  title: string;
  description: string;
  category: string;
  image: string;
  imageAlt: string;
  desktopClassName: string;
  mobileHeight: string;
}

const experienceItems: ExperienceItem[] = [
  {
    title: "Modern Mimari",
    description:
      "Çağdaş tasarım anlayışıyla hazırlanan ferah ve etkileyici yaşam alanları.",
    category: "Mimari",
    image: "/images/hero-interior.jpg",
    imageAlt: "Özsüt Akhisar modern iç mekân görünümü",
    desktopClassName: "md:col-span-7 md:row-span-2",
    mobileHeight: "h-[430px]",
  },
  {
    title: "Şık ve Sıcak Atmosfer",
    description:
      "Günün her saatinde keyifle vakit geçirebileceğiniz davetkâr bir ortam.",
    category: "Atmosfer",
    image: "/images/store-front.jpg",
    imageAlt: "Özsüt Akhisar dış cephe görünümü",
    desktopClassName: "md:col-span-5 md:row-span-1",
    mobileHeight: "h-[390px]",
  },
  {
    title: "Yeni Buluşma Noktası",
    description:
      "Ailenizle ve sevdiklerinizle paylaşacağınız anlara eşlik eden yeni adres.",
    category: "Akhisar",
    image: "/images/store-front.jpg",
    imageAlt: "Özsüt Akhisar şube görünümü",
    desktopClassName: "md:col-span-5 md:row-span-1",
    mobileHeight: "h-[390px]",
  },
  {
    title: "Özsüt Deneyimi",
    description:
      "Köklü lezzet mirasını modern servis anlayışıyla buluşturan özel bir deneyim.",
    category: "Lezzet",
    image: "/images/hero-interior.jpg",
    imageAlt: "Özsüt Akhisar restoran atmosferi",
    desktopClassName: "md:col-span-12 md:row-span-1",
    mobileHeight: "h-[420px]",
  },
];

const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 45,
    scale: 0.97,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function LightExperienceSection() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-[#F8F5EF] py-20 sm:py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute -left-44 top-20 h-[440px] w-[440px] rounded-full bg-[#D6B17A]/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-44 bottom-10 h-[480px] w-[480px] rounded-full bg-[#E9DCCB]/65 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Başlık */}
        <motion.div
          initial={{
            opacity: 0,
            y: 35,
            filter: "blur(7px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end"
        >
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#B28A52] sm:text-sm sm:tracking-[0.4em]">
              Özsüt Akhisar Deneyimi
            </p>

            <h2 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-[#2B241E] sm:mt-7 sm:text-5xl lg:text-6xl">
              Sizi bekleyen
              <span className="block text-[#B28A52]">
                yeni bir atmosfer
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-base leading-7 text-[#6E6258] sm:text-lg sm:leading-8">
            Modern mimariyi, sıcak misafirperverliği ve
            Özsüt&apos;ün köklü lezzet anlayışını aynı çatı altında
            buluşturuyoruz.
          </p>
        </motion.div>

        {/* Galeri */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.08,
          }}
          className="mt-10 grid grid-cols-1 gap-5 sm:mt-14 md:auto-rows-[280px] md:grid-cols-12"
        >
          {experienceItems.map((item) => (
            <motion.article
              key={item.title}
              variants={cardVariants}
              whileHover={{
                y: -5,
              }}
              className={`group relative w-full overflow-hidden rounded-[1.5rem] border border-white bg-[#EDE5DC] shadow-[0_20px_55px_rgba(66,49,34,0.12)] sm:rounded-[2rem] md:h-auto ${item.mobileHeight} ${item.desktopClassName}`}
            >
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                sizes="(max-width: 767px) 100vw, 60vw"
                className="object-cover transition duration-1000 ease-out md:group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/5" />

              <div className="absolute inset-0 bg-[#B28A52]/0 transition duration-500 md:group-hover:bg-[#B28A52]/10" />

              {/* Sağ üst ikon */}
              <motion.div
                whileHover={{
                  rotate: 45,
                  scale: 1.05,
                }}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur-md transition duration-300 sm:right-5 sm:top-5 sm:h-11 sm:w-11 md:group-hover:border-white/50 md:group-hover:bg-white md:group-hover:text-[#2B241E]"
              >
                <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </motion.div>

              {/* Metin */}
              <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7 lg:p-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#E5C896] sm:text-xs sm:tracking-[0.32em]">
                  {item.category}
                </p>

                <h3 className="mt-2 text-2xl font-semibold leading-tight sm:mt-3 sm:text-3xl">
                  {item.title}
                </h3>

                {/* Mobilde sürekli görünür */}
                <p className="mt-3 text-sm leading-6 text-white/80 md:hidden">
                  {item.description}
                </p>

                {/* Masaüstünde hover ile açılır */}
                <div className="hidden grid-rows-[0fr] transition-all duration-500 md:grid md:group-hover:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="max-w-xl pt-3 text-sm leading-6 text-white/75 sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}