import React from "react";
import Recipes from "./Content/Recipes";

import Recently from "./Sidebar/RecentlyPosted";
import Container from "@/components/container";
import Highlight from "./Content/Highlight";
import Categories from "./Content/Categories";

const Index = async () => {
  return (
    <Container className="grid grid-cols-1 md:grid-cols-[75%_25%] gap-4 w-full max-w-[1224px] mx-auto xl:pl-4">
      <Main>
        <Highlight />
        <Categories />
        <Recipes />
      </Main>
      <Aside className=" bg-slate-50">
        <Container className="bg-slate-100/40 border-gray-100/30 sticky top-[20px] h-[70vh] rounded-[12px] overflow-hidden p-4">
          <Recently />
        </Container>
      </Aside>
    </Container>
  );
};

export default Index;

type MainProps = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const cn = (className?: string) => className ?? "";

const Main: React.FC<MainProps> = ({ className, children, ...rest }) => {
  return (
    <main className={cn(className)} {...rest}>
      {children}
    </main>
  );
};
type AsideProps = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Aside: React.FC<AsideProps> = ({ className, children, ...rest }) => {
  return (
    <aside className={cn(className)} {...rest}>
      {children}
    </aside>
  );
};
