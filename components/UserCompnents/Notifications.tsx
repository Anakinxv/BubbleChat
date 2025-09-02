import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  UserPlus,
  Users,
  MessageCircle,
  Phone,
  Check,
  ChevronDown,
} from "lucide-react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

enum NotificationType {
  friend_request = "friend_request",
  community_invite = "community_invite",
  message = "message",
  call = "call",
}

type Notification = {
  id: string;
  userId: string;
  type: NotificationType;
  entityId?: string;
  entityType?: string;
  content?: string;
  senderName?: string;
  senderAvatar?: string;
  isRead: boolean;
  createdAt: Date;
};

// Datos de ejemplo ampliados
const mockNotifications: Notification[] = [
  {
    id: "1",
    userId: "user1",
    type: NotificationType.friend_request,
    content: "te envió una solicitud de amistad",
    senderName: "John Doe",
    senderAvatar: "https://i.pravatar.cc/150?u=john",
    isRead: false,
    createdAt: new Date(Date.now() - 3600000), // 1 hora atrás
  },
  {
    id: "2",
    userId: "user1",
    type: NotificationType.community_invite,
    content: "Te han invitado a la comunidad 'Creative UI'",
    senderName: "Ana Smith",
    senderAvatar: "https://i.pravatar.cc/150?u=ana",
    isRead: false,
    createdAt: new Date(Date.now() - 7200000), // 2 horas atrás
  },
  {
    id: "3",
    userId: "user1",
    type: NotificationType.message,
    content: "te envió un nuevo mensaje",
    senderName: "Jane Cooper",
    senderAvatar: "https://i.pravatar.cc/150?u=jane",
    isRead: true,
    createdAt: new Date(Date.now() - 86400000), // 1 día atrás
  },
  {
    id: "4",
    userId: "user1",
    type: NotificationType.call,
    content: "te hizo una llamada perdida",
    senderName: "Alex Morgan",
    senderAvatar: "https://i.pravatar.cc/150?u=alex",
    isRead: false,
    createdAt: new Date(Date.now() - 1800000), // 30 min atrás
  },
  {
    id: "5",
    userId: "user1",
    type: NotificationType.friend_request,
    content: "te envió una solicitud de amistad",
    senderName: "Marta Chen",
    senderAvatar: "https://i.pravatar.cc/150?u=marta",
    isRead: false,
    createdAt: new Date(Date.now() - 10800000), // 3 horas atrás
  },
  {
    id: "6",
    userId: "user1",
    type: NotificationType.message,
    content: "te etiquetó en un comentario",
    senderName: "David Kim",
    senderAvatar: "https://i.pravatar.cc/150?u=david",
    isRead: true,
    createdAt: new Date(Date.now() - 172800000), // 2 días atrás
  },
];

