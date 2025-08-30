import React from "react";
import Navbar from "@/components/CommonComponents/Navbar";
import Primarybutton from "@/components/CommonComponents/Primarybutton";
import { Plus } from "lucide-react";
function HomePage() {
  return (
    <div className="flex flex-col justify-between items-center mt-12 ">
      <h1 className="text-5xl font-extrabold mb-4 ">BubbleChat</h1>
      <p className="text-2xl mb-8">
        Vive en tu propia burbuja, conecta con otras y crea comunidades
        dinámicas
      </p>
      <div className="w-96 mb-12">
        <Primarybutton className="theme-bg-primary text-white w-full hover:opacity-90 text-lg h-[60px] rounded-4xl font-semibold">
          <Plus className="mr-2 h-10 " /> Crear Comunidad
        </Primarybutton>
      </div>
    </div>
  );
}

export default HomePage;
