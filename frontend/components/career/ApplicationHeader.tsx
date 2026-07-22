import Link from "next/link";

interface ApplicationHeaderProps {
  fullName: string;
  position: string | null;
  status: string;
}

const statusConfig = {
  new: {
    label: "Yeni",
    className: "bg-blue-100 text-blue-800",
  },
  reviewing: {
    label: "İnceleniyor",
    className: "bg-yellow-100 text-yellow-800",
  },
  interview: {
    label: "Mülakat",
    className: "bg-purple-100 text-purple-800",
  },
  accepted: {
    label: "Onaylandı",
    className: "bg-green-100 text-green-800",
  },
  rejected: {
    label: "Reddedildi",
    className: "bg-red-100 text-red-800",
  },
} as const;

export default function ApplicationHeader({
  fullName,
  position,
  status,
}: ApplicationHeaderProps) {
  const currentStatus =
    statusConfig[status as keyof typeof statusConfig] ?? statusConfig.new;

  return (
    <div className="mb-6 rounded-xl border bg-white p-6 shadow-sm">
      <Link
        href="/dashboard"
        className="mb-4 inline-flex text-sm text-gray-500 hover:text-black"
      >
        ← Başvurulara Dön
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{fullName}</h1>

          <p className="mt-1 text-gray-500">
            {position ?? "Pozisyon belirtilmemiş"}
          </p>
        </div>

        <span
          className={`rounded-full px-4 py-2 text-sm font-medium ${currentStatus.className}`}
        >
          {currentStatus.label}
        </span>
      </div>
    </div>
  );
}