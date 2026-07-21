"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function Navbar() {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("auth_user");

    router.replace("/login");
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div>
        <h1 className="text-lg font-semibold">
          Yönetim Paneli
        </h1>

        <p className="text-sm text-muted-foreground">
          Özsüt Akhisar
        </p>
      </div>

      <Button
        variant="outline"
        onClick={handleLogout}
      >
        <LogOut className="mr-2 h-4 w-4" />

        Çıkış Yap
      </Button>
    </header>
  );
}