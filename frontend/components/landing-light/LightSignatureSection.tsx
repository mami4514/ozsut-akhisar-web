"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { motion, type Variants } from "motion/react";
import { useRef } from "react";

interface SignatureItem {
  title: string;
  description: string;
  label: string;
  image: string;
  imageAlt: string;
}

interface MenuItem {
  title: string;
  category: string;
  image: string;
  imageAlt: string;
}

const signatureItems: SignatureItem[] = [
  {
    title: "Pastalar",
    description:
      "Özel günlere, güzel anlara ve tatlı molalara eşlik eden Özsüt klasikleri.",
    label: "İmza Lezzet",
    image: "/images/ozsut-pasta.jpg",
    imageAlt: "Özsüt pasta ve tatlı sunumu",
  },
  {
    title: "Kahveler",
    description:
      "Özenle hazırlanan kahveler ve sıcak buluşmalara eşlik eden keyifli sunumlar.",
    label: "Kahve Deneyimi",
    image: "/images/ozsut-kahve.jpg",
    imageAlt: "Özsüt kahve deneyimi",
  },
  {
    title: "Kahvaltı",
    description:
      "Güne lezzetli bir başlangıç için zengin seçenekler ve sıcak bir masa deneyimi.",
    label: "Günün İlk Keyfi",
    image: "/images/ozsut-kahvaltı.png",
    imageAlt: "Özsüt kahvaltı sunumu",
  },
];

