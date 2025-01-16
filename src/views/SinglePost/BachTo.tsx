"use client";
import React from "react";


import { useRouter } from "next/navigation";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,

} from "@fortawesome/free-solid-svg-icons";

const BackTo = () => {
    
  const router = useRouter();
    return (
      <button onClick={() => router.back()} className="flex justify-center items-center w-7 h-7 rounded-full bg-white/70 gap-2  text-gray-800/80 hover:text-gray-800/90  hover:bg-white/90 transation-all duration-300 ease-in-out">
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
    );
  };
  export default BackTo;