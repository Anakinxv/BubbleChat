import React from "react";

type layoutProps = {
  children: React.ReactNode;
};

function layout({ children }: layoutProps) {
  return (
    <div className="layout h-[100vh] w-full flex items-center justify-center">
      {children}
    </div>
  );
}

export default layout;
