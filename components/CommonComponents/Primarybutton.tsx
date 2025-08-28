import React from "react";
import { Button } from "../ui/button";

type buttonProps = {
  text: string;
  onClick?: () => void;
  disbled?: boolean;
  classname?: string;
};

function Primarybutton({ text, onClick, disbled, classname }: buttonProps) {
  return (
    <Button
      className="theme-bg-primary text-white   w-full  hover:opacity-90  text-lg font-semibold  "
      onClick={onClick}
      disabled={disbled}
    >
      {text}
    </Button>
  );
}

export default Primarybutton;
