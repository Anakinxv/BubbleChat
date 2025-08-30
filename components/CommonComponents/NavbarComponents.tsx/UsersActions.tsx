import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircleWarning, Bell } from "lucide-react";
import UserDropdown from "@/components/UserCompnents/UserDropdown";
function UsersActions() {
  return (
    <div className="flex items-center gap-4">
      {/* Mensajes */}
      <div className="relative group p-2 hover:bg-[var(--theme-surface)] rounded-full transition cursor-pointer">
        <MessageCircleWarning size={20} className="text-[var(--theme-text)]" />
        <span className="absolute left-1/2 -translate-x-1/2 top-10 opacity-0 group-hover:opacity-100 transition bg-[var(--theme-surface)] text-[var(--theme-text)] text-xs px-2 py-1 rounded-md shadow-lg pointer-events-none">
          Sugerencias
        </span>
      </div>

      {/* Notificaciones */}
      <div className="relative group p-2 hover:bg-[var(--theme-surface)] rounded-full transition cursor-pointer">
        <Bell size={20} className="text-[var(--theme-text)]" />
        <span className="absolute left-1/2 -translate-x-1/2 top-10 opacity-0 group-hover:opacity-100 transition bg-[var(--theme-surface)] text-[var(--theme-text)] text-xs px-2 py-1 rounded-md shadow-lg pointer-events-none">
          Notificaciones
        </span>
      </div>

      {/* Perfil */}
      <div className="relative group cursor-pointer">
        <UserDropdown />
        <span className="absolute left-1/2 -translate-x-1/2 top-12 opacity-0 group-hover:opacity-100 transition bg-[var(--theme-surface)] text-[var(--theme-text)] text-xs px-2 py-1 rounded-md shadow-lg pointer-events-none">
          Perfil
        </span>
      </div>
    </div>
  );
}

export default UsersActions;
