import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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
      icon: <Heart size={32} />, // Icono más grande
      description: `${Mycomn} comunidades`,
    },
    {
      title: "Buscar comunidades",
      icon: <Search size={32} />, // Icono más grande
      description: "Encuentra nuevas comunidades",
    },
  ];

  return (
    <Card className="border-0 shadow-none">
      <CardContent>
        <div className="flex gap-8 items-center">
          <div className="flex flex-col justify-center flex-1">
            <div className="flex items-center gap-4 p-8 rounded-2xl unyc-false min-h-[140px]">
              <span className="text-4xl theme-text-primar">
                {cardsProps[0].icon}
              </span>
              <div>
                <div className="font-semibold text-xl text-[var(--theme-text)]">
                  {cardsProps[0].title}
                </div>
                <div className="text-base text-[var(--theme-textSecondary)]">
                  {cardsProps[0].description}
                </div>
              </div>
            </div>
          </div>
          {/* Separator vertical */}
          <div className="w-[2px] h-30 unyc-false " />
          <div className="flex flex-col justify-center flex-1">
            <div className="flex items-center gap-4 p-8 rounded-2xl bg-[var(--theme-surface)] border border-[var(--theme-border)] min-h-[140px]">
              <span
                className="text-4xl theme-text-secondary {
"
              >
                {cardsProps[1].icon}
              </span>
              <div>
                <div className="font-semibold text-xl text-[var(--theme-text)]">
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
