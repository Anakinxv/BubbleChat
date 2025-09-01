"use client";

import React from "react";
import BaseModal from "./BaseModal";

type MyProfileProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
};

function MyProfile({ title, isOpen, onClose }: MyProfileProps) {
  console.log(title, isOpen, onClose);

  return (
    <BaseModal title={title} isOpen={isOpen} onClose={onClose}>
      <div>Contenido del perfil del usuario</div>
    </BaseModal>
  );
}

export default MyProfile;
