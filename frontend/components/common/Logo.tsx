import Image from "next/image";

interface LogoProps {
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

export default function Logo({
  width = 220,
  height = 120,
  priority = false,
  className = "",
}: LogoProps) {
  return (
    <Image
      src="/images/logo.png"
      alt="Özsüt Akhisar"
      width={width}
      height={height}
      priority={priority}
      className={`h-auto w-auto object-contain ${className}`}
    />
  );
}