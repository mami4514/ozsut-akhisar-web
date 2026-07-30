import Link from "next/link";
import {
  Instagram,
  MapPin,
  Phone,
} from "lucide-react";

export default function FooterSection() {
  return (
    <footer className="border-t border-white/10 bg-[#141210]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">

        <div className="grid gap-12 md:grid-cols-3">

          {/* Logo */}

          <div>

            <h3 className="text-3xl font-bold text-white">
              ÖZSÜT
            </h3>

            <p className="mt-4 leading-7 text-zinc-400">
              Türkiye'nin en büyük Özsüt şubesi
              çok yakında Akhisar'da sizlerle.
            </p>

          </div>

          {/* İletişim */}

          <div>

            <h4 className="font-semibold text-white">
              İletişim
            </h4>

            <div className="mt-6 space-y-4 text-zinc-400">

              <div className="flex items-center gap-3">

                <Phone className="h-5 w-5 text-[#D6B17A]" />

                Yakında

              </div>

              <div className="flex items-center gap-3">

                <MapPin className="h-5 w-5 text-[#D6B17A]" />

                Akhisar / Manisa

              </div>

            </div>

          </div>

          {/* Sosyal */}

          <div>

            <h4 className="font-semibold text-white">
              Bizi Takip Edin
            </h4>

            <div className="mt-6">

              <Link
                href="#"
                className="inline-flex items-center gap-3 text-zinc-400 transition hover:text-[#D6B17A]"
              >

                <Instagram className="h-5 w-5" />

                Instagram

              </Link>

            </div>

          </div>

        </div>

        <div className="mt-14 border-t border-white/10 pt-8 text-center text-sm text-zinc-500">

          © {new Date().getFullYear()} Özsüt Akhisar.
          Tüm hakları saklıdır.

        </div>

      </div>
    </footer>
  );
}