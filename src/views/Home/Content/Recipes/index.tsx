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
      <Container className=" sticky top-0  bg-white z-10 pt-4">
        <Container>
          <Title>All Posts, All Topics</Title>
          <Categories />
          <Container className="px-6 py-2 flex justify-between items-center">
            <Sort />
            <Filter />
          </Container>
        </Container>

        <Posts />
      </Container>
    </DataProvider>
  );
};

export default Index;
