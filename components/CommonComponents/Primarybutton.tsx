import React from "react";
import { Button } from "../ui/button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
type buttonProps = {
  id?: string;
  text: string;
  onClick?: () => void;
  disbled?: boolean;
  classname?: string;
};

function Primarybutton({ id, text, onClick, disbled, classname }: buttonProps) {
  return (
    <Button
      id={id}
      className="theme-bg-primary text-white   w-full  hover:opacity-90  text-lg font-semibold  "
      onClick={onClick}
      disabled={disbled}
    >
      {text}
    </Button>
  );
}

export default Primarybutton;
