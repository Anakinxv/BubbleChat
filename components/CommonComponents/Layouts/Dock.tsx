import React from "react";
import Link from "next/link";
import { Home, User, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

function Dock() {
  const pathname = usePathname();

  const links = [
    { href: "/app/home", icon: Home },
    { href: "/app/global", icon: User },
    { href: "/app/mensajes", icon: Settings },
  ];

  return (
    <div className="fixed bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 bg-[var(--theme-surface)] border border-[var(--theme-border)] text-[var(--theme-text)] px-3 sm:px-6 py-2 sm:py-3 rounded-2xl shadow-lg flex gap-4 sm:gap-8 z-50">
      {links.map(({ href, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className="group flex flex-col items-center"
          >
            <div
              className={`p-2 rounded-full transition ${
                isActive ? "bg-[var(--theme-secondary)]  text-white" : ""
              }`}
            >
              <Icon
                size={22}
                className={`transition ${
                  isActive
                    ? "text-[var(--theme-primary)] text-white"
                    : "group-hover:text-[var(--theme-primary)]"
                }`}
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Dock;
