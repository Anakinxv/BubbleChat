import React from "react";
import Link from "next/link";
import { Home, User, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

function ClassicSideBar() {
  const pathname = usePathname();

  return (
    <aside className="p-2 sm:p-4 h-auto bg-transparent rounded-full flex flex-col py-3 sm:py-6 px-4 sm:px-12 gap-2 sm:gap-3">
      <Link href="/app/home" className="flex flex-col items-center group">
        <div
          className={`p-3 rounded-full transition ${
            pathname === "/app/home"
              ? "bg-[var(--theme-primary)]"
              : "hover:bg-[var(--theme-category)]"
          }`}
        >
          <Home
            size={18}
            className={`transition ${
              pathname === "/app/home"
                ? "text-white"
                : "group-hover:text-[var(--theme-primary)]"
            }`}
          />
        </div>
        <span
          className={`text-xs mt-2 font-medium transition ${
            pathname === "/app/home"
              ? "text-[var(--theme-primary)]"
              : "group-hover:text-[var(--theme-primary)]"
          }`}
        >
          Inicio
        </span>
      </Link>
      <Link href="/app/global" className="flex flex-col items-center group">
        <div
          className={`p-3 rounded-full transition ${
            pathname === "/app/global"
              ? "bg-[var(--theme-primary)]"
              : "hover:bg-[var(--theme-category)]"
          }`}
        >
          <User
            size={18}
            className={`transition ${
              pathname === "/app/global"
                ? "text-white"
                : "group-hover:text-[var(--theme-primary)]"
            }`}
          />
        </div>
        <span
          className={`text-xs mt-2 font-medium transition ${
            pathname === "/app/global"
              ? "text-[var(--theme-primary)]"
              : "group-hover:text-[var(--theme-primary)]"
          }`}
        >
          Global
        </span>
      </Link>
      <Link href="/app/mensajes" className="flex flex-col items-center group">
        <div
          className={`p-3 rounded-full transition ${
            pathname === "/app/mensajes"
              ? "bg-[var(--theme-primary)]"
              : "hover:bg-[var(--theme-category)]"
          }`}
        >
          <Settings
            size={18}
            className={`transition ${
              pathname === "/app/mensajes"
                ? "text-white"
                : "group-hover:text-[var(--theme-primary)]"
            }`}
          />
        </div>
        <span
          className={`text-xs mt-2 font-medium transition ${
            pathname === "/app/mensajes"
              ? "text-[var(--theme-primary)]"
              : "group-hover:text-[var(--theme-primary)]"
          }`}
        >
          Mensajes
        </span>
      </Link>
    </aside>
  );
}

export default ClassicSideBar;
