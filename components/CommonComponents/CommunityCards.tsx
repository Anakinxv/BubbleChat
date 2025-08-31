import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "../ui/button";

type comunidad = {
  nombre: string;
  descripcion: string;
  fechaCreacion: string;
  categoria: string;
  imagen: string;
  miembros: number;
};

const comunidades: comunidad[] = [
  {
    nombre: "Otaku World",
    descripcion: "Un espacio para hablar de anime, manga y cultura japonesa.",
    fechaCreacion: "2022-01-15",
    categoria: "Anime",
    imagen:
      "https://i.pinimg.com/1200x/6d/0d/4f/6d0d4f04f9b7e51225dc3e9279867ab2.jpg",
    miembros: 1540,
  },
  {
    nombre: "Fullstack Devs",
    descripcion:
      "Comunidad de programadores que comparten recursos y proyectos.",
    fechaCreacion: "2021-08-03",
    categoria: "Programación",
    imagen:
      "https://i.pinimg.com/1200x/6d/0d/4f/6d0d4f04f9b7e51225dc3e9279867ab2.jpg",
    miembros: 2890,
  },
  {
    nombre: "One Piece Fans",
    descripcion:
      "Para los que seguimos las aventuras de Luffy y su tripulación.",
    fechaCreacion: "2020-12-25",
    categoria: "Anime",
    imagen:
      "https://i.pinimg.com/1200x/6d/0d/4f/6d0d4f04f9b7e51225dc3e9279867ab2.jpg",
    miembros: 4321,
  },
  {
    nombre: "React Lovers",
    descripcion:
      "Aprende, comparte y construye proyectos con React y su ecosistema.",
    fechaCreacion: "2023-02-11",
    categoria: "Programación",
    imagen:
      "https://i.pinimg.com/1200x/6d/0d/4f/6d0d4f04f9b7e51225dc3e9279867ab2.jpg",
    miembros: 3100,
  },
  {
    nombre: "Breaking Bad Universe",
    descripcion:
      "Discute teorías, personajes y curiosidades de Breaking Bad y Better Call Saul.",
    fechaCreacion: "2019-09-12",
    categoria: "Series",
    imagen:
      "https://i.pinimg.com/736x/65/ed/3d/65ed3d4c30484a1e941d341befa2be3e.jpg",
    miembros: 2780,
  },
  {
    nombre: "Naruto Legacy",
    descripcion: "Charlemos sobre Naruto, Shippuden y Boruto.",
    fechaCreacion: "2021-03-22",
    categoria: "Anime",
    imagen:
      "https://i.pinimg.com/736x/65/ed/3d/65ed3d4c30484a1e941d341befa2be3e.jpg",
    miembros: 5200,
  },
  {
    nombre: "Cyberpunk 2077 Hub",
    descripcion: "Todo sobre Night City: mods, lore y novedades del juego.",
    fechaCreacion: "2022-07-19",
    categoria: "Videojuegos",
    imagen:
      "https://i.pinimg.com/736x/65/ed/3d/65ed3d4c30484a1e941d341befa2be3e.jpg",
    miembros: 1985,
  },
  {
    nombre: "Data Science Hub",
    descripcion:
      "Comunidad para aprender machine learning, IA y ciencia de datos.",
    fechaCreacion: "2020-06-10",
    categoria: "Programación",
    imagen:
      "https://i.pinimg.com/736x/65/ed/3d/65ed3d4c30484a1e941d341befa2be3e.jpg",
    miembros: 2670,
  },
  {
    nombre: "Marvel Geeks",
    descripcion: "Discute películas, cómics y series del universo Marvel.",
    fechaCreacion: "2018-11-30",
    categoria: "Series",
    imagen:
      "https://i.pinimg.com/736x/65/ed/3d/65ed3d4c30484a1e941d341befa2be3e.jpg",
    miembros: 6120,
  },
  {
    nombre: "Demon Slayer Corps",
    descripcion: "Un rincón para los fanáticos de Kimetsu no Yaiba.",
    fechaCreacion: "2023-05-05",
    categoria: "Anime",
    imagen:
      "https://i.pinimg.com/736x/65/ed/3d/65ed3d4c30484a1e941d341befa2be3e.jpg",
    miembros: 3750,
  },
];

function CommunityCards() {
  return (
    <>
      {comunidades.map((comunidad) => (
        <div
          key={comunidad.nombre}
          className="flex flex-col rounded-2xl border shadow-sm overflow-hidden p-2 theme-bg-surface theme-category-border hover:shadow-lg shadow-purple-200/10 hover:border-2 hover:hover-cards    transition-shadow duration-200"
        >
          {/* Header - Altura fija */}
          <div className="flex items-center gap-3 p-3 h-[60px] flex-shrink-0">
            <img
              src={comunidad.imagen}
              alt={comunidad.nombre}
              className=" w-[52px] h-[52px] rounded-full object-cover shadow-lg flex-shrink-0"
              style={{ aspectRatio: "1/1" }}
            />
            <div className="flex-1 min-w-0">
              <div className="text-m font-bold line-clamp-1 theme-text-primary  leading-tight">
                {comunidad.nombre}
              </div>
              <div className="text-xs theme-text-secondary truncate font-medium mt-0.5 border theme-category-border px-2 py-1 rounded-2xl w-fit theme-category">
                <p className="theme-text-purple "> {comunidad.categoria}</p>
              </div>
            </div>
          </div>

          {/* Body - Altura fija para descripción */}
          <div className="px-3 h-[70px] flex-shrink-0">
            <p className="text-xs theme-text-secondary line-clamp-2 leading-relaxed h-[36px] overflow-hidden">
              {comunidad.descripcion}
            </p>
            <div className="flex justify-between items-center text-[11px] theme-text-secondary font-medium mt-2">
              <span>
                <strong className="theme-text-primary ">
                  {comunidad.miembros.toLocaleString()}
                </strong>{" "}
                miembros
              </span>
              <span className="theme-text-primary text-[10px] font-semibold">
                {new Date(comunidad.fechaCreacion).getFullYear()}
              </span>
            </div>
          </div>

          {/* Footer - Altura fija */}
          <div className="p-3 mt-auto h-[50px] flex items-center cursor-pointer">
            <Button
              size="sm"
              className="w-full text-xs h-7 font-semibold theme-bg-primary rounded-xl text-white
              hover:opacity-90 transition-opacity duration-200  cursor-pointer"
            >
              Unirse
            </Button>
          </div>
        </div>
      ))}
    </>
  );
}

export default CommunityCards;
