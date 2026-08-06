import Image from "next/image";

interface LightLogoProps {
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

export default function LightLogo({
  width = 160,
  height = 90,
  priority = false,
  className = "",
}: LightLogoProps) {
  return (
    <Image
      src="/images/logo-transparent.png"
      alt="Özsüt Akhisar"
      width={width}
      height={height}
      priority={priority}
      className={`object-contain ${className}`}
    />
  );
}