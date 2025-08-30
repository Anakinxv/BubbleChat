import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircleWarning, Bell } from "lucide-react";

function UsersActions() {
  return (
    <div className="flex items-center gap-4">
      {/* Mensajes */}
      <div className="relative group p-2 hover:bg-[var(--theme-surface)] rounded-full transition cursor-pointer">
        <MessageCircleWarning size={20} className="text-[var(--theme-text)]" />
        <span className="absolute left-1/2 -translate-x-1/2 top-10 opacity-0 group-hover:opacity-100 transition bg-[var(--theme-surface)] text-[var(--theme-text)] text-xs px-2 py-1 rounded-md shadow-lg pointer-events-none">
          Mensajes
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
        <Avatar className="h-10 w-10">
          <AvatarImage
            src="https://i.pinimg.com/736x/48/40/48/4840485d9087f1de93a80943f6e4fe62.jpg"
            alt="User avatar"
          />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <span className="absolute left-1/2 -translate-x-1/2 top-12 opacity-0 group-hover:opacity-100 transition bg-[var(--theme-surface)] text-[var(--theme-text)] text-xs px-2 py-1 rounded-md shadow-lg pointer-events-none">
          Perfil
        </span>
      </div>
    </div>
  );
}

export default UsersActions;
