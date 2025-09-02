import React from "react";
import BaseModal from "./BaseModal";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Informacion from "./Configuraciones/Informacion";
import Privacidad from "./Configuraciones/Privacidad";

type ConfiguraciónProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
};

function Configuración({ title, isOpen, onClose }: ConfiguraciónProps) {
  return (
    <BaseModal title={title} isOpen={isOpen} onClose={onClose}>
      <Tabs defaultValue="info" className="w-full">
        <TabsList className="theme-bg-surface theme-border mb-4">
          <TabsTrigger
            value="info"
            className="
              data-[state=active]:bg-[#867eff]
              data-[state=active]:text-white
              hover:bg-theme-category
              hover:text-theme-primary
              transition-colors
              rounded-md
              px-4 py-2
            "
          >
            Información
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="
              data-[state=active]:bg-[#867eff]
              data-[state=active]:text-white
              hover:bg-theme-category
              hover:text-theme-primary
              transition-colors
              rounded-md
              px-4 py-2
            "
          >
            Privacidad
          </TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <Informacion />
        </TabsContent>
        <TabsContent value="settings">
          <Privacidad />
        </TabsContent>
      </Tabs>
    </BaseModal>
  );
}

export default Configuración;
