"use client";

import Link from "next/link";
import {
  BriefcaseBusiness,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  Search,
  UserRound,
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
  getJobApplications,
  type JobApplicationListItem,
  type JobApplicationPaginationMeta,
} from "@/services/job-application.service";
import {
  getPositions,
  type Position,
} from "@/services/position.service";

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
        const result = await getJobApplications({
          page,
          search: debouncedSearch,
          status,
          positionId,
        });

        if (!isCancelled) {
          setApplications(result.applications);
          setMeta(result.meta);
        }
      } catch {
        if (!isCancelled) {
          setApplications([]);
          setMeta(emptyMeta);

          setError(
            "Başvurular alınırken bir hata oluştu."
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
    debouncedSearch,
    page,
    status,
    positionId,
  ]);

  const resultText = useMemo(() => {
    if (loading) {
      return "Başvurular yükleniyor...";
    }

    if (meta.total === 0) {
      return "Başvuru bulunamadı.";
    }

    return `${meta.total} başvuru bulundu.`;
  }, [loading, meta.total]);

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

  return (
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
            Kariyer formundan gönderilen tüm başvuruları
            görüntüleyin ve değerlendirin.
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

      <Card>
        <CardHeader>
          <CardTitle>Başvuru Listesi</CardTitle>

          <CardDescription>
            İsim, telefon, e-posta, durum veya pozisyon
            bilgisine göre başvuruları filtreleyebilirsiniz.
          </CardDescription>
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
                Sayfa {meta.current_page} / {meta.last_page}
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

                    <div className="h-9 w-24 animate-pulse rounded bg-muted" />
                  </div>
                )
              )}
            </div>
          ) : applications.length === 0 ? (
            <div className="flex min-h-72 flex-col items-center justify-center text-center">
              <UserRound className="size-10 text-muted-foreground" />

              <p className="mt-4 font-medium">
                Başvuru bulunamadı
              </p>

              <p className="mt-1 max-w-md text-sm text-muted-foreground">
                Arama, durum veya pozisyon filtresini
                değiştirerek tekrar deneyin.
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {applications.map((application) => (
                <article
                  key={application.id}
                  className="flex flex-col gap-5 py-5 first:pt-5 sm:flex-row sm:items-center sm:justify-between"
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
                        </div>

                        <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                          <BriefcaseBusiness
                            aria-hidden="true"
                            className="size-3.5"
                          />

                          <span>
                            {application.position?.name ??
                              "Pozisyon belirtilmemiş"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground sm:ml-13">
                      <span className="flex items-center gap-1.5">
                        <Phone
                          aria-hidden="true"
                          className="size-3.5"
                        />

                        {application.phone}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <Mail
                          aria-hidden="true"
                          className="size-3.5"
                        />

                        {application.email}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <CalendarDays
                          aria-hidden="true"
                          className="size-3.5"
                        />

                        {formatApplicationDate(
                          application.applied_at
                        )}
                      </span>
                    </div>
                  </div>

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
                </article>
              ))}
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
                    {meta.current_page} / {meta.last_page}
                  </span>

                  <button
                    type="button"
                    onClick={goToNextPage}
                    disabled={
                      meta.current_page >= meta.last_page
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
  );
}