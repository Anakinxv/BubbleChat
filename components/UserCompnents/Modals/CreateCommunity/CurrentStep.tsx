import React from "react";

type stepsProps = {
  icon?: React.ReactNode;
  title: string;
  description: string;
};

function CurrentStep({ icon, title, description }: stepsProps) {
  return (
    <div className="w-full flex flex-col justify-center items-center text-center">
      <div className="theme-progress rounded-full w-20 h-20 flex items-center justify-center mb-4">
        {/* Aumenta el tamaño del ícono usando Tailwind: w-12 h-12 */}
        <span className=" flex items-center justify-center ">{icon}</span>
      </div>
      <div>
        <h3 className="text-lg font-semibold theme-text-primary">{title}</h3>
        <p className="theme-text-secondary">{description}</p>
      </div>
    </div>
  );
}

export default CurrentStep;
