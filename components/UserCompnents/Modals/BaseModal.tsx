"use client";
import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";

type modalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

function BaseModal({
  title,
  isOpen,
  onClose,
  children,
  className,
}: modalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Media queries para diferentes tamaños de pantalla
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const isTablet = useMediaQuery({ minWidth: 641, maxWidth: 1023 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  useEffect(() => {
    if (isOpen && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.9, y: -30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        }
      );
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Limpieza al desmontar
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Estilos dinámicos basados en el tamaño de pantalla
  const getModalStyles = () => {
    if (isMobile) {
      return {
        backdrop: "p-2",
        modal: "w-[95%] max-w-sm max-h-[90vh] rounded-lg",
        header: "p-4 pb-2",
        content: "px-4 pb-4 flex-1 min-h-0",
        title: "text-lg",
        button: "p-1.5",
        icon: "w-4 h-4",
        spacing: "mb-3",
        textSize: "text-sm",
      };
    } else if (isTablet) {
      return {
        backdrop: "p-4",
        modal: "w-[85%] max-w-md max-h-[85vh] rounded-xl",
        header: "p-5 pb-3",
        content: "px-5 pb-5 flex-1 min-h-0",
        title: "text-xl",
        button: "p-2",
        icon: "w-5 h-5",
        spacing: "mb-4",
        textSize: "text-base",
      };
    } else {
      return {
        backdrop: "p-6",
        modal: "w-[60%] max-w-lg max-h-[85vh] rounded-2xl",
        header: "p-6 pb-4",
        content: "px-6 pb-6 flex-1 min-h-0",
        title: "text-xl",
        button: "p-2",
        icon: "w-5 h-5",
        spacing: "mb-4",
        textSize: "text-base",
      };
    }
  };

  const styles = getModalStyles();

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 ${styles.backdrop}`}
    >
      <div
        ref={modalRef}
        className={`theme-bg-surface shadow-lg relative border theme-modal-border flex flex-col ${styles.modal} ${className}`}
      >
        {/* Header - Fijo, no hace scroll */}
        <div
          className={`flex justify-between items-center flex-shrink-0 border-b border-gray-200/20 ${styles.header}`}
        >
          <h2 className={`${styles.title} font-semibold pr-2`}>{title}</h2>
          <button
            onClick={onClose}
            className={`${styles.button} rounded-full hover:scale-110 hover:rotate-90 transition duration-500 flex-shrink-0`}
          >
            <X className={styles.icon} />
          </button>
        </div>

        {/* Content - Con scroll */}
        <div
          className={`${styles.content} overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent`}
        >
          <div className={styles.textSize}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default BaseModal;
