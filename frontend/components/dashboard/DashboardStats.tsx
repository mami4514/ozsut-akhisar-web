import {
  BriefcaseBusiness,
  Clock3,
  FileText,
  Users,
  type LucideIcon,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface DashboardStatistics {
  totalApplications: number;
  newApplications: number;
  activePositions: number;
  totalUsers: number;
}

interface DashboardStatsProps {
  statistics: DashboardStatistics;
}

interface StatCard {
  title: string;
  value: number;
  description: string;
  icon: LucideIcon;
}

export default function DashboardStats({
  statistics,
}: DashboardStatsProps) {
  const stats: StatCard[] = [
    {
      title: "Toplam Başvuru",
      value: statistics.totalApplications,
      description: "Sistemdeki tüm iş başvuruları",
      icon: FileText,
    },
    {
      title: "Yeni Başvuru",
      value: statistics.newApplications,
      description: "Henüz değerlendirilmemiş başvurular",
      icon: Clock3,
    },
    {
      title: "Aktif Pozisyon",
      value: statistics.activePositions,
      description: "Başvuruya açık pozisyonlar",
      icon: BriefcaseBusiness,
    },
    {
      title: "Toplam Kullanıcı",
      value: statistics.totalUsers,
      description: "Yönetim paneli kullanıcıları",
      icon: Users,
    },
  ];

  return (
    <section
      aria-label="Dashboard istatistikleri"
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>

              <Icon
                aria-hidden="true"
                className="size-4 text-muted-foreground"
              />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">
                {stat.value.toLocaleString("tr-TR")}
              </div>

              <p className="mt-1 text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}