import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function NavbarTabs() {
  return (
    <Tabs defaultValue="inicio" className="w-full">
      <TabsList className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-3xl h-[45px] flex justify-between px-2">
        <TabsTrigger
          value="inicio"
          className="flex-1 mx-1 text-[var(--theme-text)] px-3 py-1 rounded-3xl transition data-[state=active]:bg-[var(--theme-primary)] data-[state=active]:text-white h-[35px] flex items-center justify-center text-sm"
        >
          Inicio
        </TabsTrigger>
        <TabsTrigger
          value="global"
          className="flex-1 mx-1 text-[var(--theme-text)] px-3 py-1 rounded-3xl transition data-[state=active]:bg-[var(--theme-primary)] data-[state=active]:text-white h-[35px] flex items-center justify-center text-sm"
        >
          Global
        </TabsTrigger>
        <TabsTrigger
          value="mensajes"
          className="flex-1 mx-1 text-[var(--theme-text)] px-3 py-1 rounded-3xl transition data-[state=active]:bg-[var(--theme-primary)] data-[state=active]:text-white h-[35px] flex items-center justify-center text-sm"
        >
          Mensajes
        </TabsTrigger>
      </TabsList>

      <TabsContent value="inicio">{/* Content for Inicio tab */}</TabsContent>

      <TabsContent value="global">{/* Content for Global tab */}</TabsContent>

      <TabsContent value="mensajes">
        {/* Content for Mensajes tab */}
      </TabsContent>
    </Tabs>
  );
}

export default NavbarTabs;
