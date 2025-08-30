import React from "react";
import Navbar from "@/components/CommonComponents/Navbar";
type layoutprops = {
  children: React.ReactNode;
};

function Layout({ children }: layoutprops) {
  return (
    <div>
      <Navbar></Navbar>

      {children}
    </div>
  );
}

export default Layout;
