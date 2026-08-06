"use client";

import Link from "next/link";
import {
  Archive,
  BriefcaseBusiness,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Mail,
  Phone,
  RotateCcw,
  Search,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import {
  type ChangeEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  archiveJobApplication,
  forceDeleteJobApplication,
  getArchivedJobApplications,
  getJobApplications,
  restoreJobApplication,
  type JobApplicationListItem,
  type JobApplicationPaginationMeta,
} from "@/services/job-application.service";
import {
  getPositions,
  type Position,
} from "@/services/position.service";

type ApplicationTab = "active" | "archive";

const statusOptions = [
  {
    value: "",
    label: "Tüm durumlar",
  },
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
    label: "Görüşme",
  },
  {
    value: "accepted",
    label: "Kabul Edildi",
  },
  {
    value: "rejected",
    label: "Reddedildi",
  },
];

const statusLabels: Record<string, string> = {
  new: "Yeni",
  reviewing: "İnceleniyor",
  interview: "Görüşme",
  accepted: "Kabul Edildi",
  rejected: "Reddedildi",
};

const statusClassNames: Record<string, string> = {
  new: "bg-blue-50 text-blue-700",
  reviewing: "bg-amber-50 text-amber-700",
  interview: "bg-violet-50 text-violet-700",
  accepted: "bg-emerald-50 text-emerald-700",
  rejected: "bg-red-50 text-red-700",
};

const emptyMeta: JobApplicationPaginationMeta = {
  current_page: 1,
  last_page: 1,
  per_page: 10,
  total: 0,
};

function getStatusLabel(status: string) {
  return statusLabels[status] ?? status;
}

function getStatusClassName(status: string) {
  return (
    statusClassNames[status] ??
    "bg-muted text-muted-foreground"
  );
}

function formatApplicationDate(date: string) {
  const parsedDate = new Date(date.replace(" ", "T"));

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(parsedDate);
}

