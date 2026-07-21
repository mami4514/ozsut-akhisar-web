"use client";

import {
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BriefcaseBusiness,
  Clock3,
  FileText,
  Users,
} from "lucide-react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getDashboard,
  type DashboardResponse,
} from "@/services/dashboard.service";

interface AuthUser {
  id: number;
  name: string;
  email: string;
}

const subscribe = () => {
  return () => {};
};

function getStoredUser(): AuthUser | null {
  const storedUser = localStorage.getItem("auth_user");

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as AuthUser;
  } catch {
    return null;
  }
}

export default function DashboardPage() {
  const router = useRouter();

  const [dashboard, setDashboard] =
    useState<DashboardResponse | null>(null);

  const [dashboardError, setDashboardError] =
    useState<string | null>(null);

  const isClient = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const user = isClient ? getStoredUser() : null;

  useEffect(() => {
    if (!isClient) {
      return;
    }

    const token = localStorage.getItem("access_token");
    const storedUser = localStorage.getItem("auth_user");

    if (!token || !storedUser) {
      router.replace("/login");
      return;
    }

    try {
      JSON.parse(storedUser);
    } catch {
      localStorage.removeItem("access_token");
      localStorage.removeItem("auth_user");

      router.replace("/login");
    }
  }, [isClient, router]);

  useEffect(() => {
    if (!isClient || !user) {
      return;
    }

    let isCancelled = false;

    async function loadDashboard() {
      try {
        const data = await getDashboard();

        if (!isCancelled) {
          setDashboard(data);
          setDashboardError(null);
        }
      } catch {
        if (!isCancelled) {
          setDashboardError(
            "Dashboard verileri alınırken bir hata oluştu.",
          );
        }
      }
    }

    void loadDashboard();

    return () => {
      isCancelled = true;
    };
  }, [isClient, user]);

  if (!isClient || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Dashboard yükleniyor...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <DashboardHeader userName={user.name} />

      {dashboardError ? (
        <Card>
          <CardContent className="py-6">
            <p className="text-sm text-destructive">
              {dashboardError}
            </p>
          </CardContent>
        </Card>
      ) : dashboard ? (
        <DashboardStats statistics={dashboard.statistics} />
      ) : (
        <section
          aria-label="Dashboard istatistikleri yükleniyor"
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="h-4 w-28 animate-pulse rounded bg-muted" />
              </CardHeader>

              <CardContent>
                <div className="h-8 w-14 animate-pulse rounded bg-muted" />

                <div className="mt-3 h-3 w-40 animate-pulse rounded bg-muted" />
              </CardContent>
            </Card>
          ))}
        </section>
      )}

      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Son Başvurular</CardTitle>

            <CardDescription>
              Kariyer formundan gönderilen son başvurular burada
              görüntülenecek.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed text-center">
              <FileText className="size-9 text-muted-foreground" />

              <p className="mt-4 font-medium">
                Başvuru verileri henüz bağlanmadı
              </p>

              <p className="mt-1 max-w-md text-sm text-muted-foreground">
                Bir sonraki aşamada bu alanı Laravel kariyer API’sinden
                gelen gerçek verilerle dolduracağız.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hızlı İşlemler</CardTitle>

            <CardDescription>
              Sık kullanılan yönetim işlemleri.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <Link
              href="/dashboard/career"
              className={buttonVariants({
                variant: "outline",
                className: "w-full justify-start",
              })}
            >
              <Users className="size-4" />
              Kariyer başvuruları
            </Link>

            <Link
              href="/dashboard/products"
              className={buttonVariants({
                variant: "outline",
                className: "w-full justify-start",
              })}
            >
              <BriefcaseBusiness className="size-4" />
              Ürün yönetimi
            </Link>

            <Link
              href="/dashboard/settings"
              className={buttonVariants({
                variant: "outline",
                className: "w-full justify-start",
              })}
            >
              <Clock3 className="size-4" />
              Panel ayarları
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}