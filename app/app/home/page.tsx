import React from "react";
import Navbar from "@/components/CommonComponents/Navbar";
import Primarybutton from "@/components/CommonComponents/Primarybutton";
import { Plus, Filter, Search } from "lucide-react";
import CardCommunity from "@/components/CommonComponents/CardCommunity";
import AppInputs from "@/components/CommonComponents/AppInputs";
import { Button } from "@/components/ui/button";
import CommunityCards from "@/components/CommonComponents/CommunityCards";

function HomePage() {
  return (
    <div className="flex flex-col items-center min-h-screen px-4 sm:px-8 py-12 justify-between">
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
          <Primarybutton className="theme-bg-primary text-white w-full hover:opacity-90 text-lg h-[52px] sm:h-[60px] rounded-4xl font-semibold cursor-pointer">
            <Plus className="mr-2 h-8 sm:h-10" /> Crear Comunidad
          </Primarybutton>
        </div>
      </div>

      {/* Sección media: Mis comunidades */}
      <div className="flex-shrink-0 my-8">
        <CardCommunity Mycomn={5} />
      </div>

      {/* Sección inferior: Búsqueda y comunidades */}
      <div className="w-full flex-shrink-0">
        <div className="flex items-center p-4 max-w-md mx-auto w-full mb-6">
          <AppInputs
            placeholder="Search..."
            icon={<Search />}
            className="border border-gray-300 rounded-full py-2 px-4 w-full"
            type="text"
          />
          <div className="ml-2 p-3 rounded-full h-[48px] w-[48px] flex items-center theme-text-secondary   justify-center cursor-pointer filter-btn">
            <Filter size={32} className=" transition-colors duration-200" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <CommunityCards />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
