"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

type Props = {
  children: React.ReactNode;
};

const Navbar = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="flex lg:justify-center  order-1 lg:order-2">
      {/* Hamburger Button */}
      <Humburger setIsOpen={setIsOpen} />

      {/* Modal Overlay */}

      <div
        className={`max-md:flex max-md:w-full max-md:h-screen max-md:bg-black/20 max-md:fixed max-md:top-0 max-md:left-0 max-md:z-50
       ${isOpen ? "max-md:block" : "max-md:hidden"} `}
      >
        <div
          className={`relative max-md:min-w-[80%] max-md:border-r-2 max-md:border-slate-100/50 max-md:bg-slate-200 max-md:rounded-tr-[.1rem] max-md:rounded-br-[.1rem]  
    max-md:pt-10 max-md:px-0 max-md:overflow-y-scroll max-md:h-screen max-md:max-h-screen max-md:overflow-x-hidden 
    transform transition-transform duration-700 ease-in-out 
    ${isOpen ? "max-md:translate-x-0" : "max-md:-translate-x-full"}`}
        >
          <Close setIsOpen={setIsOpen} />
          {children}
        </div>
        <div
          className="lg:hidden max-lg:min-w-[20%] h-screen"
          onClick={() => setIsOpen(false)}
        ></div>
      </div>
    </div>
  );
};

export default Navbar;

const Humburger = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <button
      onClick={() => setIsOpen((isOpen) => !isOpen)}
      className="lg:hidden"
    >
      <FontAwesomeIcon
        icon={faBars}
        className="flex text-3xl items-center justify-center p-2 rounded-full hover:bg-slate-100/30"
      />
    </button>
  );
};
const Close = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <button
      onClick={() => setIsOpen(false)}
      className="absolute top-3 right-3 flex items-center justify-center text-slate-200 w-6 h-6 bg-slate-500/30 rounded-full hover:bg-slate-500/60 lg:hidden"
    >
      <FontAwesomeIcon icon={faXmark} />
    </button>
  );
};
