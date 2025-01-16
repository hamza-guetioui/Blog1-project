import React from "react";
import Image from "next/image";

import Navbar from "./navbar";
import Navigation from "./navigation";
import Search from "./search";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";

const Index = () => {
  return (
    <header className="sticky top-0 z-30 shadow-md max-md:py-4 bg-white">
      <div className="grid grid-cols-3 lg:grid-cols-[10%_1fr_3%_3%] items-center  px-4 max-w-6xl mx-auto">
        <Logo />
        <Navbar>
          <Navigation />
        </Navbar>
        <Search />
        <Save />

      </div>
    </header>
  );
};

export default Index;

const Logo = () => {
  return (
    <div className="col-span-1 order-2 lg:order-1 ">
      <Image
        className="dark:invert "
        src="/next.svg"
        alt="Next.js logo"
        width={148}
        height={38}
        priority
      />
    </div>
  );
};


const Save = () => {
    return (
      <div className="col-span-1 flex justify-end order-3 gap-4 ">
        <Link href="/posts/save">
          <FontAwesomeIcon icon={faBookmark} className=" text-2xl lg:text-xl text-slate-600 hover:text-slate-900" />
        </Link>
      </div>
    );
  };
  