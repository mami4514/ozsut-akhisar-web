interface ApplicationInfoCardProps {
  status: string;
  appliedAt: string;
  cvUrl: string | null;
  kvkkApproved: boolean;
}

function formatStatus(status: string) {
  const statuses: Record<string, string> = {
    new: "Yeni Başvuru",
    interview: "İnceleniyor",
    reviewing: "İnceleniyor",
    approved: "Onaylandı",
    rejected: "Reddedildi",
  };

  return statuses[status] ?? status;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export default function ApplicationInfoCard({
  status,
  appliedAt,
  cvUrl,
  kvkkApproved,
}: ApplicationInfoCardProps) {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Başvuru Bilgileri</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Başvuru süreci ve belgeler
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <p className="text-sm text-muted-foreground">Durum</p>

          <p className="mt-1 font-medium">{formatStatus(status)}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Başvuru Tarihi</p>

          <p className="mt-1 font-medium">{formatDate(appliedAt)}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">KVKK Onayı</p>

          <p className="mt-1 font-medium">
            {kvkkApproved ? "✅ Onaylandı" : "❌ Onaylanmadı"}
          </p>
        </div>

        <div>
          <p className="mb-2 text-sm text-muted-foreground">CV</p>

          {cvUrl ? (
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
            >
              📄 CV Görüntüle
            </a>
          ) : (
            <p className="text-sm text-muted-foreground">
              CV yüklenmemiş.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}