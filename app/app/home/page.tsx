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
    <div className="flex flex-col justify-between items-center mt-12 px-4 sm:px-8">
      <h1 className="text-4xl sm:text-7xl font-extrabold mb-4 text-center">
        BubbleChat
      </h1>
      <p className="text-lg sm:text-2xl mb-8 text-center">
        Vive en tu propia burbuja, conecta con otras y crea comunidades
        dinámicas
      </p>
      <div className="w-full max-w-xs sm:max-w-md lg:w-96 mb-12">
        <Primarybutton className="theme-bg-primary text-white w-full hover:opacity-90 text-lg h-[52px] sm:h-[60px] rounded-4xl font-semibold">
          <Plus className="mr-2 h-8 sm:h-10" /> Crear Comunidad
        </Primarybutton>
      </div>
      <div>
        <CardCommunity Mycomn={5} />
      </div>

      {/* Input y filtro */}
      <div className="w-full">
        <div className="flex items-center p-4 max-w-md mx-auto w-full">
          <AppInputs
            placeholder="Search..."
            icon={<Search />}
            className="border border-gray-300 rounded-full py-2 px-4 w-full"
            type="text"
          />
          <div className="ml-2 p-3 rounded-full hover:bg-gray-100 transition-colors h-[48px] w-[48px] flex items-center justify-center">
            <Filter
              size={32}
              className="theme-text-secondary hover:theme-text-primary transition-colors duration-200"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
          <CommunityCards />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
