"use client";

import React from "react";
import BaseModal from "./BaseModal";

type UserWithProfile = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  createdAt: Date;
  profile: {
    username: string;
    displayName: string | null;
    bio: string | null;
    avatarUrl: string | null;
  } | null;
};

type MyProfileProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  userInfo?: UserWithProfile | null;
};

function MyProfile({ title, isOpen, onClose, userInfo }: MyProfileProps) {
  // Valores por defecto si no hay userInfo
  const name = userInfo?.name || userInfo?.profile?.displayName || "Usuario";
  const username = userInfo?.profile?.username || "usuario";
  const bio = userInfo?.profile?.bio || "Sin biografía";
  const email = userInfo?.email || "Sin email";
  const avatar =
    userInfo?.profile?.avatarUrl ||
    userInfo?.image ||
    "https://i.pravatar.cc/80?img=3";
  const joinedAt = userInfo?.createdAt
    ? `Joined: ${new Date(userInfo.createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })}`
    : "Joined: Unknown";

  return (
    <BaseModal title={title} isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center gap-2 p-4 theme-bg-surface rounded-2xl max-w-md mx-auto">
        <img
          src={avatar}
          alt={username}
          className="w-35 h-35 rounded-full mb-2"
        />
        <div className="flex flex-col justify-center items-center text-center">
          <h2 className="font-bold text-2xl theme-text-primary">{name}</h2>
          <span className="theme-text-secondary text-base font-medium mt-1">
            @{username}
          </span>
        </div>
        <div className="w-full flex flex-col gap-4 mt-6">
          <div className="flex flex-col items-center">
            <span className="theme-text-secondary text-xs font-bold mb-1 text-center">
              Bio
            </span>
            <p className="theme-text-primary text-base text-center">{bio}</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="theme-text-secondary text-xs font-bold mb-1 text-center">
              Email
            </span>
            <p className="theme-text-primary text-base text-center">{email}</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="theme-text-secondary text-xs font-bold mb-1 text-center">
              Joined
            </span>
            <p className="theme-text-primary text-base text-center">
              {joinedAt}
            </p>
          </div>
        </div>
      </div>
    </BaseModal>
  );
}

export default MyProfile;
