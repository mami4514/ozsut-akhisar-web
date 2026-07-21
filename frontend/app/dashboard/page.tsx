"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutDashboard } from "lucide-react";

import { Button } from "@/components/ui/button";
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

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const storedUser = localStorage.getItem("auth_user");

    if (!token || !storedUser) {
      router.replace("/login");

      return;
    }

    try {
      setUser(JSON.parse(storedUser) as AuthUser);
    } catch {
      localStorage.removeItem("access_token");
      localStorage.removeItem("auth_user");

      router.replace("/login");

      return;
    }

    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Dashboard yükleniyor...
        </p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-10">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <div className="mb-2 flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <LayoutDashboard className="size-6" />
          </div>

          <CardTitle>Özsüt Akhisar Yönetim Paneli</CardTitle>

          <CardDescription>
            Laravel ve Next.js bağlantısı başarıyla kuruldu.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="rounded-lg border bg-background p-4">
            <p className="font-medium">
              Hoş geldiniz, {user?.name}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              {user?.email}
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => router.push("/login")}
          >
            Login sayfasına dön
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}