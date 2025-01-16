import React from 'react'

const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    // <div className="flex items-center justify-between ">
    <h2 className="text-xl text-slate-900 font-bold mb-4 pt-2">{children}</h2>
    //   <span className="text-sm font-semibold">See all</span>
    // </div>
  );
};
export default Title