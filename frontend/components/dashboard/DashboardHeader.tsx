import Link from "next/link";
import { Plus } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

interface DashboardHeaderProps {
  userName: string;
}

export default function DashboardHeader({
  userName,
}: DashboardHeaderProps) {
  return (
    <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground">
          Genel Bakış
        </p>

        <h2 className="mt-1 text-3xl font-bold tracking-tight">
          Hoş geldiniz, {userName}
        </h2>

        <p className="mt-2 text-muted-foreground">
          Özsüt Akhisar yönetim panelindeki son durumu buradan takip
          edebilirsiniz.
        </p>
      </div>

      <Link
        href="/dashboard/career"
        className={buttonVariants()}
      >
        <Plus className="size-4" />
        Başvuruları Görüntüle
      </Link>
    </section>
  );
}