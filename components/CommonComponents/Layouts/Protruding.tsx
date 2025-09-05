import React from "react";
import { Home, User, Settings } from "lucide-react";

function Protruding() {
  return (
    <aside className="w-48 h-screen bg-gray-900 text-white flex flex-col py-6 gap-3">
      <button className="flex items-center gap-3 px-4 py-2 rounded-full bg-blue-600">
        <Home size={20} /> <span>Inicio</span>
      </button>
      <button className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700 rounded-full">
        <User size={20} /> <span>Perfil</span>
      </button>
      <button className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700 rounded-full">
        <Settings size={20} /> <span>Config</span>
      </button>
    </aside>
  );
}

export default Protruding;
