"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
} from "motion/react";
import {
  Building2,
  ChefHat,
  Coffee,
  Sparkles,
} from "lucide-react";
import {
  type ComponentType,
  type SVGProps,
  useEffect,
  useRef,
  useState,
} from "react";

interface OpeningStep {
  title: string;
  description: string;
  progress: number;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const openingSteps: OpeningStep[] = [
  {
    title: "Mimari Hazırlık",
    description:
      "İç ve dış mekândaki son mimari uygulamalar tamamlanıyor.",
    progress: 92,
    icon: Building2,
  },
  {
    title: "Ekip Kurulumu",
    description:
      "Açılış ekibimizin seçimi ve hazırlık süreci devam ediyor.",
    progress: 76,
    icon: ChefHat,
  },
  {
    title: "Lezzet Hazırlıkları",
    description:
      "Özsüt lezzetlerinin sunum ve servis planlamaları yapılıyor.",
    progress: 87,
    icon: Coffee,
  },
  {
    title: "Son Dokunuşlar",
    description:
      "Misafirlerimizi karşılamadan önce son ayrıntılar hazırlanıyor.",
    progress: 81,
    icon: Sparkles,
  },
];

interface ProgressCardProps {
  item: OpeningStep;
  index: number;
}

function ProgressCard({
  item,
  index,
}: ProgressCardProps) {
  const cardRef = useRef<HTMLElement | null>(null);

  const isInView = useInView(cardRef, {
    once: true,
    amount: 0.45,
  });

  const progressValue = useMotionValue(0);

  const smoothProgress = useSpring(progressValue, {
    stiffness: 65,
    damping: 18,
    mass: 0.8,
  });

  const [displayProgress, setDisplayProgress] = useState(0);

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    setDisplayProgress(Math.round(latest));
  });

  useEffect(() => {
    if (isInView) {
      progressValue.set(item.progress);
    }
  }, [isInView, item.progress, progressValue]);

  const Icon = item.icon;

  return (
    <motion.article
      ref={cardRef}
      initial={{
        opacity: 0,
        y: 36,
        scale: 0.97,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
            }
          : undefined
      }
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -6,
      }}
      className="group rounded-[1.75rem] border border-[#E5DACE] bg-white/75 p-6 shadow-[0_20px_60px_rgba(71,54,38,0.08)] backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_26px_70px_rgba(71,54,38,0.14)] sm:p-7"
    >
      <div className="flex items-start justify-between gap-5">
        <div className="flex min-w-0 items-start gap-4">
          <motion.div
            whileHover={{
              rotate: 5,
              scale: 1.06,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 18,
            }}
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#B28A52]/10 text-[#B28A52] transition-colors duration-300 group-hover:bg-[#B28A52] group-hover:text-white"
          >
            <Icon className="h-6 w-6" />
          </motion.div>

          <div>
            <h3 className="text-lg font-semibold text-[#2B241E] sm:text-xl">
              {item.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#766A60]">
              {item.description}
            </p>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <span className="text-2xl font-semibold tabular-nums text-[#B28A52]">
            %{displayProgress}
          </span>
        </div>
      </div>

      <div className="relative mt-7 h-2 overflow-hidden rounded-full bg-[#EDE5DC]">
        <motion.div
          initial={{
            width: "0%",
          }}
          animate={
            isInView
              ? {
                  width: `${item.progress}%`,
                }
              : undefined
          }
          transition={{
            duration: 1.4,
            delay: 0.25 + index * 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-[#C49B62] via-[#D6B17A] to-[#E5C896]"
        >
          {isInView && (
            <motion.div
              initial={{
                x: "-120%",
              }}
              animate={{
                x: "220%",
              }}
              transition={{
                duration: 1.4,
                delay: 0.7 + index * 0.12,
                ease: "easeInOut",
              }}
              className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/65 to-transparent blur-sm"
            />
          )}
        </motion.div>
      </div>
    </motion.article>
  );
}

export default function OpeningProgress() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
  });

  return (
    <section
      ref={sectionRef}
      id="opening-progress"
      className="relative overflow-hidden bg-[#F2ECE3] py-24 sm:py-28"
    >
      <div className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-[#D6B17A]/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-[440px] w-[440px] rounded-full bg-white/70 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : undefined
          }
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D9CCBE] bg-white/70 px-4 py-2 backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B28A52] opacity-50" />

              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#B28A52]" />
            </span>

            <span className="text-xs font-semibold uppercase tracking-[0.26em] text-[#8B704C]">
              Açılış Hazırlıkları
            </span>
          </div>

          <h2 className="mt-7 text-4xl font-semibold tracking-tight text-[#2B241E] sm:text-5xl lg:text-6xl">
            Açılışa
            <span className="text-[#B28A52]">
              {" "}
              hazırlanıyoruz
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#6E6258] sm:text-lg">
            Özsüt Akhisar&apos;ın kapılarını açması için son
            hazırlıklarımız devam ediyor. Kesin açılış tarihi çok
            yakında duyurulacak.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {openingSteps.map((item, index) => (
            <ProgressCard
              key={item.title}
              item={item}
              index={index}
            />
          ))}
        </div>

        <motion.a
          href="#about"
          aria-label="Hikâye bölümüne ilerle"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : undefined
          }
          transition={{
            duration: 0.8,
            delay: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto mt-20 flex w-fit flex-col items-center"
        >
          <span className="mb-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#9C8765]">
            Hikâyeyi Keşfet
          </span>

          <div className="flex h-14 w-8 justify-center rounded-full border-2 border-[#C6A26C]">
            <motion.span
              animate={{
                y: [7, 20, 7],
                opacity: [1, 0.45, 1],
              }}
              transition={{
                duration: 1.7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mt-1.5 h-2.5 w-2.5 rounded-full bg-[#C6A26C]"
            />
          </div>
        </motion.a>
      </div>
    </section>
  );
}