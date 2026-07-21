"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  FileText,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Kariyer",
    href: "/dashboard/career",
    icon: Users,
  },
  {
    title: "Ürünler",
    href: "/dashboard/products",
    icon: Package,
  },
  {
    title: "Siparişler",
    href: "/dashboard/orders",
    icon: ShoppingCart,
  },
  {
    title: "Rezervasyonlar",
    href: "/dashboard/reservations",
    icon: CalendarDays,
  },
  {
    title: "Blog",
    href: "/dashboard/blog",
    icon: FileText,
  },
  {
    title: "Ayarlar",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  function isMenuItemActive(href: string) {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    return pathname.startsWith(href);
  }

  return (
    <aside className="hidden min-h-screen w-72 shrink-0 flex-col border-r bg-background md:flex">
      <div className="flex h-24 items-center border-b px-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight">
            Özsüt Akhisar
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Yönetim Paneli
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isMenuItemActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="size-5" />

              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-4">
        <div className="flex items-center gap-3 rounded-xl bg-muted/60 p-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
            A
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">
              Admin
            </p>

            <p className="truncate text-xs text-muted-foreground">
              admin@ozsut.com
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}