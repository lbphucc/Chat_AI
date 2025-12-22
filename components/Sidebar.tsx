"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google"; // Font chữ cho Logo
import { usePathname } from "next/navigation"; // Hook để biết đang ở trang nào

import { cn } from "@/lib/utils"; // Hàm nối class của Shadcn
import { 
  LayoutDashboard, 
  MessageSquare, 
  ImageIcon, 
  VideoIcon, 
  Music, 
  Code, 
  Settings 
} from "lucide-react";

// Load font Montserrat
const montserrat = Montserrat({ 
  weight: "600", 
  subsets: ["latin"] 
});

// Cấu hình danh sách Menu (Tên, Icon, Link, Màu sắc)
const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-700",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-700",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-emerald-500",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-green-700",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

const Sidebar = () => {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      {/* 1. LOGO */}
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            {/* Nhớ tạo folder public và bỏ ảnh logo.png vào nhé */}
            <Image
              fill
              alt="Logo"
              src="/logo.png" 
            />
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            Genius
          </h1>
        </Link>

        {/* 2. MENU ITEMS */}
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                // Nếu đang ở trang này thì làm sáng nền lên
                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;