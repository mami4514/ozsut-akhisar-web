"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, type Variants } from "motion/react";

interface SignatureItem {
  title: string;
  description: string;
  label: string;
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
  return (
    <section
      id="signature"
      className="relative overflow-hidden bg-white py-24 sm:py-28 lg:py-32"
    >
      <div className="pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-[#D6B17A]/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-44 bottom-0 h-[460px] w-[460px] rounded-full bg-[#F1E9DF] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
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
              className="group overflow-hidden rounded-[2rem] border border-[#E9DFD4] bg-[#F8F5EF] shadow-[0_24px_70px_rgba(66,49,34,0.10)] transition-shadow duration-300 hover:shadow-[0_30px_85px_rgba(66,49,34,0.16)]"
            >
              <div className="relative h-[320px] overflow-hidden sm:h-[380px]">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition duration-1000 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                <div className="absolute left-5 top-5 rounded-full border border-white/30 bg-black/20 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-white backdrop-blur-md">
                  {item.label}
                </div>

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
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D9CCBE] bg-white text-[#2B241E] transition group-hover:border-[#B28A52] group-hover:bg-[#B28A52] group-hover:text-white"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </motion.span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

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
            delay: 0.25,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-12 flex justify-center"
        >
          <Link
            href="/kariyer"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#D8CCBE] bg-[#F8F5EF] px-8 text-sm font-semibold text-[#2B241E] transition duration-300 hover:-translate-y-0.5 hover:border-[#B28A52] hover:bg-[#B28A52] hover:text-white"
          >
            Ekibimizin Bir Parçası Ol
          </Link>
        </motion.div>
      </div>
    </section>
  );
}