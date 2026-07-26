"use client";

import { FileText, Save } from "lucide-react";
import { useEffect, useState } from "react";

import {
  updateJobApplicationStatus,
  type JobApplicationDetail,
} from "@/services/job-application.service";

interface ApplicationStatusCardProps {
  applicationId: number;
  initialStatus: string;
  initialAdminNote: string | null;
  initialUpdatedAt: string;
  onUpdated: (application: JobApplicationDetail) => void;
}

const statusOptions = [
  {
    value: "new",
    label: "Yeni",
  },
  {
    value: "reviewing",
    label: "İnceleniyor",
  },
  {
    value: "interview",
    label: "Mülakat",
  },
  {
    value: "accepted",
    label: "Onaylandı",
  },
  {
    value: "rejected",
    label: "Reddedildi",
  },
];

function formatDate(date: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(date));
}

export default function ApplicationStatusCard({
  applicationId,
  initialStatus,
  initialAdminNote,
  initialUpdatedAt,
  onUpdated,
}: ApplicationStatusCardProps) {
  const [status, setStatus] = useState(initialStatus);
  const [adminNote, setAdminNote] = useState(initialAdminNote ?? "");
  const [savedAdminNote, setSavedAdminNote] = useState(
    initialAdminNote ?? ""
  );
  const [savedUpdatedAt, setSavedUpdatedAt] = useState(initialUpdatedAt);

  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!successMessage) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [successMessage]);

  async function handleSave() {
    setIsSaving(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const updatedApplication = await updateJobApplicationStatus(
        applicationId,
        {
          status,
          admin_note: adminNote.trim() === "" ? null : adminNote.trim(),
        }
      );

      setStatus(updatedApplication.status);
      setAdminNote(updatedApplication.admin_note ?? "");
      setSavedAdminNote(updatedApplication.admin_note ?? "");
      setSavedUpdatedAt(updatedApplication.updated_at);

      onUpdated(updatedApplication);

      setSuccessMessage(
        "Başvuru değerlendirmesi başarıyla kaydedildi."
      );
    } catch (error) {
      console.error("Başvuru durumu güncellenemedi:", error);

      setErrorMessage(
        "Başvuru değerlendirmesi kaydedilirken bir hata oluştu."
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          Başvuru Değerlendirme
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Başvurunun durumunu güncelleyin ve değerlendirme notunuzu ekleyin.
        </p>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <label
            htmlFor="application-status"
            className="text-sm font-medium"
          >
            Başvuru Durumu
          </label>

          <select
            id="application-status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            disabled={isSaving}
            className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="application-admin-note"
            className="text-sm font-medium"
          >
            Karar Açıklaması
          </label>

          <textarea
            id="application-admin-note"
            value={adminNote}
            onChange={(event) => setAdminNote(event.target.value)}
            rows={5}
            maxLength={500}
            disabled={isSaving}
            placeholder="Başvuru hakkında yönetici değerlendirmesini yazın..."
            className="min-h-[140px] w-full resize-y rounded-md border bg-background px-3 py-2 text-sm outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              Bu açıklama yalnızca yönetim panelinde görüntülenecektir.
            </p>

            <span
              className={`shrink-0 text-xs ${
                adminNote.length > 450
                  ? "text-red-500"
                  : "text-muted-foreground"
              }`}
            >
              {adminNote.length} / 500
            </span>
          </div>
        </div>

        {successMessage && (
          <div
            role="status"
            className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
          >
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div
            role="alert"
            className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {errorMessage}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save className="mr-2 h-4 w-4" />

            {isSaving ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>

        <div className="rounded-lg border bg-muted/20 p-4">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />

            <h3 className="text-sm font-semibold">
              Son Kaydedilen Yönetici Notu
            </h3>
          </div>

          <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-foreground">
            {savedAdminNote.trim() || "Henüz yönetici notu bulunmuyor."}
          </p>

          <div className="mt-4 border-t pt-3">
            <p className="text-xs text-muted-foreground">
              Son güncelleme
            </p>

            <p className="mt-1 text-xs font-medium">
              {formatDate(savedUpdatedAt)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}