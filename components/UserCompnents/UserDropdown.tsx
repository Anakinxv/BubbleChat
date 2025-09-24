"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Settings, LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import MyProfile from "./Modals/MyProfile";
import { useState } from "react";
import Configuración from "./Modals/Configuración";
import { useSession, signOut } from "next-auth/react"; // Importa signOut

function UserDropdown() {
  // Estado para controlar los modales
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);

  const { data: session } = useSession();

  // Datos del usuario
  const user = {
    name: session?.user?.name ?? "",
    email: session?.user?.email ?? "",
    avatar: session?.user?.image ?? "",
  };

  console.log("user session:", session);

  const { theme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleOpenProfile = () => {
    setIsModalOpen(true);
  };

  const handleCloseProfile = () => {
    setIsModalOpen(false);
  };

  const handleCloseConfig = () => {
    setIsConfigModalOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-[var(--theme-surface)] border-[var(--theme-border)] cursor-pointer">
            <AvatarImage src={user.avatar} alt={user.name || "User"} />
            <AvatarFallback>
              {user.name ? user.name.charAt(0).toUpperCase() : "?"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-65 theme-bg-surface theme-border shadow-lg rounded-2xl" // Cambia w-56 por w-72
          align="end"
          alignOffset={-5}
          sideOffset={5}
        >
          {/* Header con nombre y correo */}
          <DropdownMenuLabel className="flex flex-col">
            <div className="flex gap-4">
              <Avatar className="h-10 w-10 cursor-pointer bg-[var(--theme-surface)] border-[var(--theme-border)]">
                <AvatarImage src={user.avatar} alt="User avatar" />
                <AvatarFallback>
                  {user.name ? user.name.charAt(0).toUpperCase() : "?"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col max-w-[160px]">
                <span
                  className="font-semibold text-[var(--theme-text)] truncate overflow-hidden text-ellipsis"
                  title={user.name}
                >
                  {user.name || "Invitado"}
                </span>
                <span
                  className="text-xs text-[var(--theme-textSecondary)] "
                  title={user.email}
                >
                  {user.email || ""}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="separator" />

          {/* Ver mi perfil */}
          <DropdownMenuItem
            className="text-[var(--theme-textSecondary)] hover:text-[var(--theme-text)] cursor-pointer"
            onClick={handleOpenProfile}
          >
            <User className="mr-2 h-4 w-4" />
            <span>Ver mi perfil</span>
          </DropdownMenuItem>

          {/* Cambiar modo claro/oscuro */}
          <DropdownMenuItem
            onClick={handleThemeToggle}
            className="text-[var(--theme-textSecondary)] hover:text-[var(--theme-text)] cursor-pointer"
          >
            {theme === "dark" ? (
              <Sun className="mr-2 h-4 w-4" />
            ) : (
              <Moon className="mr-2 h-4 w-4" />
            )}
            <span>{theme === "dark" ? "Modo claro" : "Modo oscuro"}</span>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={handleThemeToggle}
              className="ml-auto"
            />
          </DropdownMenuItem>

          {/* Configuración */}
          <DropdownMenuItem
            className="text-[var(--theme-textSecondary)] hover:text-[var(--theme-text)] cursor-pointer"
            onClick={() => setIsConfigModalOpen(true)}
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Configuración</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="separator" />

          {/* Cerrar sesión */}
          <DropdownMenuItem
            className="text-red-600 hover:text-red-700 cursor-pointer"
            onClick={() => signOut()} // Cierra sesión correctamente
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Cerrar sesión</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modal de perfil */}
      <MyProfile
        title="Mi Perfil"
        isOpen={isModalOpen}
        onClose={handleCloseProfile}
      />

      {/* Modal de configuración */}
      <Configuración
        title="Configuración"
        isOpen={isConfigModalOpen}
        onClose={handleCloseConfig}
      />
    </>
  );
}

export default UserDropdown;
