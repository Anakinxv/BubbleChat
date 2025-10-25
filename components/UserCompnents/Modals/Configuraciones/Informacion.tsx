"use client";

import React, { useRef, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import AppInputs from "@/components/CommonComponents/AppInputs";
import Primarybutton from "@/components/CommonComponents/Primarybutton";
import { useMediaQuery } from "react-responsive";
import { Edit } from "lucide-react";
import { FormWrapper } from "@/components/Forms/FormWrapper";
import { userSchema } from "@/schemas/User.schema";
import { useUserInfo } from "@/hooks/user/useUserInfo";
import { useSession } from "next-auth/react";
import { useAppStore } from "@/store/useAppStore";
import { profile } from "console";

function Informacion() {
  const isMobile = useMediaQuery({ maxWidth: 640 });

  const [preview, setPreview] = useState<string | null>(null);
  const [changed, setChanged] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Store global
  const UserInfo = useAppStore((state) => state.userInfo);
  const SetUserInfo = useAppStore((state) => state.setUserInfo);

  const { data: session } = useSession();
  const userId = session?.user?.id || "";

  const { data } = useUserInfo(userId);

  const imagenGuardada =
    data?.profile?.avatarUrl ||
    "https://i.pinimg.com/736x/a6/41/a1/a641a16d95dc82cc702cc9e8f8bfd958.jpg";

  // Inicializa el store si está vacío
  React.useEffect(() => {
    if (data && (!UserInfo || !UserInfo.username)) {
      SetUserInfo({
        nombreCompleto: data?.profile?.displayName || "",
        username: data?.profile?.username || "",
        email: data?.email || "",
        bio: data?.profile?.bio || "",
        profileURL: data?.profile?.avatarUrl || "",
      });
    }
    // eslint-disable-next-line
  }, [data]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        SetUserInfo({
          ...UserInfo,
          profileURL: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
    setChanged(true);
  };

  const handleInputChange = (field: string, value: string) => {
    SetUserInfo({
      ...UserInfo,
      [field]: value,
    });
    setChanged(true);
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      {/* Avatar Section */}
      <div
        className={`flex ${
          isMobile ? "flex-col items-center" : "flex-row items-center"
        } gap-3 sm:gap-4`}
      >
        <div className="w-full flex justify-center items-center">
          <div className="relative w-40 h-40 flex-shrink-0 justify-center items-center">
            <Avatar
              className="w-40 h-40 hover:cursor-pointer hover:opacity-80 "
              onClick={() => fileInputRef.current?.click()}
            >
              <AvatarImage
                src={preview ? preview : UserInfo?.profileURL || imagenGuardada}
                alt="Avatar"
                className="pointer-events-none w-full h-full object-cover rounded-full"
              />
            </Avatar>
            {/* Edit icon fijo arriba a la derecha */}
            <button
              type="button"
              className="absolute top-3 right-3 theme-bg-background rounded-full p-1.5 shadow-md z-10"
              title="Editar foto"
              onClick={() => fileInputRef.current?.click()}
            >
              <Edit className="h-5 w-5 stroke-[#867eff]" />
            </button>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <FormWrapper
        schema={userSchema}
        onSubmit={(e: any) => {
          e.preventDefault();
          // Aquí puedes manejar el submit usando UserInfo
        }}
        defaultValues={{
          nombre: UserInfo?.nombreCompleto || "",
          usuario: UserInfo?.username || "",
          email: UserInfo?.email || "",
          bio: UserInfo?.bio || "",
          fotoPerfil: UserInfo?.profileURL || "",
        }}
      >
        <div className="flex flex-col gap-3 sm:gap-4">
          <AppInputs
            label="Foto de perfil"
            type="file"
            placeholder="Selecciona una foto de perfil"
            onChange={handleFileChange}
            className="hidden"
            inputRef={fileInputRef}
          />

          <AppInputs
            label="Nombre y apellido"
            placeholder="Nombre y apellido"
            value={UserInfo?.nombreCompleto || ""}
            onChange={(e) =>
              SetUserInfo({
                ...UserInfo,
                nombreCompleto: e.target.value,
              })
            }
          />
          <AppInputs
            label="Nombre de usuario"
            placeholder="Nombre de usuario"
            value={UserInfo?.username || ""}
            onChange={(e) =>
              SetUserInfo({
                ...UserInfo,
                username: e.target.value,
              })
            }
          />
          <AppInputs
            label="Email"
            placeholder="Email"
            value={UserInfo?.email || ""}
            onChange={(e) =>
              SetUserInfo({
                ...UserInfo,
                email: e.target.value,
              })
            }
          />
          <div>
            <AppInputs
              label="Biografía"
              type="textarea"
              placeholder="Escribe tu biografía..."
              value={UserInfo?.bio || ""}
              onChange={(e) =>
                SetUserInfo({
                  ...UserInfo,
                  bio: e.target.value,
                })
              }
            />
          </div>
          {changed && <Primarybutton>Guardar</Primarybutton>}
        </div>
      </FormWrapper>
    </div>
  );
}

export default Informacion;
