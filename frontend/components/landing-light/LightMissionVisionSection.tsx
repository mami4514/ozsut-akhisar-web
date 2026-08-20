"use client";

import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function LightMissionVisionSection() {
  return (
    <section
      id="mission-vision"
      className="relative overflow-hidden bg-[#F3ECE3] py-20 sm:py-24 lg:py-28"
    >
      {/* =====================================================
          ARKA PLAN
      ===================================================== */}

      <div className="pointer-events-none absolute -left-40 top-0 h-[440px] w-[440px] rounded-full bg-[#D2AA73]/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-48 bottom-0 h-[500px] w-[500px] rounded-full bg-white/45 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-[1500px] px-6 sm:px-10 lg:px-14 xl:px-20">
        {/* =====================================================
            SECTION BAŞLIĞI
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
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
            ease,
          }}
          className="max-w-[1050px]"
        >
          {/* Küçük label */}

          <div className="flex items-center gap-4">
            <motion.span
              initial={{
                scaleX: 0,
              }}
              whileInView={{
                scaleX: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.9,
                ease,
              }}
              className="h-px w-11 origin-left bg-[#A87339] sm:w-14"
            />

            <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#9A6B35] sm:text-xs">
              Değerlerimiz
            </p>
          </div>

          {/* Büyük başlık */}

          <h2
            className="
              mt-7
              max-w-[1000px]
              text-[2.65rem]
              font-semibold
              leading-[0.98]
              tracking-[-0.045em]
              text-[#241E19]
              sm:text-5xl
              md:text-6xl
              lg:text-[4.3rem]
              xl:text-[4.7rem]
            "
          >
            <span className="block">
              Bugünü özenle,
            </span>

            <span className="mt-2 block text-[#A87339] sm:mt-3">
              yarını güçlü bir vizyonla
            </span>

            <span className="block text-[#A87339]">
              kuruyoruz.
            </span>
          </h2>

          {/* Açıklama */}

          <p className="mt-7 max-w-[720px] text-[15px] leading-7 text-[#6F645B] sm:text-base sm:leading-8">
            Özsüt Akhisar&apos;da her kararımızın merkezinde kalite,
            misafir memnuniyeti ve uzun vadeli bir işletme anlayışı var.
          </p>
        </motion.div>

        {/* Ana ayırıcı */}

        <motion.div
          initial={{
            scaleX: 0,
          }}
          whileInView={{
            scaleX: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1.1,
            delay: 0.1,
            ease,
          }}
          className="mt-12 h-px w-full origin-left bg-[#D8C9B9] sm:mt-14"
        />

        {/* =====================================================
            MİSYON + VİZYON
        ===================================================== */}

        <div className="mt-12 grid gap-14 lg:mt-14 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          {/* ===================================================
              MİSYON
          =================================================== */}

          <motion.article
            initial={{
              opacity: 0,
              y: 38,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.85,
              ease,
            }}
            className="relative"
          >
            {/* 01 / Misyon */}

            <div className="flex items-center justify-between pb-5">
              <span className="text-[10px] font-semibold tracking-[0.3em] text-[#A87339]">
                01
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#A49383] sm:text-[11px]">
                Misyon
              </span>
            </div>

            {/* Hareketli çizgi */}

            <div className="relative h-px w-full overflow-hidden bg-[#D8C9B9]">
              <motion.div
                initial={{
                  scaleX: 0,
                }}
                whileInView={{
                  scaleX: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 1,
                  delay: 0.15,
                  ease,
                }}
                className="absolute inset-0 origin-left bg-[#A87339]/45"
              />
            </div>

            {/* Başlık */}

            <h3
              className="
                mt-7
                max-w-[650px]
                text-[2rem]
                font-semibold
                leading-[1.08]
                tracking-[-0.035em]
                text-[#2B241E]
                sm:text-[2.45rem]
                lg:text-[2.65rem]
                xl:text-[2.9rem]
              "
            >
              Misafirlerimize yalnızca
              <span className="block text-[#A87339]">
                lezzet değil, deneyim sunmak.
              </span>
            </h3>

            {/* Açıklama */}

            <p className="mt-6 max-w-[620px] text-[15px] leading-7 text-[#6F645B] sm:text-base sm:leading-8">
              Akhisar&apos;da misafirlerimize sıcak, güvenilir ve kaliteli
              bir deneyim sunmak; Özsüt&apos;ün köklü marka mirasını çağdaş
              hizmet anlayışıyla buluşturarak her ziyareti keyifli ve
              hatırlanabilir kılmak.
            </p>

            {/* Alt vurgu */}

            <motion.div
              initial={{
                width: 0,
              }}
              whileInView={{
                width: 64,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease,
              }}
              className="mt-9 h-px bg-[#A87339]"
            />
          </motion.article>

          {/* ===================================================
              VİZYON
          =================================================== */}

          <motion.article
            initial={{
              opacity: 0,
              y: 38,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.85,
              delay: 0.08,
              ease,
            }}
            className="relative"
          >
            {/* 02 / Vizyon */}

            <div className="flex items-center justify-between pb-5">
              <span className="text-[10px] font-semibold tracking-[0.3em] text-[#A87339]">
                02
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#A49383] sm:text-[11px]">
                Vizyon
              </span>
            </div>

            {/* Hareketli çizgi */}

            <div className="relative h-px w-full overflow-hidden bg-[#D8C9B9]">
              <motion.div
                initial={{
                  scaleX: 0,
                }}
                whileInView={{
                  scaleX: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 1,
                  delay: 0.23,
                  ease,
                }}
                className="absolute inset-0 origin-left bg-[#A87339]/45"
              />
            </div>

            {/* Başlık */}

            <h3
              className="
                mt-7
                max-w-[650px]
                text-[2rem]
                font-semibold
                leading-[1.08]
                tracking-[-0.035em]
                text-[#2B241E]
                sm:text-[2.45rem]
                lg:text-[2.65rem]
                xl:text-[2.9rem]
              "
            >
              <span className="block">
                Akhisar&apos;ın güçlü
              </span>

              <span className="block text-[#A87339]">
                buluşma noktalarından biri olmak.
              </span>
            </h3>

            {/* Açıklama */}

            <p className="mt-6 max-w-[620px] text-[15px] leading-7 text-[#6F645B] sm:text-base sm:leading-8">
              Lezzet, hizmet, mimari ve misafir deneyiminde çıtayı sürekli
              yükselten; şehirle birlikte büyüyen ve örnek bir işletme
              kültürü oluşturan güçlü bir marka deneyimi yaratmak.
            </p>

            {/* Alt vurgu */}

            <motion.div
              initial={{
                width: 0,
              }}
              whileInView={{
                width: 64,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
                delay: 0.38,
                ease,
              }}
              className="mt-9 h-px bg-[#A87339]"
            />
          </motion.article>
        </div>

        {/* =====================================================
            KARİYERE GEÇİŞ
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.35,
          }}
          transition={{
            duration: 0.85,
            delay: 0.1,
            ease,
          }}
          className="
            mt-16
            border-y
            border-[#D8C9B9]
            py-10
            text-center
            sm:mt-20
            sm:py-12
            lg:mt-24
          "
        >
          {/* Küçük label */}

          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-7 bg-[#A87339]" />

            <span className="text-[9px] font-semibold uppercase tracking-[0.34em] text-[#9A6B35] sm:text-[10px]">
              Birlikte Büyüyoruz
            </span>

            <span className="h-px w-7 bg-[#A87339]" />
          </div>

          {/* Manifesto */}

          <p
            className="
              mx-auto
              max-w-5xl
              text-2xl
              font-medium
              leading-[1.2]
              tracking-[-0.03em]
              text-[#2B241E]
              sm:text-3xl
              lg:text-[2.5rem]
            "
          >
            Akhisar&apos;la birlikte büyüyor,
            <span className="text-[#A87339]">
              {" "}
              geleceği birlikte kuruyoruz.
            </span>
          </p>

          {/* Kariyere bağlayan metin */}

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#796D62] sm:text-[15px]">
            Bu yolculuğun arkasındaki en büyük güç, aynı değerleri paylaşan
            güçlü bir ekip.
          </p>
        </motion.div>
      </div>
    </section>
  );
}