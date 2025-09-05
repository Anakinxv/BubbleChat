import React from "react";
import { Home, User, Settings } from "lucide-react";

function ClassicSideBar() {
  return (
    <aside className="w-20 h-screen bg-gray-900 text-white flex flex-col items-center py-6 gap-6">
      <div className="flex flex-col items-center">
        <div className="p-3 bg-gray-700 rounded-full">
          <Home size={20} />
        </div>
        <span className="text-xs mt-1">Inicio</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="p-3 bg-gray-700 rounded-full">
          <User size={20} />
        </div>
        <span className="text-xs mt-1">Perfil</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="p-3 bg-gray-700 rounded-full">
          <Settings size={20} />
        </div>
        <span className="text-xs mt-1">Config</span>
      </div>
    </aside>
  );
}

export default ClassicSideBar;
