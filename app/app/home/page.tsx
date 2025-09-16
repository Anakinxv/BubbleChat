"use client";

import React from "react";
import Navbar from "@/components/CommonComponents/Navbar";
import Primarybutton from "@/components/CommonComponents/Primarybutton";
import { Plus, Filter, Search } from "lucide-react";
import CardCommunity from "@/components/CommonComponents/CardCommunity";
import AppInputs from "@/components/CommonComponents/AppInputs";
import { Button } from "@/components/ui/button";
import CommunityCards from "@/components/CommonComponents/CommunityCards";
import CreateCommunity from "@/components/UserCompnents/Modals/CreateCommunityModal";
import { useState } from "react";
import { Input } from "@/components/ui/input";

function HomePage() {
  const [isCreateCommunityOpen, setIsCreateCommunityOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center min-h-screen px-4 sm:px-8  justify-between">
        {/* Sección superior: Título, descripción y botón */}
        <div className="flex flex-col items-center space-y-8 flex-grow justify-center">
          <h1 className="text-4xl sm:text-7xl font-extrabold text-center">
            BubbleChat
          </h1>
          <p className="text-lg sm:text-2xl text-center">
            Vive en tu propia burbuja, conecta con otras y crea comunidades
            dinámicas
          </p>
          <div className="w-full max-w-xs sm:max-w-md lg:w-96 ">
            <Primarybutton onClick={() => setIsCreateCommunityOpen(true)}>
              <Plus className="mr-2 h-8 sm:h-10" /> Crear Comunidad
            </Primarybutton>
          </div>
        </div>

        {/* Sección media: Mis comunidades */}
        <div className="flex-shrink-0 my-8">
          <CardCommunity Mycomn={5} />
        </div>

        {/* Sección inferior: Búsqueda y comunidades */}
        <div className="w-full  flex-shrink-0">
          {/* Sección de búsqueda y filtro de comunidades */}
          <div className="flex items-center gap-4  p-4 max-w-md mx-auto w-full mb-6 ">
            {/* Input de búsqueda con ícono de lupa */}
            <Input
              placeholder="Search..."
              className={`bg-[var(--theme-surface)] border border-[var(--theme-border)] placeholder:text-[var(--theme-textSecondary)] min-h-[60px] text-[var(--theme-text)] focus:ring-0 focus:border-[var(--theme-primary)] rounded-4xl p-4 w-full`}
              type="text"
            />
            {/* Botón de filtro con ícono de filtro */}
            <div className=" p-3 rounded-full h-[48px] w-[48px] flex items-center theme-text-secondary justify-center cursor-pointer filter-btn">
              <Filter size={32} className="transition-colors duration-200" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CommunityCards />
          </div>
        </div>
      </div>
      <CreateCommunity
        isOpen={isCreateCommunityOpen}
        onClose={() => setIsCreateCommunityOpen(false)}
      />{" "}
    </>
  );
}

export default HomePage;