export default function CareerApplicationsPage() {
  const [activeTab, setActiveTab] =
    useState<ApplicationTab>("active");

  const [applications, setApplications] = useState<
    JobApplicationListItem[]
  >([]);

  const [positions, setPositions] = useState<Position[]>([]);

  const [meta, setMeta] =
    useState<JobApplicationPaginationMeta>(emptyMeta);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] =
    useState("");

  const [status, setStatus] = useState("");
  const [positionId, setPositionId] = useState("");
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [positionsLoading, setPositionsLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [positionsError, setPositionsError] =
    useState<string | null>(null);

  const [successMessage, setSuccessMessage] =
    useState<string | null>(null);

  const [actionApplicationId, setActionApplicationId] =
    useState<number | null>(null);

  const [deleteTarget, setDeleteTarget] =
    useState<JobApplicationListItem | null>(null);

  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 400);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [search]);

  useEffect(() => {
    let isCancelled = false;

    async function loadPositions() {
      setPositionsLoading(true);
      setPositionsError(null);

      try {
        const result = await getPositions();

        if (!isCancelled) {
          setPositions(result);
        }
      } catch {
        if (!isCancelled) {
          setPositions([]);

          setPositionsError(
            "Pozisyonlar yüklenirken bir hata oluştu."
          );
        }
      } finally {
        if (!isCancelled) {
          setPositionsLoading(false);
        }
      }
    }

    void loadPositions();

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    let isCancelled = false;

    async function loadApplications() {
      setLoading(true);
      setError(null);

      try {
        const params = {
          page,
          search: debouncedSearch,
          status,
          positionId,
        };

        const result =
          activeTab === "active"
            ? await getJobApplications(params)
            : await getArchivedJobApplications(params);

        if (!isCancelled) {
          setApplications(result.applications);
          setMeta(result.meta);
        }
      } catch {
        if (!isCancelled) {
          setApplications([]);
          setMeta(emptyMeta);

          setError(
            activeTab === "active"
              ? "Aktif başvurular alınırken bir hata oluştu."
              : "Arşivlenmiş başvurular alınırken bir hata oluştu."
          );
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    void loadApplications();

    return () => {
      isCancelled = true;
    };
  }, [
    activeTab,
    debouncedSearch,
    page,
    positionId,
    refreshKey,
    status,
  ]);

  useEffect(() => {
    if (!successMessage) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setSuccessMessage(null);
    }, 3500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [successMessage]);

  const resultText = useMemo(() => {
    if (loading) {
      return activeTab === "active"
        ? "Aktif başvurular yükleniyor..."
        : "Arşiv yükleniyor...";
    }

    if (meta.total === 0) {
      return activeTab === "active"
        ? "Aktif başvuru bulunamadı."
        : "Arşivlenmiş başvuru bulunamadı.";
    }

    return `${meta.total} başvuru bulundu.`;
  }, [activeTab, loading, meta.total]);

  function handleTabChange(tab: ApplicationTab) {
    setActiveTab(tab);
    setPage(1);
    setSuccessMessage(null);
    setError(null);
  }

  function handleStatusChange(
    event: ChangeEvent<HTMLSelectElement>
  ) {
    setStatus(event.target.value);
    setPage(1);
  }

  function handlePositionChange(
    event: ChangeEvent<HTMLSelectElement>
  ) {
    setPositionId(event.target.value);
    setPage(1);
  }

  function goToPreviousPage() {
    setPage((currentPage) =>
      Math.max(currentPage - 1, 1)
    );
  }

  function goToNextPage() {
    setPage((currentPage) =>
      Math.min(currentPage + 1, meta.last_page)
    );
  }

  function refreshApplications() {
    setRefreshKey((currentKey) => currentKey + 1);
  }

  async function handleArchive(
    application: JobApplicationListItem
  ) {
    setActionApplicationId(application.id);
    setError(null);
    setSuccessMessage(null);

    try {
      const message = await archiveJobApplication(
        application.id
      );

      setSuccessMessage(message);
      refreshApplications();
    } catch {
      setError(
        "Başvuru arşivlenirken bir hata oluştu."
      );
    } finally {
      setActionApplicationId(null);
    }
  }

  async function handleRestore(
    application: JobApplicationListItem
  ) {
    setActionApplicationId(application.id);
    setError(null);
    setSuccessMessage(null);

    try {
      await restoreJobApplication(application.id);

      setSuccessMessage(
        "İş başvurusu başarıyla geri yüklendi."
      );

      refreshApplications();
    } catch {
      setError(
        "Başvuru geri yüklenirken bir hata oluştu."
      );
    } finally {
      setActionApplicationId(null);
    }
  }

  async function handleForceDelete() {
    if (!deleteTarget) {
      return;
    }

    setActionApplicationId(deleteTarget.id);
    setError(null);
    setSuccessMessage(null);

    try {
      const message = await forceDeleteJobApplication(
        deleteTarget.id
      );

      setDeleteTarget(null);
      setSuccessMessage(message);
      refreshApplications();
    } catch {
      setError(
        "Başvuru kalıcı olarak silinirken bir hata oluştu."
      );
    } finally {
      setActionApplicationId(null);
    }
  }

  const isDeleting =
    deleteTarget !== null &&
    actionApplicationId === deleteTarget.id;

  return (
    <>
      <div className="space-y-6">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              Kariyer Yönetimi
            </p>

            <h1 className="mt-1 text-3xl font-semibold tracking-tight">
              İş Başvuruları
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Aktif ve arşivlenmiş kariyer başvurularını
              görüntüleyin ve yönetin.
            </p>
          </div>

          <Link
            href="/dashboard"
            className={buttonVariants({
              variant: "outline",
            })}
          >
            Dashboard&apos;a Dön
          </Link>
        </header>

        {successMessage && (
          <div
            role="status"
            className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
          >
            {successMessage}
          </div>
        )}

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <CardTitle>Başvuru Listesi</CardTitle>

                <CardDescription className="mt-1">
                  Başvuruları arayın, filtreleyin, arşivleyin
                  veya geri yükleyin.
                </CardDescription>
              </div>

              <div className="inline-flex w-full rounded-lg border bg-muted/40 p-1 sm:w-auto">
                <button
                  type="button"
                  onClick={() =>
                    handleTabChange("active")
                  }
                  className={`flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition sm:flex-none ${
                    activeTab === "active"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <UserRound className="size-4" />
                  Aktif Başvurular
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleTabChange("archive")
                  }
                  className={`flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition sm:flex-none ${
                    activeTab === "archive"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Archive className="size-4" />
                  Arşiv
                </button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 lg:grid-cols-[1fr_220px_220px]">
              <div>
                <label
                  htmlFor="application-search"
                  className="sr-only"
                >
                  Başvurularda ara
                </label>

                <div className="relative">
                  <Search
                    aria-hidden="true"
                    className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  />

                  <Input
                    id="application-search"
                    type="search"
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Ad, telefon veya e-posta ara..."
                    className="pl-9"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="application-status"
                  className="sr-only"
                >
                  Duruma göre filtrele
                </label>

                <select
                  id="application-status"
                  value={status}
                  onChange={handleStatusChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {statusOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="application-position"
                  className="sr-only"
                >
                  Pozisyona göre filtrele
                </label>

                <select
                  id="application-position"
                  value={positionId}
                  onChange={handlePositionChange}
                  disabled={positionsLoading}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">
                    {positionsLoading
                      ? "Pozisyonlar yükleniyor..."
                      : "Tüm pozisyonlar"}
                  </option>

                  {positions.map((position) => (
                    <option
                      key={position.id}
                      value={String(position.id)}
                    >
                      {position.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {positionsError && (
              <p className="mt-3 text-sm text-destructive">
                {positionsError}
              </p>
            )}

            <div className="mt-4 flex flex-col gap-2 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                {resultText}
              </p>

              {meta.total > 0 && (
                <p className="text-sm text-muted-foreground">
                  Sayfa {meta.current_page} /{" "}
                  {meta.last_page}
                </p>
              )}
            </div>

            {error ? (
              <div className="py-12 text-center">
                <p className="text-sm text-destructive">
                  {error}
                </p>
              </div>
            ) : loading ? (
              <div className="divide-y">
                {Array.from({ length: 5 }).map(
                  (_, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="space-y-3">
                        <div className="h-4 w-40 animate-pulse rounded bg-muted" />
                        <div className="h-3 w-56 animate-pulse rounded bg-muted" />
                        <div className="h-3 w-32 animate-pulse rounded bg-muted" />
                      </div>

                      <div className="h-9 w-36 animate-pulse rounded bg-muted" />
                    </div>
                  )
                )}
              </div>
            ) : applications.length === 0 ? (
              <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
                {activeTab === "active" ? (
                  <UserRound className="size-10 text-muted-foreground" />
                ) : (
                  <Archive className="size-10 text-muted-foreground" />
                )}

                <p className="mt-4 font-medium">
                  {activeTab === "active"
                    ? "Aktif başvuru bulunamadı"
                    : "Arşiv boş"}
                </p>

                <p className="mt-1 max-w-md text-sm text-muted-foreground">
                  {activeTab === "active"
                    ? "Arama, durum veya pozisyon filtresini değiştirerek tekrar deneyin."
                    : "Arşivlenen iş başvuruları burada görüntülenecek."}
                </p>
              </div>
            ) : (
              <div className="divide-y">
                {applications.map((application) => {
                  const isProcessing =
                    actionApplicationId ===
                    application.id;

                  return (
                    <article
                      key={application.id}
                      className="flex flex-col gap-5 py-5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <div className="flex items-start gap-3">
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted">
                            <UserRound
                              aria-hidden="true"
                              className="size-4 text-muted-foreground"
                            />
                          </div>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h2 className="truncate font-semibold">
                                {application.full_name}
                              </h2>

                              <span
                                className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClassName(
                                  application.status
                                )}`}
                              >
                                {getStatusLabel(
                                  application.status
                                )}
                              </span>

                              {activeTab === "archive" && (
                                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                                  Arşivlendi
                                </span>
                              )}
                            </div>

                            <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                              <BriefcaseBusiness
                                aria-hidden="true"
                                className="size-3.5"
                              />

                              <span>
                                {application.position
                                  ?.name ??
                                  "Pozisyon belirtilmemiş"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground sm:ml-13">
                          <span className="flex items-center gap-1.5">
                            <Phone className="size-3.5" />
                            {application.phone}
                          </span>

                          <span className="flex items-center gap-1.5">
                            <Mail className="size-3.5" />
                            {application.email}
                          </span>

                          <span className="flex items-center gap-1.5">
                            <CalendarDays className="size-3.5" />

                            {formatApplicationDate(
                              application.applied_at
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        {activeTab === "active" ? (
                          <>
                            <Link
                              href={`/dashboard/career/${application.id}`}
                              className={buttonVariants({
                                variant: "outline",
                                size: "sm",
                                className: "shrink-0",
                              })}
                            >
                              Detayı Gör
                            </Link>

                            <button
                              type="button"
                              onClick={() =>
                                void handleArchive(
                                  application
                                )
                              }
                              disabled={isProcessing}
                              className={buttonVariants({
                                variant: "outline",
                                size: "sm",
                                className:
                                  "shrink-0 gap-2",
                              })}
                            >
                              {isProcessing ? (
                                <Loader2 className="size-4 animate-spin" />
                              ) : (
                                <Archive className="size-4" />
                              )}

                              Arşivle
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() =>
                                void handleRestore(
                                  application
                                )
                              }
                              disabled={isProcessing}
                              className={buttonVariants({
                                variant: "outline",
                                size: "sm",
                                className:
                                  "shrink-0 gap-2",
                              })}
                            >
                              {isProcessing ? (
                                <Loader2 className="size-4 animate-spin" />
                              ) : (
                                <RotateCcw className="size-4" />
                              )}

                              Geri Yükle
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                setDeleteTarget(
                                  application
                                )
                              }
                              disabled={isProcessing}
                              className={buttonVariants({
                                variant: "destructive",
                                size: "sm",
                                className:
                                  "shrink-0 gap-2",
                              })}
                            >
                              <Trash2 className="size-4" />
                              Kalıcı Sil
                            </button>
                          </>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {!loading &&
              !error &&
              meta.last_page > 1 && (
                <div className="mt-6 flex flex-col gap-4 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-muted-foreground">
                    Toplam {meta.total} başvuru
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={goToPreviousPage}
                      disabled={meta.current_page <= 1}
                      className={buttonVariants({
                        variant: "outline",
                        size: "sm",
                      })}
                    >
                      <ChevronLeft className="size-4" />
                      Önceki
                    </button>

                    <span className="min-w-20 text-center text-sm">
                      {meta.current_page} /{" "}
                      {meta.last_page}
                    </span>

                    <button
                      type="button"
                      onClick={goToNextPage}
                      disabled={
                        meta.current_page >=
                        meta.last_page
                      }
                      className={buttonVariants({
                        variant: "outline",
                        size: "sm",
                      })}
                    >
                      Sonraki
                      <ChevronRight className="size-4" />
                    </button>
                  </div>
                </div>
              )}
          </CardContent>
        </Card>
      </div>

      {deleteTarget && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-md rounded-2xl border bg-background p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setDeleteTarget(null)}
              disabled={isDeleting}
              aria-label="Pencereyi kapat"
              className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X className="size-5" />
            </button>

            <div className="flex size-12 items-center justify-center rounded-full bg-red-100 text-red-700">
              <Trash2 className="size-5" />
            </div>

            <h2
              id="delete-dialog-title"
              className="mt-5 text-xl font-semibold"
            >
              Başvuruyu kalıcı olarak sil
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              <strong className="text-foreground">
                {deleteTarget.full_name}
              </strong>{" "}
              adlı adayın başvurusu, yönetici notları ve CV
              dosyası kalıcı olarak silinecek.
            </p>

            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              Bu işlem geri alınamaz.
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className={buttonVariants({
                  variant: "outline",
                })}
              >
                İptal
              </button>

              <button
                type="button"
                onClick={() =>
                  void handleForceDelete()
                }
                disabled={isDeleting}
                className={buttonVariants({
                  variant: "destructive",
                  className: "gap-2",
                })}
              >
                {isDeleting ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Trash2 className="size-4" />
                )}

                {isDeleting
                  ? "Siliniyor..."
                  : "Kalıcı Olarak Sil"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}