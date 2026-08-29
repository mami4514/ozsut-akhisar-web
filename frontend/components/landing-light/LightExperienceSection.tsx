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
  mobileAspect: string;
  imagePosition?: string;
}

const experienceItems: ExperienceItem[] = [
  {
    title: "Modern Mimari",
    description:
      "Çağdaş tasarım anlayışıyla şekillenen ferah alanlar, güçlü detaylar ve Akhisar'a özel yeni nesil bir mekân deneyimi.",
    category: "Mimari",
    image: "/images/ozsut-experience-01.png",
    imageAlt: "Özsüt Akhisar modern mimari ve iç mekân görünümü",
    desktopClassName: "md:col-span-7 md:row-span-2",
    mobileAspect: "aspect-[4/3]",
    imagePosition: "object-center",
  },
  {
    title: "Sıcak Bir Atmosfer",
    description:
      "Günün her saatinde rahat hissedebileceğiniz, sıcak tonlarla ve doğal detaylarla şekillenen davetkâr bir ortam.",
    category: "Atmosfer",
    image: "/images/ozsut-experience-02.png",
    imageAlt: "Özsüt Akhisar sıcak ve davetkâr oturma alanı",
    desktopClassName: "md:col-span-5 md:row-span-1",
    mobileAspect: "aspect-[16/10]",
    imagePosition: "object-center",
  },
  {
    title: "Akhisar'ın Yeni Buluşma Noktası",
    description:
      "Ailenizle, dostlarınızla ve sevdiklerinizle paylaşacağınız anlara eşlik edecek yeni bir sosyal yaşam alanı.",
    category: "Akhisar",
    image: "/images/ozsut-experience-03.png",
    imageAlt: "Özsüt Akhisar açık alan ve buluşma noktası",
    desktopClassName: "md:col-span-5 md:row-span-1",
    mobileAspect: "aspect-[16/10]",
    imagePosition: "object-center",
  },
  {
    title: "Özsüt Deneyimi",
    description:
      "1938'den gelen lezzet mirasını modern servis anlayışı, güçlü sunumlar ve özel bir mekân atmosferiyle buluşturuyoruz.",
    category: "Lezzet & Deneyim",
    image: "/images/ozsut-render-37.jpg",
    imageAlt: "Özsüt Akhisar lezzet ve servis deneyimi",
    desktopClassName: "md:col-span-12 md:row-span-1",
    mobileAspect: "aspect-[16/9]",
    imagePosition: "object-center",
  },
];

const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 36,
    filter: "blur(7px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function LightExperienceSection() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-[#F3ECE3] py-24 sm:py-28 lg:py-36"
    >
      {/* Arka plan detayları */}
      <div className="pointer-events-none absolute -left-48 top-20 h-[520px] w-[520px] rounded-full bg-[#CDA978]/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-48 bottom-0 h-[520px] w-[520px] rounded-full bg-white/45 blur-[120px]" />

      <div className="relative mx-auto max-w-[1550px] px-6 sm:px-10 lg:px-14 xl:px-20">
        {/* ÜST BAŞLIK */}
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
            amount: 0.3,
          }}
          transition={{
            duration: 0.85,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="grid gap-8 border-b border-[#DCCFC1] pb-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end"
        >
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-[#9A6B35]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#9A6B35] sm:text-xs">
                Özsüt Akhisar Deneyimi
              </span>
            </div>
          </div>

          <div>
            <h2 className="max-w-5xl text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-[#241E19] sm:text-5xl lg:text-6xl xl:text-[4.7rem]">
              Sizi bekleyen
              <span className="block text-[#A87339]">
                yeni bir atmosfer.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-[15px] leading-7 text-[#71665C] sm:text-base sm:leading-8">
              Modern mimariyi, sıcak misafirperverliği ve Özsüt&apos;ün
              köklü lezzet anlayışını aynı çatı altında buluşturuyoruz.
            </p>
          </div>
        </motion.div>

        {/* MİMARİ GALERİ */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.08,
          }}
          className="
            mt-14
            grid
            grid-cols-1
            gap-4
            md:auto-rows-[270px]
            md:grid-cols-12
            lg:auto-rows-[300px]
            xl:auto-rows-[320px]
          "
        >
          {experienceItems.map((item) => (
            <motion.article
              key={item.title}
              variants={cardVariants}
              className={`
                group
                relative
                min-w-0
                overflow-hidden
                rounded-[1.6rem]
                bg-[#DDD2C6]
                shadow-[0_24px_65px_rgba(55,41,30,0.10)]
                ${item.mobileAspect}
                md:aspect-auto
                ${item.desktopClassName}
              `}
            >
              {/* FOTOĞRAF */}
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                quality={100}
                sizes="(max-width: 767px) 100vw, 70vw"
                className={`
                  object-cover
                  transition-transform
                  duration-[1100ms]
                  ease-out
                  md:group-hover:scale-[1.025]
                  ${item.imagePosition ?? "object-center"}
                `}
              />

              {/* Sadece alt okunabilirlik */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

              {/* Hover sıcak tonu */}
              <div className="absolute inset-0 bg-[#9A6B35]/0 transition-colors duration-700 md:group-hover:bg-[#9A6B35]/8" />

              {/* Sağ üst */}
              <motion.div
                whileHover={{
                  rotate: 45,
                  scale: 1.05,
                }}
                className="
                  absolute
                  right-5
                  top-5
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/30
                  bg-black/20
                  text-white
                  backdrop-blur-md
                  transition-all
                  duration-300
                  md:group-hover:border-white/70
                  md:group-hover:bg-white
                  md:group-hover:text-[#2B241E]
                "
              >
                <ArrowUpRight className="h-4 w-4" />
              </motion.div>

              {/* METİN */}
              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-7 lg:p-8">
                <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#E7C68F] sm:text-[10px]">
                  {item.category}
                </p>

                <h3 className="mt-2 max-w-2xl text-2xl font-semibold leading-[1.08] tracking-[-0.02em] sm:text-3xl">
                  {item.title}
                </h3>

                {/* Mobil açıklama */}
                <p className="mt-3 max-w-xl text-sm leading-6 text-white/80 md:hidden">
                  {item.description}
                </p>

                {/* Desktop hover açıklaması */}
                <div className="hidden grid-rows-[0fr] transition-all duration-500 md:grid md:group-hover:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="max-w-xl pt-3 text-sm leading-6 text-white/80 lg:text-[15px]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* ALT KISA VURGU */}
        <motion.div
          initial={{
            opacity: 0,
            y: 22,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.5,
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-14 flex flex-col justify-between gap-5 border-t border-[#DCCFC1] pt-8 sm:flex-row sm:items-center"
        >
          <p className="max-w-3xl text-xl font-medium leading-8 tracking-[-0.02em] text-[#342B24] sm:text-2xl">
            Her detay, Akhisar&apos;da daha uzun kalmak isteyeceğiniz
            bir deneyim için tasarlandı.
          </p>

          <div className="flex shrink-0 items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#9A6B35]">
            <span className="h-px w-10 bg-[#9A6B35]" />
            Akhisar / Manisa
          </div>
        </motion.div>
      </div>
    </section>
  );
}