function Notifications() {
  const [isOpen, setIsOpen] = useState(false);
  const [displayCount, setDisplayCount] = useState(5);
  const [notifications, setNotifications] = useState(mockNotifications);

  // Ordenar notificaciones: no leídas primero, luego por fecha
  const sortedNotifications = [...notifications].sort((a, b) => {
    // Primero por leídas/no leídas
    if (a.isRead !== b.isRead) {
      return a.isRead ? 1 : -1;
    }
    // Luego por fecha (más reciente primero)
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  const displayedNotifications = sortedNotifications.slice(0, displayCount);
  const hasMore = displayCount < notifications.length;
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case NotificationType.friend_request:
        return <UserPlus size={14} className="text-white" />;
      case NotificationType.community_invite:
        return <Users size={14} className="text-white" />;
      case NotificationType.message:
        return <MessageCircle size={14} className="text-white" />;
      case NotificationType.call:
        return <Phone size={14} className="text-white" />;
      default:
        return <Bell size={14} className="text-white" />;
    }
  };

  // Añadir función de traducción para tipos de notificaciones
  const getNotificationTypeInSpanish = (type: NotificationType) => {
    switch (type) {
      case NotificationType.friend_request:
        return "Solicitud de amistad";
      case NotificationType.community_invite:
        return "Invitación a comunidad";
      case NotificationType.message:
        return "Mensaje nuevo";
      case NotificationType.call:
        return "Llamada";
      default:
        return "Notificación";
    }
  };

  // Modificar la función getTypeBackground para usar colores apropiados
  const getTypeBackground = (type: NotificationType) => {
    switch (type) {
      case NotificationType.friend_request:
        return "theme-bg-primary"; // Morado para solicitudes
      case NotificationType.community_invite:
        return "theme-bg-accent"; // Acento para invitaciones
      case NotificationType.message:
        return "theme-bg-secondary"; // Secundario para mensajes
      case NotificationType.call:
        return "theme-bg-primary"; // Color ámbar específico para llamadas
      default:
        return "theme-bg-surface";
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="relative group p-2 hover:bg-[var(--theme-surface)] rounded-full transition cursor-pointer">
        <Bell size={20} className="text-[var(--theme-text)]" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
          >
            {unreadCount}
          </motion.span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80 md:w-96 theme-bg-surface theme-border shadow-lg rounded-2xl p-2 dark:shadow-slate-900/40"
        align="end"
      >
        <div className="flex justify-between items-center px-3 py-2">
          <DropdownMenuLabel className="theme-text-primary font-semibold text-lg p-0 m-0">
            Notificaciones
          </DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="h-8 text-xs font-medium theme-text-purple hover:opacity-80"
            >
              <Check size={14} className="mr-1" />
              Marcar todas como leídas
            </Button>
          )}
        </div>
        <DropdownMenuSeparator className="theme-border" />
        <div className="max-h-[70vh] overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-rounded-md dark:scrollbar-thumb-slate-600 scrollbar-thumb-slate-300 scrollbar-track-transparent">
          <AnimatePresence>
            {displayedNotifications.length > 0 ? (
              displayedNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <DropdownMenuItem
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-xl cursor-default hover:theme-bg-background transition-colors",
                      !notification.isRead ? "theme-bg-accent/5" : ""
                    )}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={notification.senderAvatar}
                        alt={notification.senderName}
                      />
                      <AvatarFallback
                        className={getTypeBackground(notification.type)}
                      >
                        {notification.senderName?.slice(0, 2) || ""}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <p
                          className={cn(
                            "text-sm",
                            !notification.isRead
                              ? "font-semibold theme-text-primary"
                              : "theme-text-secondary"
                          )}
                        >
                          <span className="font-semibold">
                            {notification.senderName}
                          </span>{" "}
                          {notification.content}
                        </p>
                        <span className="text-xs theme-text-secondary flex-shrink-0 ml-2">
                          {formatTime(notification.createdAt)}
                        </span>
                      </div>
                      <div className="flex items-center mt-1">
                        <div
                          className={cn(
                            "flex items-center justify-center rounded-full p-1.5",
                            getTypeBackground(notification.type),
                            "mr-2"
                          )}
                        >
                          {getNotificationIcon(notification.type)}
                        </div>
                        <span className="text-xs theme-text-secondary">
                          {getNotificationTypeInSpanish(notification.type)}
                        </span>
                      </div>

                      {notification.type ===
                        NotificationType.friend_request && (
                        <div className="mt-2 flex gap-2">
                          <Button
                            size="sm"
                            className="h-8 px-3 text-xs theme-bg-primary text-white hover:opacity-90 border-0"
                          >
                            Aceptar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 px-3 text-xs theme-border theme-text-purple hover:theme-bg-accent/10"
                          >
                            Rechazar
                          </Button>
                        </div>
                      )}
                    </div>
                    {!notification.isRead && (
                      <div className="w-2.5 h-2.5 theme-bg-primary  rounded-full mt-2 flex-shrink-0"></div>
                    )}
                  </DropdownMenuItem>
                </motion.div>
              ))
            ) : (
              <div className="p-6 text-center">
                <Bell
                  size={24}
                  className="theme-text-secondary mx-auto mb-2 opacity-50"
                />
                <p className="theme-text-secondary text-sm">
                  No hay notificaciones
                </p>
              </div>
            )}
          </AnimatePresence>

          {hasMore && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-2 theme-text-purple hover:opacity-80 dark:hover:bg-slate-800/50 hover:bg-slate-100 focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-purple-400/30"
              onClick={() => setDisplayCount((prev) => prev + 5)}
            >
              Mostrar más <ChevronDown size={14} className="ml-1" />
            </Button>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Notifications;
