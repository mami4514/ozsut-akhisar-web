import Link from "next/link";
import { MapPin, Phone } from "lucide-react";

import Logo from "@/components/common/Logo";

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function FooterSection() {
  return (
    <footer className="border-t border-white/10 bg-[#141210]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Logo width={170} height={90} />

            <p className="mt-4 leading-7 text-zinc-400">
              Türkiye&apos;nin en büyük Özsüt şubesi çok yakında
              Akhisar&apos;da sizlerle.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white">
              İletişim
            </h4>

            <div className="mt-6 space-y-4 text-zinc-400">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#D6B17A]" />

                <span>Yakında</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-[#D6B17A]" />

                <span>Akhisar / Manisa</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white">
              Bizi Takip Edin
            </h4>

            <div className="mt-6">
              <Link
                href="#"
                aria-label="Özsüt Akhisar Instagram hesabı"
                className="inline-flex items-center gap-3 text-zinc-400 transition hover:text-[#D6B17A]"
              >
                <InstagramIcon />

                <span>Instagram</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} Özsüt Akhisar. Tüm hakları
          saklıdır.
        </div>
      </div>
    </footer>
  );
}