"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BriefcaseBusiness,
  Clock3,
  FileText,
  Users,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

const statistics = [
  {
    title: "Toplam Başvuru",
    value: "—",
    description: "Tüm kariyer başvuruları",
    icon: FileText,
  },
  {
    title: "Yeni Başvurular",
    value: "—",
    description: "İncelenmeyi bekleyenler",
    icon: Clock3,
  },
  {
    title: "Aktif Pozisyonlar",
    value: "—",
    description: "Başvuruya açık pozisyonlar",
    icon: BriefcaseBusiness,
  },
  {
    title: "Toplam Kullanıcı",
    value: "1",
    description: "Yönetim paneli kullanıcıları",
    icon: Users,
  },
];

export default function DashboardPage() {
  const router = useRouter();

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

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statistics.map((statistic) => {
          const Icon = statistic.icon;

          return (
            <Card key={statistic.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {statistic.title}
                </CardTitle>

                <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                  <Icon className="size-4 text-muted-foreground" />
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-3xl font-bold">
                  {statistic.value}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {statistic.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </section>

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