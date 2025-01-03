import React from "react";
import SuggestedForYou from "./suggestedForYou";
import Posts from "./posts";
const Index = async () => {
  return <div className="grid lg:grid-cols-[234px_1fr_230px] px-4 max-w-6xl mx-auto">
    <SuggestedForYou />
    <Posts/>
    <div className='bg-gray-300/30 sticky top-[80px] h-[70vh] rounded-[6px] overflow-hidden p-4 border-2 border-gray-300/50'>
      <h2 className="text-sm font-bold text-gray-600">Recommended for you</h2>
    </div>
  </div>;
};

export default Index;
