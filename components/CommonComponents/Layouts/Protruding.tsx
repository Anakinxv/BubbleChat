import React from "react";
import Link from "next/link";
import { Home, User, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

function Protruding() {
  const pathname = usePathname();

  return (
    <aside className="p-2 sm:p-4 h-auto bg-transparent rounded-3xl flex flex-col py-3 sm:py-6 px-4 sm:px-12 gap-2 sm:gap-3">
      <Link href="/app/home" className="w-full group">
        <div
          className={`flex items-center gap-3 px-4 py-2 rounded-full transition cursor-pointer ${
            pathname === "/app/home"
              ? "bg-[var(--theme-primary)] text-white border border-[var(--theme-border)]"
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
          <span
            className={`text-base font-medium ${
              pathname === "/app/home"
                ? "text-white"
                : "group-hover:text-[var(--theme-primary)] text-[var(--theme-text)]"
            }`}
          >
            Inicio
          </span>
        </div>
      </Link>
      <Link href="/app/global" className="w-full group">
        <div
          className={`flex items-center gap-3 px-4 py-2 rounded-full transition cursor-pointer ${
            pathname === "/app/global"
              ? "bg-[var(--theme-primary)] text-white border border-[var(--theme-border)]"
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
          <span
            className={`text-base font-medium ${
              pathname === "/app/global"
                ? "text-white"
                : "group-hover:text-[var(--theme-primary)] text-[var(--theme-text)]"
            }`}
          >
            Global
          </span>
        </div>
      </Link>
      <Link href="/app/mensajes" className="w-full group">
        <div
          className={`flex items-center gap-3 px-4 py-2 rounded-full transition cursor-pointer ${
            pathname === "/app/mensajes"
              ? "bg-[var(--theme-primary)] text-white border border-[var(--theme-border)]"
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
          <span
            className={`text-base font-medium ${
              pathname === "/app/mensajes"
                ? "text-white"
                : "group-hover:text-[var(--theme-primary)] text-[var(--theme-text)]"
            }`}
          >
            Mensajes
          </span>
        </div>
      </Link>
    </aside>
  );
}

export default Protruding;