const menuItems: MenuItem[] = [
  {
    title: "Manisa Köfte",
    category: "Ana Yemek",
    image: "/images/menu/manisa-kofte.jpg",
    imageAlt: "Özsüt Manisa Köfte",
  },
  {
    title: "Beğendili Izgara Tavuk",
    category: "Ana Yemek",
    image: "/images/menu/begendili-tavuk.jpg",
    imageAlt: "Özsüt Beğendili Izgara Tavuk",
  },
  {
    title: "Izgara Bonfile",
    category: "Izgara",
    image: "/images/menu/izgara-bonfile.jpg",
    imageAlt: "Özsüt Izgara Bonfile",
  },
  {
    title: "Özsüt Burger",
    category: "Burger",
    image: "/images/menu/ozsut-burger.jpg",
    imageAlt: "Özsüt Burger",
  },
  {
    title: "Kazandibi",
    category: "Özsüt Klasiği",
    image: "/images/menu/kazandibi.jfif",
    imageAlt: "Özsüt Kazandibi",
  },
  {
    title: "Antep Fıstıklı Sütlaç",
    category: "Sütlü Tatlı",
    image: "/images/menu/fistikli-sutlac.jpg",
    imageAlt: "Özsüt Antep Fıstıklı Sütlaç",
  },
  {
    title: "Kule Kahvaltı",
    category: "Kahvaltı",
    image: "/images/menu/kule-kahvalti.jpg",
    imageAlt: "Özsüt Kule Kahvaltı",
  },
  {
    title: "Özel Pastalar",
    category: "Pastalar",
    image: "/images/menu/ozel-pasta.jpg",
    imageAlt: "Özsüt özel pasta çeşitleri",
  },
  {
    title: "Kahve Keyfi",
    category: "Sıcak İçecek",
    image: "/images/menu/kahve.jpg",
    imageAlt: "Özsüt kahve sunumu",
  },
  {
    title: "Pizza & Paylaşım",
    category: "Sıcak Lezzet",
    image: "/images/menu/pizza.jpg",
    imageAlt: "Özsüt pizza sunumu",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 42,
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

export default function LightSignatureSection() {
  const menuScrollRef = useRef<HTMLDivElement>(null);

  const scrollMenu = (direction: "left" | "right") => {
    const container = menuScrollRef.current;

    if (!container) {
      return;
    }

    const amount = Math.min(
      container.clientWidth * 0.78,
      520
    );

    container.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="signature"
      className="relative overflow-hidden bg-white py-24 sm:py-28 lg:py-32"
    >
      {/* =====================================================
          ARKA PLAN
      ===================================================== */}

      <div className="pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-[#D6B17A]/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-44 bottom-0 h-[460px] w-[460px] rounded-full bg-[#F1E9DF] blur-3xl" />

      <div className="relative mx-auto max-w-[1450px] px-6 lg:px-10 xl:px-14">
        {/* =====================================================
            ANA BAŞLIK
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 34,
            filter: "blur(7px)",
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
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#B28A52] sm:text-sm">
            Lezzet Dünyası
          </p>

          <h2 className="mt-7 text-4xl font-semibold leading-tight tracking-tight text-[#2B241E] sm:text-5xl lg:text-6xl">
            Özsüt&apos;ün
            <span className="text-[#B28A52]">
              {" "}
              imza lezzetleri
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#6E6258] sm:text-lg">
            Klasik Özsüt lezzetleri, modern sunum anlayışı ve
            Akhisar&apos;a özel yeni bir deneyimle çok yakında sizlerle.
          </p>
        </motion.div>

        {/* =====================================================
            3 ANA KART
        ===================================================== */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.12,
          }}
          className="mt-14 grid gap-6 lg:grid-cols-3"
        >
          {signatureItems.map((item) => (
            <motion.article
              key={item.title}
              variants={itemVariants}
              whileHover={{
                y: -8,
              }}
              className="
                group
                overflow-hidden
                rounded-[2rem]
                border
                border-[#E9DFD4]
                bg-[#F8F5EF]
                shadow-[0_24px_70px_rgba(66,49,34,0.10)]
                transition-shadow
                duration-300
                hover:shadow-[0_30px_85px_rgba(66,49,34,0.16)]
              "
            >
              <div className="relative h-[320px] overflow-hidden sm:h-[380px]">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  quality={100}
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="
                    object-cover
                    transition-transform
                    duration-1000
                    ease-out
                    group-hover:scale-105
                  "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                {/* Label */}

                <div className="absolute left-5 top-5 rounded-full border border-white/30 bg-black/20 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-white backdrop-blur-md">
                  {item.label}
                </div>

                {/* Başlık */}

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-7">
                  <h3 className="text-3xl font-semibold">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-7">
                <p className="text-sm leading-7 text-[#6E6258] sm:text-base">
                  {item.description}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9B8464]">
                    Çok Yakında
                  </span>

                  <motion.span
                    whileHover={{
                      rotate: 45,
                      scale: 1.05,
                    }}
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#D9CCBE]
                      bg-white
                      text-[#2B241E]
                      transition
                      group-hover:border-[#B28A52]
                      group-hover:bg-[#B28A52]
                      group-hover:text-white
                    "
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </motion.span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* =====================================================
            MENÜDEN SEÇKİLER
        ===================================================== */}

        <div className="mt-24 border-t border-[#E5D9CD] pt-14 sm:mt-28">
          {/* Menü başlığı */}

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
              amount: 0.4,
            }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              flex
              flex-col
              justify-between
              gap-7
              md:flex-row
              md:items-end
            "
          >
            <div>
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-[#9A6B35]" />

                <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#9A6B35] sm:text-xs">
                  Menüden Seçkiler
                </p>
              </div>

              <h3
                className="
                  mt-5
                  max-w-4xl
                  text-3xl
                  font-semibold
                  leading-[1.05]
                  tracking-[-0.04em]
                  text-[#2B241E]
                  sm:text-4xl
                  lg:text-5xl
                "
              >
                Tatlıdan kahvaltıya,
                <span className="block text-[#A87339]">
                  ızgaradan kahveye.
                </span>
              </h3>

              <p className="mt-5 max-w-2xl text-[15px] leading-7 text-[#71665C] sm:text-base">
                Özsüt Akhisar&apos;da günün her saatine eşlik edecek
                farklı lezzetlerden küçük bir ön izleme.
              </p>
            </div>

            {/* Desktop oklar */}

            <div className="hidden gap-3 md:flex">
              <button
                type="button"
                onClick={() => scrollMenu("left")}
                aria-label="Önceki ürünler"
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#DCCFC1]
                  bg-[#FAF7F2]
                  text-[#2B241E]
                  transition-all
                  duration-300
                  hover:border-[#A87339]
                  hover:bg-[#A87339]
                  hover:text-white
                "
              >
                <ArrowLeft className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => scrollMenu("right")}
                aria-label="Sonraki ürünler"
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#DCCFC1]
                  bg-[#FAF7F2]
                  text-[#2B241E]
                  transition-all
                  duration-300
                  hover:border-[#A87339]
                  hover:bg-[#A87339]
                  hover:text-white
                "
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>

          {/* ===================================================
              CAROUSEL
          =================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.9,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative mt-10"
          >
            <div
              ref={menuScrollRef}
              className="
                flex
                snap-x
                snap-mandatory
                gap-5
                overflow-x-auto
                pb-5
                [scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden
              "
            >
              {menuItems.map((item, index) => (
                <article
                  key={item.title}
                  className="
                    group
                    relative
                    min-w-[76vw]
                    snap-start
                    overflow-hidden
                    rounded-[1.6rem]
                    bg-[#EAE0D5]
                    shadow-[0_18px_45px_rgba(56,42,29,0.09)]
                    sm:min-w-[320px]
                    md:min-w-[330px]
                    lg:min-w-[300px]
                    xl:min-w-[315px]
                  "
                >
                  {/* FOTOĞRAF */}

                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      quality={100}
                      sizes="(max-width: 640px) 76vw, 330px"
                      className="
                        object-cover
                        transition-transform
                        duration-[900ms]
                        ease-out
                        group-hover:scale-[1.04]
                      "
                    />

                    {/* Daha hafif gradient */}

                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/75
                        via-black/5
                        via-35%
                        to-transparent
                      "
                    />

                    {/* Kart numarası */}

                    <span
                      className="
                        absolute
                        right-5
                        top-5
                        text-[10px]
                        font-semibold
                        tracking-[0.25em]
                        text-[#9A6B35]/70
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Ürün bilgisi */}

                    <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                      <p
                        className="
                          text-[9px]
                          font-semibold
                          uppercase
                          tracking-[0.28em]
                          text-[#E8C68E]
                        "
                      >
                        {item.category}
                      </p>

                      <h4
                        className="
                          mt-2
                          text-2xl
                          font-semibold
                          leading-tight
                          tracking-[-0.025em]
                        "
                      >
                        {item.title}
                      </h4>

                      <div
                        className="
                          mt-4
                          h-px
                          w-9
                          bg-[#E0B36D]
                          transition-all
                          duration-500
                          group-hover:w-16
                        "
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Mobil swipe */}

            <div
              className="
                mt-4
                flex
                items-center
                justify-center
                gap-3
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-[#9A8878]
                md:hidden
              "
            >
              <span className="h-px w-7 bg-[#C9B8A5]" />

              Kaydırarak Keşfet

              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </motion.div>
        </div>

        {/* =====================================================
            ALT KAPANIŞ
        ===================================================== */}

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
          }}
          transition={{
            duration: 0.75,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mt-16
            flex
            flex-col
            items-center
            justify-between
            gap-6
            rounded-[1.7rem]
            bg-[#F8F5EF]
            px-6
            py-7
            text-center
            sm:px-8
            md:flex-row
            md:text-left
          "
        >
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#9A6B35]">
              Daha Fazlası Çok Yakında
            </p>

            <p className="mt-2 text-lg font-semibold text-[#2B241E] sm:text-xl">
              Özsüt&apos;ün geniş lezzet dünyası Akhisar&apos;da.
            </p>
          </div>

          <Link
            href="/kariyer"
            className="
              inline-flex
              min-h-12
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-[#D8CCBE]
              bg-white
              px-7
              text-sm
              font-semibold
              text-[#2B241E]
              transition
              duration-300
              hover:-translate-y-0.5
              hover:border-[#B28A52]
              hover:bg-[#B28A52]
              hover:text-white
            "
          >
            Ekibimizin Bir Parçası Ol
          </Link>
        </motion.div>
      </div>
    </section>
  );
}