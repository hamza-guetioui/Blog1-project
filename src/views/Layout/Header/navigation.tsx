import React from 'react'

import { mainMenu as Menu } from "@/data/menus";
import Link from "next/link";




const Navigation = () => {
  return (
    <nav>
      <ul className="flex max-md:flex-col gap-8">
        {Menu.map((item) => (
          <li
            key={item.id}
            className="hover:scale-105 transition-all duration-100 "
          >
            <Link
              href={item.link}
              className="flex items-center px-2 lg:py-5 lg:px-0 gap-2"
            >
              <span className="font-bold">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation