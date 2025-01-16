import React from "react";
import Categories from "./Catgegories";
import Posts from "./Posts";
import Title from "../Title";
import Container from "@/components/container";
import Filter from "./Filter";
import Sort from "./Sort";
import { DataProvider } from "./dataContext";

const Index = () => {
  return (
    <DataProvider>
      <Container>
        <Header>
          <Title>All Posts, All Topics</Title>
          <Categories />
          <Container className="px-6 py-2 flex justify-between items-center">
            <Sort />
            <Filter />
          </Container>
        </Header>

        <Posts />
      </Container>
    </DataProvider>
  );
};

export default Index;

const Header = ({ children }: { children: React.ReactNode }) => {
  return <div className=" sticky top-[64px]  bg-white z-10">{children}</div>;
};
// const MemoizedHeader = React.memo(Header);
