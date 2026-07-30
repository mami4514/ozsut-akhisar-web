import Image from "next/image";

export default function StorySection() {
  return (
    <section
      id="about"
      className="bg-[#181513] py-24"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-10">

        {/* FOTOĞRAF */}

        <div className="overflow-hidden rounded-3xl shadow-2xl">

          <Image
            src="/images/store-front.jpg"
            alt="Özsüt Akhisar"
            width={900}
            height={700}
            className="h-full w-full object-cover transition duration-700 hover:scale-105"
          />

        </div>

        {/* YAZILAR */}

        <div>

          <p className="text-sm uppercase tracking-[0.35em] text-[#D6B17A]">
            1938'DEN GÜNÜMÜZE
          </p>

          <h2 className="mt-6 text-4xl font-bold text-white lg:text-5xl">
            Gelenekten Gelen
            <span className="block text-[#D6B17A]">
              Eşsiz Lezzet
            </span>
          </h2>

          <p className="mt-8 leading-8 text-zinc-300">
            1938 yılında başlayan Özsüt yolculuğu,
            yıllardır kaliteyi, lezzeti ve misafir
            memnuniyetini ön planda tutarak devam ediyor.

            Şimdi ise bu güçlü marka deneyimini
            modern mimarisi ve yepyeni konseptiyle
            Akhisar'a taşıyoruz.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-6">

            <div>

              <h3 className="text-4xl font-bold text-[#D6B17A]">
                1938
              </h3>

              <p className="mt-2 text-sm text-zinc-400">
                Kuruluş
              </p>

            </div>

            <div>

              <h3 className="text-4xl font-bold text-[#D6B17A]">
                Akhisar
              </h3>

              <p className="mt-2 text-sm text-zinc-400">
                Yeni Şube
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}