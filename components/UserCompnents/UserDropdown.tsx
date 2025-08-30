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
import { User, Palette, Settings, LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "../CommonComponents/ThemeProvider";

function UserDropdown() {
  // Datos del usuario (puedes reemplazar con datos reales)
  const user = {
    name: "Emmanuel",
    email: "emmanuel@example.com",
    avatar:
      "https://i.pinimg.com/736x/bb/47/b3/bb47b3fbcef00d2380332380b6df4cb8.jpg",
  };

  const { currentTheme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    setTheme(currentTheme.id === "dark" ? "light" : "dark");
  };

  const handleProfileView = () => {
    // Lógica para ver perfil
    console.log("Ver perfil");
  };

  const handleAppearance = () => {
    // Lógica para configurar apariencia
    console.log("Configurar apariencia");
  };

  const handleSettings = () => {
    // Lógica para configuración
    console.log("Abrir configuración");
  };

  const handleLogout = () => {
    // Lógica para cerrar sesión
    console.log("Cerrar sesión");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="bg-[var(--theme-surface)] border-[var(--theme-border)] cursor-pointer">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56"
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
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex flex-col">
                <span
                  className="font-semibold text-[var(--theme-text)] truncate"
                  title={user.name}
                >
                  {user.name}
                </span>
                <span
                  className="text-xs text-[var(--theme-textSecondary)] truncate"
                  title={user.email}
                >
                  {user.email}
                </span>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-red-600" />

        {/* Ver mi perfil */}
        <DropdownMenuItem
          onClick={handleProfileView}
          className="text-[var(--theme-textSecondary)] hover:text-[var(--theme-text)] cursor-pointer"
        >
          <User className="mr-2 h-4 w-4" />
          <span>Ver mi perfil</span>
        </DropdownMenuItem>

        {/* Cambiar modo claro/oscuro */}
        <DropdownMenuItem
          onClick={handleThemeToggle}
          className="text-[var(--theme-textSecondary)] hover:text-[var(--theme-text)] cursor-pointer"
        >
          {currentTheme.id === "dark" ? (
            <Sun className="mr-2 h-4 w-4" />
          ) : (
            <Moon className="mr-2 h-4 w-4" />
          )}
          <span>
            {currentTheme.id === "dark" ? "Modo claro" : "Modo oscuro"}
          </span>
          <Switch
            checked={currentTheme.id === "dark"}
            onCheckedChange={handleThemeToggle}
            className="ml-auto"
          />
        </DropdownMenuItem>

        {/* Apariencia */}
        <DropdownMenuItem
          onClick={handleAppearance}
          className="text-[var(--theme-textSecondary)] hover:text-[var(--theme-text)] cursor-pointer"
        >
          <Palette className="mr-2 h-4 w-4" />
          <span>Apariencia</span>
        </DropdownMenuItem>

        {/* Configuración */}
        <DropdownMenuItem
          onClick={handleSettings}
          className="text-[var(--theme-textSecondary)] hover:text-[var(--theme-text)] cursor-pointer"
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>Configuración</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-red-600" />

        {/* Cerrar sesión */}
        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red-600 hover:text-red-700 cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserDropdown;
