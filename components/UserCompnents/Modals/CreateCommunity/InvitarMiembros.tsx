"use client";

import React, { useState } from "react";
import AppInputs from "@/components/CommonComponents/AppInputs";
import BubbleSelects from "@/components/CommonComponents/BubbleSelects";
import Primarybutton from "@/components/CommonComponents/Primarybutton";
import { Label } from "@/components/ui/label";
import CurrentStep from "./CurrentStep";
import { UserRoundPlus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type UserProps = {
  avatar: string;
  username: string;
  displayName: string;
};

const UserCards = ({ users }: { users: UserProps[] }) => (
  <div className="flex flex-col gap-4 mt-4 p-2 rounded-2xl  theme-bg-background ">
    <div>
      <h4 className="font-semibold text-lg theme-text-primary ">
        Usuarios invitados {users.length}
      </h4>
    </div>
    {users.map((user) => (
      <div
        key={user.username}
        className="user-card theme-bg-surface theme-border border-2 flex items-center justify-between gap-4 p-4 rounded-xl shadow-sm transition-shadow"
        style={{ minHeight: "64px" }}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <img
            src={user.avatar}
            alt={user.displayName}
            className="w-10 h-10 rounded-full theme-border"
            style={{ borderWidth: 1.5, borderStyle: "solid" }}
          />
          <div className="flex flex-col min-w-0">
            <span className="font-semibold truncate theme-text-primary">
              {user.displayName}
            </span>
            <span className="text-xs theme-text-secondary truncate">
              @{user.username}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="miembro">
            <SelectTrigger className="w-[110px] theme-bg-background theme-border rounded-4xl">
              <SelectValue placeholder="Rol" />
            </SelectTrigger>
            <SelectContent className="theme-bg-surface theme-border  theme-text-primary shadow-lg rounded-2xl">
              <SelectGroup>
                <SelectLabel>Rol</SelectLabel>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <button
            className="ml-2   hover:opacity-80 transition-opacity"
            title="Quitar usuario"
            // onClick={() => handleRemoveUser(user.username)}
          >
            <X size={20} className="theme-text-primary" />
          </button>
        </div>
      </div>
    ))}
  </div>
);

const options = [
  { value: "miembro", label: "Miembro" },
  { value: "admin", label: "Admin" },
];

function InvitarMiembros() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedRole, setSelectedRole] = useState("miembro");

  // Example users, replace with real data or state
  const users: UserProps[] = [
    {
      avatar: "https://i.pravatar.cc/40?img=1",
      username: "johndoe",
      displayName: "John Doe",
    },
    {
      avatar: "https://i.pravatar.cc/40?img=2",
      username: "janedoe",
      displayName: "Jane Doe",
    },
  ];

  const handleAddUser = () => {
    // Lógica para agregar usuario sin afectar el layout
    console.log("Adding user with role:", selectedRole);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto   ">
      <div>
        <CurrentStep
          icon={
            <UserRoundPlus size={48} className="stroke-1 theme-text-purple" />
          }
          title="Información Básica"
          description="Proporcione información básica sobre la comunidad."
        />
      </div>
      <div className="rounded border rounded-3xl theme-category-border theme-bg-background p-4 overflow-hidden">
        <div className="flex gap-4 w-full items-start">
          {" "}
          {/* items-start para alineación consistente */}
          <div className="flex-1 min-w-0">
            {" "}
            {/* min-w-0 previene overflow */}
            <AppInputs
              placeholder="Buscar usuario..."
              className="h-[48px] w-full"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <div className="w-[150px] flex-shrink-0">
            {" "}
            {/* Ancho fijo para evitar cambios */}
            <BubbleSelects options={options} />
          </div>
          <div className="w-[60px] flex-shrink-0">
            {" "}
            {/* Ancho fijo */}
            <Button
              size="icon"
              className="theme-bg-accent hover:opacity-80 h-[60px] w-[60px] rounded-md transition-opacity duration-200"
              onClick={handleAddUser}
            >
              <Plus size={28} />
            </Button>
          </div>
        </div>

        <UserCards users={users} />
      </div>
    </div>
  );
}

export default InvitarMiembros;
