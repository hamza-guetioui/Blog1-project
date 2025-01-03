import React from "react";
import Header from "./Header";

const Index = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Index;
