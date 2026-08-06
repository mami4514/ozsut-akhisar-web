"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

import LightLogo from "@/components/common/LightLogo";

const navigationItems = [
  {
    id: "about",
    label: "Hakkımızda",
    href: "#about",
  },
  {
    id: "experience",
    label: "Deneyim",
    href: "#experience",
  },
  {
    id: "signature",
    label: "Lezzetler",
    href: "#signature",
  },
  {
    id: "career",
    label: "Kariyer",
    href: "#career",
  },
  {
    id: "contact",
    label: "İletişim",
    href: "#contact",
  },
];

export default function LightNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] =
    useState<string | null>(null);

  useEffect(() => {
    function updateNavbarState() {
      const scrollPosition = window.scrollY;

      setIsScrolled(scrollPosition > 40);

      // Hero alanındayken hiçbir menüyü aktif gösterme.
      if (scrollPosition < 300) {
        setActiveSection(null);
        return;
      }

      /*
       * Viewport'un üstünden yaklaşık %35 aşağıda bulunan
       * hayalî çizginin hangi section içinde kaldığını buluyoruz.
       * Uzun ve kısa bölümlerde daha tutarlı çalışır.
       */
      const detectionLine = window.innerHeight * 0.35;

      const currentSection = navigationItems.find((item) => {
        const section = document.getElementById(item.id);

        if (!section) {
          return false;
        }

        const rect = section.getBoundingClientRect();

        return (
          rect.top <= detectionLine &&
          rect.bottom > detectionLine
        );
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
        return;
      }

      /*
       * Detection line hiçbir section içinde değilse,
       * ekranın üstüne en yakın geçmiş bölümü bul.
       */
      const passedSections = navigationItems
        .map((item) => {
          const section = document.getElementById(item.id);

          return {
            id: item.id,
            top: section?.getBoundingClientRect().top ?? Infinity,
          };
        })
        .filter((item) => item.top <= detectionLine);

      const closestSection = passedSections.at(-1);

      setActiveSection(closestSection?.id ?? null);
    }

    updateNavbarState();

    window.addEventListener("scroll", updateNavbarState, {
      passive: true,
    });

    window.addEventListener("resize", updateNavbarState);

    return () => {
      window.removeEventListener(
        "scroll",
        updateNavbarState
      );

      window.removeEventListener(
        "resize",
        updateNavbarState
      );
    };
  }, []);

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: isScrolled
          ? "rgba(248, 245, 239, 0.95)"
          : "rgba(248, 245, 239, 0.78)",

        boxShadow: isScrolled
          ? "0 14px 40px rgba(68, 50, 35, 0.08)"
          : "0 0 0 rgba(0, 0, 0, 0)",
      }}
      transition={{
        duration: 0.3,
      }}
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-[border-color] duration-300 ${
        isScrolled
          ? "border-[#B28A52]/30"
          : "border-[#E7DDD0]/70"
      }`}
    >
      <motion.div
        initial={false}
        animate={{
          height: isScrolled ? 84 : 112,
        }}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10"
      >
        <Link
          href="/light-preview"
          aria-label="Özsüt Akhisar ana sayfa"
          className="flex items-center"
        >
          <motion.div
            initial={false}
            animate={{
              scale: isScrolled ? 0.86 : 1,
            }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="origin-left"
          >
            <LightLogo
              width={160}
              height={90}
              priority
              className="max-h-20 max-w-40"
            />
          </motion.div>
        </Link>

        <nav
          aria-label="Ana navigasyon"
          className="hidden items-center gap-8 lg:flex"
        >
          {navigationItems.map((item) => {
            const isActive =
              activeSection === item.id;

            return (
              <a
                key={item.id}
                href={item.href}
                aria-current={
                  isActive ? "location" : undefined
                }
                className={`relative py-2 text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-[#B28A52]"
                    : "text-[#4B4037] hover:text-[#B28A52]"
                }`}
              >
                {item.label}

                {isActive && (
                  <motion.span
                    layoutId="light-navbar-indicator"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 32,
                    }}
                    className="absolute inset-x-0 -bottom-1 mx-auto h-[2px] rounded-full bg-[#B28A52]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        <motion.div
          initial={false}
          animate={{
            scale: isScrolled ? 0.94 : 1,
          }}
          transition={{
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="origin-right"
        >
          <Link
            href="/kariyer"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#2B241E] px-5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(43,36,30,0.14)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#B28A52]"
          >
            İş Başvurusu
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          scaleX: isScrolled ? 1 : 0,
          opacity: isScrolled ? 1 : 0,
        }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="h-px origin-left bg-gradient-to-r from-transparent via-[#B28A52]/70 to-transparent"
      />
    </motion.header>
  );
}