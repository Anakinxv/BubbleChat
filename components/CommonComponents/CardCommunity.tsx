import React from "react";
import { Card, CardContent } from "../ui/card";
import { Heart, Search } from "lucide-react";

type CardProps = {
  title: string;
  icon: React.ReactNode;
  description: string;
};

function CardCommunity({ Mycomn }: { Mycomn: number }) {
  const cardsProps: CardProps[] = [
    {
      title: "Tus comunidades",
      icon: <Heart size={32} />,
      description: `${Mycomn} comunidades`,
    },
    {
      title: "Buscar comunidades",
      icon: <Search size={32} />,
      description: "Encuentra nuevas comunidades",
    },
  ];

  return (
    <Card className="border-0 shadow-none">
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-stretch">
          {/* Primera tarjeta */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-4 p-6 md:p-8 rounded-2xl  min-h-[120px] md:min-h-[140px] bg-[var(--theme-surface)] border border-[var(--theme-border)]">
              <span className="text-4xl theme-text-primary">
                {cardsProps[0].icon}
              </span>
              <div>
                <div className="font-semibold text-lg md:text-xl text-[var(--theme-text)]">
                  {cardsProps[0].title}
                </div>
                <div className="text-base text-[var(--theme-textSecondary)]">
                  {cardsProps[0].description}
                </div>
              </div>
            </div>
          </div>
          {/* Separador vertical solo en desktop */}
          <div className="hidden md:block w-[2px] bg-gray-200 opacity-15 mx-2" />
          {/* Segunda tarjeta */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-4 p-6 md:p-8 rounded-2xl bg-[var(--theme-surface)] border border-[var(--theme-border)] min-h-[120px] md:min-h-[140px]">
              <span className="text-4xl theme-text-secondary">
                {cardsProps[1].icon}
              </span>
              <div>
                <div className="font-semibold text-lg md:text-xl text-[var(--theme-text)]">
                  {cardsProps[1].title}
                </div>
                <div className="text-base text-[var(--theme-textSecondary)]">
                  {cardsProps[1].description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CardCommunity;
