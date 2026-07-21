import Link from "next/link";
import { BriefcaseBusiness, CalendarDays, UserRound } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface LatestApplication {
  id: number;
  full_name: string;
  position: string | null;
  status: string;
  applied_at: string;
}

interface LatestApplicationsProps {
  applications: LatestApplication[];
}

const statusLabels: Record<string, string> = {
  new: "Yeni",
  reviewing: "İnceleniyor",
  interview: "Görüşme",
  accepted: "Kabul Edildi",
  rejected: "Reddedildi",
};

function getStatusLabel(status: string) {
  return statusLabels[status] ?? status;
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

export default function LatestApplications({
  applications,
}: LatestApplicationsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>Son Başvurular</CardTitle>

          <CardDescription>
            Kariyer formundan gönderilen en güncel başvurular.
          </CardDescription>
        </div>

        <Link
          href="/dashboard/career"
          className={buttonVariants({
            variant: "outline",
            size: "sm",
          })}
        >
          Tümünü Gör
        </Link>
      </CardHeader>

      <CardContent>
        {applications.length === 0 ? (
          <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed px-6 text-center">
            <UserRound className="size-9 text-muted-foreground" />

            <p className="mt-4 font-medium">
              Henüz başvuru bulunmuyor
            </p>

            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              Yeni bir kariyer başvurusu gönderildiğinde burada
              görüntülenecek.
            </p>
          </div>
        ) : (
          <div className="divide-y">
            {applications.map((application) => (
              <div
                key={application.id}
                className="flex flex-col gap-4 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
                      <UserRound
                        aria-hidden="true"
                        className="size-4 text-muted-foreground"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-medium">
                        {application.full_name}
                      </p>

                      <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <BriefcaseBusiness
                          aria-hidden="true"
                          className="size-3.5"
                        />

                            <span>
                              {application.position ?? "Pozisyon belirtilmemiş"}
                            </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="rounded-full bg-muted px-2.5 py-1 font-medium text-foreground">
                      {getStatusLabel(application.status)}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <CalendarDays
                        aria-hidden="true"
                        className="size-3.5"
                      />

                      {formatApplicationDate(application.applied_at)}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/dashboard/career/${application.id}`}
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Detayı Gör
                </Link>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}