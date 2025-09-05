import React from "react";
import { Home, User, Settings } from "lucide-react";

function Dock() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-2xl shadow-lg flex gap-8">
      <button className="flex flex-col items-center hover:text-blue-400">
        <Home size={22} />
        <span className="text-xs mt-1">Inicio</span>
      </button>
      <button className="flex flex-col items-center hover:text-blue-400">
        <User size={22} />
        <span className="text-xs mt-1">Perfil</span>
      </button>
      <button className="flex flex-col items-center hover:text-blue-400">
        <Settings size={22} />
        <span className="text-xs mt-1">Config</span>
      </button>
    </div>
  );
}

export default Dock;
