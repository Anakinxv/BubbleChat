import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link"; // Importa Link de next/link

function NavbarTabs() {
  return (
    <Tabs defaultValue="inicio" className="w-full">
      <TabsList className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-3xl h-[45px] flex justify-between px-2">
        <Link href="/app/home" className="flex-1">
          <TabsTrigger
            value="inicio"
            className="w-full mx-1 text-[var(--theme-text)] px-3 py-1 rounded-3xl transition data-[state=active]:bg-[var(--theme-primary)] data-[state=active]:text-white h-[35px] flex items-center justify-center text-sm"
          >
            Inicio
          </TabsTrigger>
        </Link>
        <Link href="/app/global" className="flex-1">
          <TabsTrigger
            value="global"
            className="w-full mx-1 text-[var(--theme-text)] px-3 py-1 rounded-3xl transition data-[state=active]:bg-[var(--theme-primary)] data-[state=active]:text-white h-[35px] flex items-center justify-center text-sm"
          >
            Global
          </TabsTrigger>
        </Link>
        <Link href="/app/mensajes" className="flex-1">
          <TabsTrigger
            value="mensajes"
            className="w-full mx-1 text-[var(--theme-text)] px-3 py-1 rounded-3xl transition data-[state=active]:bg-[var(--theme-primary)] data-[state=active]:text-white h-[35px] flex items-center justify-center text-sm"
          >
            Mensajes
          </TabsTrigger>
        </Link>
      </TabsList>
    </Tabs>
  );
}

export default NavbarTabs;
